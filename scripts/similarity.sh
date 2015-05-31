#!/bin/bash

id=$1
size=$2

filename=`find . -iname "${id}.csv"`

echo $filename

if [ -f ${filename} ]; then
  ranking=`Rscript similarity.R ${filename} ${size}`
  cat `echo $ranking | sed 's/.h5/.metadata.csv/g'`
else
  "NOT FOUND"
fi

