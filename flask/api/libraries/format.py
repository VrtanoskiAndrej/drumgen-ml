from api.libraries.converter import matrix_to_midi
import numpy as np
from matplotlib.figure import Figure


def _clean(data):
    return (np.array(data) > 0.5).astype('int')


def to_image(data):
    fig = Figure()
    axis = fig.add_subplot(1, 1, 1)
    axis.axis('off')
    axis.imshow(_clean(data)[0, :, :, 0], cmap='gray_r')
    return fig


def to_midi(data):
    imgs = _clean(data).reshape(32, 8)
    matrix_to_midi(imgs, name='testies')
