import csv
import json

csvfile = open('query.csv', 'r')
jsonfile = open('file.json', 'w')

fieldnames = ("", "datasongsmetadata.artist_name","datasongsmetadata$song_id","datasongsmetadata$title")
reader = csv.DictReader(csvfile, fieldnames)
for row in reader:
    json.dump(row, jsonfile)
    jsonfile.write('\n')
