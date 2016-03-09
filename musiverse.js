var express = require('express');
var morgan = require('morgan');
var spawn = require('child_process').spawn;
var Papa = require('papaparse');

var fs = require("fs");
var file = "data/tracks.db";
if (!fs.existsSync(file)) {
    throw "Can't run without database!";
}
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(file);

var app = express();

app.use(morgan('common'));

app.use(express.static('dist'));

app.get('/artists', function (request, response) {
    var result = [];
    db.each("SELECT DISTINCT artist as a FROM tracks WHERE artist LIKE '" + request.query.s + "%'",
        function (err, row) {
            result.push(row.a);
        },
        function (err, num) {
            response.json(result);
        });
});

app.get('/songs', function (request, response) {
    var result = [];
    db.each("SELECT track_id as id, song_id as sid, artist as a, song as s FROM tracks WHERE artist LIKE '" + request.query.a + "' ORDER BY song",
        function (err, row) {
            result.push({
                track_id: row.id,
                song_id: row.sid,
                artist: row.a,
                title: row.s
            });
        },
        function (err, num) {
            response.json(result);
        });
});

app.get('/similarity', function (request, response) {
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
