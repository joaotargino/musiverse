#!/bin/bash

id=$1
size=$2
data_path=$3

SCRIPTPATH=$(dirname "$0")

filename=`find ${data_path} -iname "${id}.csv"`

if [ -f "${filename}" ]; then
  ranking=`Rscript ${SCRIPTPATH}/similarity.R ${filename} ${data_path}/database.csv ${size}`
  for i in $ranking; do
    cat ${data_path}/`echo $i | sed 's/.h5/.metadata.csv/g'`
  done 
else
  exit 1
fi

