import os
from flask import Flask, make_response, request
import json
import csv

app = Flask(__name__)

@app.route('/similarity')
def similarity():
    result = os.popen('bash similarity.sh ' + request.args.get('track_id') + ' 5')
    songs = csv.reader(result.read().split('\n')[:-1], skipinitialspace=True)
    
    response = []
    
    for song in songs:
        song = {'artist': song[9], 'album': song[14], 'title': song[18]}
        response.append(song)
    
    response = make_response(json.dumps(response))
    response.headers['Access-Control-Allow-Origin'] = '*'
    
    return response

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5405, debug=True)
