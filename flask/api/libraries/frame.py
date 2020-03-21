import numpy as np
import re


class Frame(object):
    def __init__(self, init_data=None, filter=0.5):
        self.data = init_data
        self.filter = filter

    # DATA PROPERTY (32, 8)
    @property
    def data(self):
        return self._data

    @data.setter
    def data(self, new):
        replace = None
        if type(new) == str:
            if re.match(r'^[0-9a-f]{64}$', new):
                tmp = ["{0:08b}".format(int(new[i:i + 2], 16)) for i in range(0, len(new), 2)]
                tmp = [list(t) for t in tmp]
                tmp = np.array(tmp).astype(int)

                replace = tmp
                replace = replace.reshape(32, 8)
        elif type(new) == list:
            replace = np.array(new)
            replace = replace.reshape(32, 8)

        self._data = replace

    @data.deleter
    def data(self):
        print("deleting FRAME")
        del self._data

    @property
    def raw(self):
        return self.data.tolist()

    @property
    def query(self):
        response_data = self.clean().reshape(32, 8)
        ints = np.packbits(response_data, axis=-1)
        ints = np.squeeze(ints)

        bits = np.array([hex(xi).lstrip("0x") for xi in ints])

        zfiller = lambda x: x.zfill(2)
        bits = np.array(list(map(zfiller, bits)))
        hex_rep = "".join(bits)

        return hex_rep

    @property
    def tabs(self):
        notes = ['X', 'X', 'X', 'x', 'o', 'o', 'o', 'o']
        tabs = ['C', 'R', 'H', 'h', 'S', 'T', 'F', 'K']

        for idy, segment in enumerate(self.data):
            if idy % 16 == 0:
                tabs = [t + '|' for t in tabs]
            for idx, note in enumerate(segment):
                if note == 1:
                    tabs[idx] += notes[idx]
                else:
                    tabs[idx] += '-'

        return '\n'.join(tabs)

    def clean(self):
        return (self.data > self.filter).astype('int')

