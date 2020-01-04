import mido
import numpy as np

drum_conversion = {35: 36, 37: 38, 40: 38, 43: 41, 47: 45, 50: 45,
                   44: 42, 48: 45, 57: 49, 59: 51, 53: 51, 55: 51, 52: 49}
# high mid tom
allowed_pitch = [36, 38, 42, 46, 41, 45, 51, 49]


def pad_array(array):
    pad_amount = 2**np.ceil(np.log2(len(array)))
    pad_amount = len(array) - NUM_TIMESTEPS
    padded = np.pad(array, ((0, pad_amount), (0, 0)), mode='constant')
    print(padded)
    return padded


def pitch_change(given):
    if given in allowed_pitch:
        return given
    else:
        try:
            new_pitch = drum_conversion[given]
            return new_pitch
        except KeyError:
            return False


def midi_to_matrix(midifile, pad=False):
    try:
        pattern = mido.MidiFile(midifile)
    except OSError:
        return False

    # timeleft = pattern.tracks[0][0].time
    timeleft = [0]
    posns = [0 for p in pattern]

    statematrix = []
    time = 0

    counter = 0
    state = [0 for x in range(len(allowed_pitch))]
    statematrix.append(state)
    while True:
        if time % (pattern.ticks_per_beat / TIME_SLICE_PER_BEAT) == 0:
            # Crossed a note boundary. Create a new state, defaulting to holding notes
            oldstate = state
            state = [0 for x in range(len(allowed_pitch))]
            statematrix.append(state)
            counter += 1

        for i in range(len(timeleft)):
            while timeleft[i] == 0:
                track = pattern.tracks[i]
                pos = posns[i]

                evt = track[pos]
                if isinstance(evt, mido.Message) and evt.type in ['note_on', 'note_off']:
                    convertedpitch = pitch_change(evt.note)
                    if convertedpitch:
                        if evt.type == 'note_on' or evt.velocity > 0:
                            state[allowed_pitch.index(convertedpitch)] = 1
                    else:
                        pass
                elif isinstance(evt, mido.MetaMessage) and evt.type == 'time_signature':
                    if evt.numerator not in (2, 4):
                        print("Found time signature event {}. Bailing! {}".format(
                            evt.numerator, midifile))
                        return None

                try:
                    timeleft[i] = track[pos + 1].time
                    posns[i] += 1
                except IndexError:
                    timeleft[i] = None

            if timeleft[i] is not None:
                timeleft[i] -= 1

        if all(t is None for t in timeleft):
            break

        time += 1

    if pad:
        return pad_array(statematrix)
    else:
        return statematrix


def matrix_to_midi(state_matrix, name="example"):
    state_matrix = np.asarray(state_matrix)

    pattern = mido.MidiFile()
    pattern.ticks_per_beat = 96

    track = mido.MidiTrack()
    pattern.tracks.append(track)

    track.append(mido.MetaMessage(type='time_signature', numerator=4, denominator=4,
                                  clocks_per_click=36, notated_32nd_notes_per_beat=8, time=0))
    tickscale = 24
    lastcmdtime = 0
    prevstate = [0 for x in range(len(allowed_pitch))]

    for time, state in enumerate(state_matrix + [prevstate[:]]):
        offNotes = []
        onNotes = []
        for i in range(len(allowed_pitch)):
            n = state[i]
            p = prevstate[i]
            if p == 1:
                if n == 0:
                    offNotes.append(i)
                elif n == 1:
                    offNotes.append(i)
                    onNotes.append(i)
            elif n == 1:
                onNotes.append(i)
        for note in offNotes:
            track.append(mido.Message(type='note_off', time=(time - lastcmdtime)
                                      * tickscale, note=allowed_pitch[note], channel=9))
            lastcmdtime = time
        for note in onNotes:
            track.append(mido.Message(type='note_on', time=(time - lastcmdtime)
                                      * tickscale, velocity=40, note=allowed_pitch[note], channel=9))
            lastcmdtime = time

        prevstate = state

    pattern.save("{}.mid".format(name))
