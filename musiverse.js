var express = require('express');
var morgan = require('morgan');
var spawn = require('child_process').spawn;
var Papa = require('papaparse');

var app = express();

app.use(morgan('common'));

app.use(express.static('musiverse'));

app.get('/artists', function (request, response) {
    var artists = ['Mad Clown', 'Mad Season', 'Madeleine Peyroux', 'Madonna'];
    var s = request.query.s;
    response.json(artists.filter(function (artist, index) {
        return artist.search(s) === 0;
    }));
});

app.get('/songs', function (request, response) {
    var songs = [
        {
            track_id: 'TRQANFJ128E078A7FA',
            another_id: 'SOXFJDU12A6701F419',
            artist: 'Madonna',
            title: 'I\'m So Stupid (Album Version)'
        },
        {
            track_id: 'TRQJUHU128E0798D10',
            another_id: 'SOAMDTU12A67ADE753',
            artist: 'Madonna',
            title: 'Material Girl (Album Version)'
        },
        {
            track_id: 'TRQDKEU128F148D4DC',
            another_id: 'SOKACCH12A6D4F66BD',
            artist: 'Madonna',
            title: 'Nobody Knows Me [Live]'
        },
        {
            track_id: 'TRQOOEU128F9325FC8',
            another_id: 'SOLFRXB12AB0185255',
            artist: 'Wooden Wand and the Sky High Band',
            title: 'Madonna'
        }
    ];
    var a = request.query.a;
    response.json(songs.filter(function (song, index) {
        return song.artist === a;
    }));
});

app.get('/similarity', function (request, response) {
    var songs = [
        {
            track_id: 'TRQANFJ128E078A7FA',
            another_id: 'SOXFJDU12A6701F419',
            artist: 'Madonna',
            title: 'I\'m So Stupid (Album Version)'
        },
        {
            track_id: 'TRQJUHU128E0798D10',
            another_id: 'SOAMDTU12A67ADE753',
            artist: 'Madonna',
            title: 'Material Girl (Album Version)'
        },
        {
            track_id: 'TRQDKEU128F148D4DC',
            another_id: 'SOKACCH12A6D4F66BD',
            artist: 'Madonna',
            title: 'Nobody Knows Me [Live]'
        },
        {
            track_id: 'TRQOOEU128F9325FC8',
            another_id: 'SOLFRXB12AB0185255',
            artist: 'Wooden Wand and the Sky High Band',
            title: 'Madonna'
        }
    ];

    function run_cmd(cmd, args, end) {
        this.stdout = "";
        var child = spawn(cmd, args);
        var me = this;
        child.stdout.on('data', function (buffer) {
            me.stdout += buffer.toString()
        });
        child.stdout.on('end', end);
    };

    var foo = new run_cmd(
        'bash', ['scripts/similarity.sh', request.query.track_id, '5', '/Users/ricardo/local/tarrachinha/MillionSongSubset/data'],
        function () {
            var r = Papa.parse(foo.stdout).data;
            r.pop();
            response.json(r.map(function (element, index) {
                return {
                    track_id: '0',
                    another_id: '0',
                    artist: element[9],
                    title: element[18]
                }
            }));
        }
    );
});

app.listen(3000, function () {
    console.log("Listening on port 3000");
});