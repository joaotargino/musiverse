import csv
import json

csvfile = open('C:\Users\bac\Desktop\tarrachinha\github\musiverse\web\data\query.csv', 'r')
jsonfile = open('C:\Users\bac\Desktop\tarrachinha\github\musiverse\web\data\file.json', 'w')

fieldnames = ("", "datasongsmetadata.artist_name","datasongsmetadata$song_id","datasongsmetadata$title")
reader = csv.DictReader(csvfile, fieldnames)
for row in reader:
    json.dump(row, jsonfile)
    jsonfile.write('\n')
