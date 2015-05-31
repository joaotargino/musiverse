import os
from flask import Flask, make_response

app = Flask(__name__)

@app.route('/similarity')
def similarity():
    result = os.popen('bash similarity.sh ' + request.args.get('track_id') + '5')
    result = result.read().split('\n')

    response = []

    for song in result:
        song = result.split(',')
        song = {title: song[9], album: song[14], artist: song[18]}
        response.append(song)

    response = make_response(response)
    response.headers['Access-Control-Allow-Origin'] = '*'

    return response

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5005)
