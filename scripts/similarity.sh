#!/bin/bash

id=$1
size=$2
mode=$3

filename=`find . -iname "${id}.csv"`

if [ -f ${filename} ]; then
  ranking=`Rscript similarity.R ${filename} ${size}`
  cat `echo $ranking | sed 's/.h5/.metadata.csv/g'`
else
  "NOT FOUND"
fi

