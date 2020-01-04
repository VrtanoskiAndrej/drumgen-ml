from flask import Flask, Response, request, jsonify, send_file
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas
from matplotlib import cm
import requests
import numpy as np
import json
from PIL import Image
import io

from api.libraries.format import to_image, _clean


app = Flask(__name__)
# app.config.from_object('api.config.settings.BaseConfig')
app.config.from_pyfile('settings.py', silent=True)

"""
FORMATS:
* raw
* image
* midi
* tabs
"""


def generate(instances):
    SERVER_URL = 'http://localhost:8501/v1/models/generator:predict'
    payload = {'instances': instances}
    response = requests.post(SERVER_URL, data=json.dumps(payload)).json()['predictions']
    return response


@app.route('/api/generate/plot.png')
def plot_png():
    noise = np.random.uniform(-1, 1, (1, 100)).tolist()
    response_data = np.array(_clean(generate(noise))).reshape(32, 8)
    response_data *= 255

    im = Image.fromarray(np.uint8(cm.gray_r(response_data) * 255))
    im = im.resize((160, 640))
    img_io = io.BytesIO()
    im.save(img_io, 'PNG', quality=70)
    img_io.seek(0)
    return send_file(img_io, mimetype='image/png')


@app.route('/api/generate/random', methods=['GET'])
def random():

    noise = np.random.uniform(-1, 1, (1, 100)).tolist()
    response_data = generate(noise)

    response = {"response": response_data[0]}
    return response, 200


@app.route('/api/ping', methods=['GET'])
def ping():
    return jsonify({
        'status': 'success',
        'response': 'pong!'
    })