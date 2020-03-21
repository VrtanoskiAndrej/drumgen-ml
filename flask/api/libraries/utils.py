import re
import mido
import numpy as np

allowed_pitch = [49, 51, 46, 42, 38, 45, 41, 36]


def hex_to_rgb(hexnumb):
    """ Converts Hex Color to RGB

       :param hexnumb: A hex string
       :type hexnumb: str

       :return: RGB array
       :rtype: list
       """
    if re.match(r'^[0-9a-fA-F]{6}$', hexnumb):
        hexnumb = hexnumb.lstrip('#')
        hlen = len(hexnumb)
        return list(int(hexnumb[i:i + hlen // 3], 16) for i in range(0, hlen, hlen // 3))
    else:
        return None


def apply_color(matrix, color_pattern):
    """ Applies a color to a matrix

       :param matrix: A 2D array to be parsed over
       :type matrix: list

       :param color_pattern: An array of colors to be placed
       :type color_pattern: list

       :return converted_matrix: Color Matrix
       :rtype: list
       """
    converted_matrix = []
    for row in matrix:
        tmp_row = []
        for item in row:
            tmp_row.append(color_pattern[item])
        converted_matrix.append(tmp_row)

    return converted_matrix


def matrix_to_midi(state_matrix, tempo=120):
    """ Converts matrix into a midi file

       :param state_matrix: The state matrix that will be converted
       :type state_matrix: list

       :param tempo: The tempo of the song
       :type tempo: int

       :return: Converted MIDI File object
       :rtype: MidiFile
       """
    state_matrix = np.asarray(state_matrix)

    pattern = mido.MidiFile()
    pattern.ticks_per_beat = 96

    track = mido.MidiTrack()
    pattern.tracks.append(track)

    track.append(mido.MetaMessage(type='time_signature', numerator=4, denominator=4,
                                  clocks_per_click=36, notated_32nd_notes_per_beat=8, time=0))

    track.append(mido.MetaMessage(type='set_tempo', tempo=mido.bpm2tempo(tempo), time=0))
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

    return pattern
