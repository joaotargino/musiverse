library('proxy')

args <- commandArgs(TRUE)

file.input.a  <- strsplit(args[1], split="\\.")[[1]][1]
size          <- as.numeric(args[2])

data.song <- read.csv(paste(file.input.a, ".timbre.csv", sep=""), header=F)
data.base <- read.csv("timbre.csv", header=F)

d <- simil(data.song[,1:24], data.base[,2:25])
output <- data.frame(song=data.base[,1], score=as.vector(d))
output <- output[order(output$score),]
output <- output[1:size,]
write.table(output, file="result.csv", row.names=F, col.names=F, sep=",", quote = F)