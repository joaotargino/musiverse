library('proxy')

args <- commandArgs(TRUE)

file.input.a  <- strsplit(args[1], split="\\.h5")[[1]][1]
size          <- as.numeric(args[2])

data.song <- read.csv(paste(file.input.a, ".csv", sep=""), header=F)
data.base <- read.csv("database.csv", header=F)


d <- simil(data.song[,2:ncol(data.song)], data.base[,2:ncol(data.base)])

output <- data.frame(song=data.base[,1], score=as.vector(d))
output <- output[order(output$score),]
output <- output[1:size,1]

cat(as.character(output))