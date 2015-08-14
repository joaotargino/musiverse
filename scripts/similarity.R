library('proxy')

args <- commandArgs(TRUE)

file.input.a  <- args[1]
file.input.base <- args[2]
size          <- as.numeric(args[3])
mode          <- if( length(args) < 4 ){ 1 } else { as.numeric(args[4]) }

data.song <- read.csv(file.input.a, header=F)

data.base <- rbind(data.song, read.csv(file.input.base, header=F))

normalize <- function(x){(x-min(x))/(max(x)-min(x))}

data.base[,c(-1)] <- sapply(data.base[,c(-1)], normalize )

d.1 <- simil(data.base[1,2:ncol(data.base)], data.base[2:nrow(data.base),2:ncol(data.base)], method="Euclidean")
d.2 <- simil(data.base[1,2:6], data.base[2:nrow(data.base),2:6], method="Euclidean")
d.3 <- simil(data.base[1,7:30], data.base[2:nrow(data.base),7:30], method="Euclidean")
d.4 <- simil(data.base[1,31:54], data.base[2:nrow(data.base),31:54], method="Euclidean")

output <- data.frame(song=data.base[2:nrow(data.base),1], full=as.vector(d.1), metrics=as.vector(d.2), timbre=as.vector(d.3), pitch=as.vector(d.4))
output <- output[order(-output[,mode+1]),]
output <- output[1:size,1]

cat(as.character(output))
