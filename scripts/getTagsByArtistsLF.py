#!/usr/local/bin/python
# -*- coding: ascii -*-
import os
import requests
import json
import time
import sys

api_key = '592caeca2bae6d0bf5a7a4c50038f842'
limit_per_page = 10
method = 'artist.getTopTags'
page_number = 1
user_id = 'rj'


def read_the_dataset(the_dataset_file):

	with open(the_dataset_file,'r') as infile:
		f = open('tags.txt', 'a')
		f.write("artistMbid\"\t\"tagname\"\t\"tagcount\"\n")
		
		for line in infile:   
			artistMbid = line.rstrip('\n') 
			#print(artistMbid)
			getTracks_by_User(artistMbid,f)
		f.close();

def getTracks_by_User(artistMbid, f):	
	totalPages = 1

	#for i in range(1,totalPages+1):
	i=1
	while (i <= 1):

		page_number = i
		i += 1
		
		string_request = 'http://ws.audioscrobbler.com/2.0/?method=' + method + '&mbid='+artistMbid + '&api_key='+ api_key
		options = ""
		options += '&format=json'
		options += '&limit=' + str(limit_per_page)

		#print(string_request + options + '&page=' + str(page_number))
		r = requests.get(string_request + options + '&page=' + str(page_number) )
		
		if(r.text == "" or r.text == '""'):
			continue
		
		#if 'error' in r.text:
			#print(string_request + options + '&page=' + str(page_number))
			#print(r.text)
			#print("error")
			#continue
		

		jsonResult = json.loads(r.text)
		
		#print(jsonResult)

		if jsonResult == '':
			print('json fail')
			continue

		if 'toptags' in jsonResult:
		
			if 'tag' not in r.text:
				#print(string_request + options + '&page=' + str(page_number))
				#print(artistMbid)
				print(r.text)
				continue
			if 'count' not in r.text:
				#print(string_request + options + '&page=' + str(page_number))
				#print(artistMbid)
				print(r.text)
				continue
			if 'url' not in r.text:
				#print(string_request + options + '&page=' + str(page_number))
				#print(artistMbid)
				print(r.text)
				#print("url")
				continue
		
			totalPages = 1;
			#print(jsonResult['toptracks']['track']['name'])
			tag_count = 0
			have_onetag = 0;
			for tag in jsonResult['toptags']['tag']:
				if(tag_count > limit_per_page):
					break
				tag_count = tag_count+1
				try:
					#print('trackName '+track )
					tagName = str(( tag['name'] ).encode('ascii', 'ignore'))
					tagCount = tag['count']
					f.write(artistMbid+"\t"+tagName+"\t"+tagCount+"\n")
				
				except(IndexError,TypeError):
					#print(string_request + options + '&page=' + str(page_number))
					print("Index Error")
					have_onetag = 1;
					break
			#time.sleep(0.1)
			if(have_onetag==1):
				tagName = str(( jsonResult['toptags']['tag']['name'] ).encode('ascii', 'ignore'))
				tagCount =  jsonResult['toptags']['tag']['count']
				f.write(artistMbid+"\t"+tagName+"\t"+tagCount+"\n")
		else:
			time.sleep(10)
		
# Execution flow starts here ...
if __name__ == "__main__":

	# Read the training file
	#tweets = read_the_dataset('data/training.dat')
	#tweetsTeste = read_the_dataset('data/test_empty.dat')

	# Read the _empty file (the task)
    
	read_the_dataset('mbid.tsv')
	#getTracks_by_User('dr')

	print ('done.')

