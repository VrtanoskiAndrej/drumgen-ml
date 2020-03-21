from flask import Flask, Response, request, jsonify, abort
from werkzeug import FileWrapper
from PIL import Image
import requests
import json
import io
import subprocess
import tempfile
from api.libraries.utils import *
from api.libraries.frame import Frame

app = Flask(__name__)
app.config.from_pyfile('settings.py', silent=True)


def generate(instances, filter=0.5):
    """ Calls the generator to generate given a specific instance

    :param instances: The input to the generator that will be used to generate the frame
    :type instances: Iterable

    :param filter: The amount by which the generator will allow notes to be turned on
    :type filter: int

    :return response: Outputs the frame in a list
    :rtype: Frame
    """
    PRODUCTION_BASE_URL = 'http://tensorflow:8501'
    DEVELOPMENT_BASE_URL = 'http://localhost:8501'

    SERVER_URL = PRODUCTION_BASE_URL + '/v1/models/generator:predict'
    payload = {'instances': instances}
    response = requests.post(SERVER_URL, data=json.dumps(payload)).json()['predictions'][0]

    return Frame(response, filter)


@app.errorhandler(404)
def error_message(e):
    """ Outputs a custom JSON error message

       :param e: A string error message
       :type e: str

       :return: Will output a JSON formatted error based on the input
       :rtype: Response
       """
    return jsonify(error=str(e)), 404


@app.route('/api/plot.png', methods=['GET'])
def plot_png():
    """ Will create a plot of the Frame given id parameters

       :return: A Portable Network Graphics image of the plot
       :rtype: Response
       """

    img_id = request.args.get("id", default='0' * 64, type=str)
    scale = request.args.get("scale", default=20, type=int)
    oncolor = hex_to_rgb(request.args.get("oncolor", default='000000', type=str))
    oncolor.append(255)

    offcolor = hex_to_rgb(request.args.get("offcolor", default='ffffff', type=str))
    offcolor.append(255)

    frame = Frame(img_id)

    bitmap = frame.data
    if bitmap is not None:
        colors = [offcolor, oncolor]
        bitmap = apply_color(bitmap, colors)
        im = Image.fromarray(np.uint8(bitmap))
        im = im.resize((8 * scale, 32 * scale))
        img_io = io.BytesIO()
        im.save(img_io, 'PNG', quality=70)
        img_io.seek(0)

        return Response(FileWrapper(img_io), mimetype='image/png', direct_passthrough=True), 200

    else:
        abort(404, description="Incorrect Query Data")


@app.route('/api/audio.wav', methods=['GET'])
def audio():
    """ Creates a wav file from id parameters

       :return: A Waveform Audio File Format
       :rtype: Response
       """
    img_id = request.args.get("id", default='0' * 64, type=str)
    tempo = request.args.get("tempo", default=90, type=int)
    frame = Frame(img_id)

    response_data = frame.data

    midi_data = matrix_to_midi(response_data, tempo=tempo)

    fd, path = tempfile.mkstemp()
    midi_data.save(filename=path)

    subprocess.call(
        ['timidity', path, '-Ow', '-o', 'test.wav'])

    with open('test.wav', 'rb') as f:
        aud_io = io.BytesIO(f.read())
        aud_io.seek(0)

    return Response(FileWrapper(aud_io), mimetype='audio/wav', direct_passthrough=True), 200


@app.route('/api/tabs', methods=['GET'])
def tabs():
    """ Creates tabs from id parameters

       :return: String representation of TABS
       :rtype: Response
       """
    img_id = request.args.get("id", default='0' * 64, type=str)
    frame = Frame(img_id)

    response = {"response": frame.tabs}

    return jsonify(response), 200


@app.route('/api/generate/raw', methods=['GET'])
def raw():
    """ Will generate and output raw data created by the machine (FOR TESTING PURPOSES)

       :return: A JSON representation of the data generated at random
       :rtype: Response
       """
    noise = np.random.uniform(-1, 1, (1, 10)).tolist()
    response_data = generate(noise).raw

    response = {"response": response_data}
    return jsonify(response), 200


@app.route('/api/generate/querystring', methods=['POST'])
def querystring():
    """ Converts users dimensional input into a token to be used in the API

          :return: A 64 character token
          :rtype: Response
          """
    req = request.get_json()
    noise = [req['data']]
    filter = req['filter']

    response_data = generate(noise, filter)

    response = {"response": response_data.query}
    return response, 200


@app.route('/api/ping', methods=['GET'])
def ping():
    """ CONNECTIVITY PING (FOR TESTING PURPOSES) """
    return jsonify({
        'status': 'success',
        'response': 'pong'
    })
