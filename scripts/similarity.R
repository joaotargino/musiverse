library('proxy')

args <- commandArgs(TRUE)

file.input.a  <- args[1]
#strsplit(args[1], split="\\.h5")[[1]][1]
size          <- as.numeric(args[2])

data.song <- read.csv(file.input.a, header=F)

data.base <- rbind(data.song, read.csv("database.csv", header=F))

normalize <- function(x){(x-min(x))/(max(x)-min(x))}

data.base[,c(-1)] <- sapply(data.base[,c(-1)], normalize )

d <- simil(data.base[1,2:ncol(data.base)], data.base[2:nrow(data.base),2:ncol(data.base)])

output <- data.frame(song=data.base[2:nrow(data.base),1], score=as.vector(d))
output <- output[order(output$score),]
output <- output[1:size,1]

cat(as.character(output))
