#as duas linhas abaixo sao pra instalar a biblioteca!
#source("http://bioconductor.org/biocLite.R")
#biocLite("rhdf5")

library(rhdf5)

args <- commandArgs(TRUE)

file.output <- strsplit(args[1], split="\\.")[[1]][1]

tmp <- h5ls(args[1])

data.meta <- h5read(args[1], "/metadata/songs")

data.analysis <- h5read(args[1], "/analysis/songs")

data.music <- h5read(args[1], "/musicbrainz/songs")

data.timbre <- h5read(args[1], "/analysis/segments_timbre")
data.timbre.mean <- t(apply(data.timbre, 1, median))
data.timbre.sd <- t(apply(data.timbre, 1, sd))

data.pitches <- h5read(args[1], "/analysis/segments_pitches")
data.pitches.mean <- t(apply(data.pitches, 1, median))
data.pitches.sd <- t(apply(data.pitches, 1, sd))

write.table(data.meta, file=paste(file.output, ".metadata.csv", sep=""), row.names=F, col.names=F, sep=",")
write.table(data.analysis, file=paste(file.output, ".analysis.csv", sep=""), row.names=F, col.names=F, sep=",")
write.table(data.music, file=paste(file.output, ".musicbrainz.csv", sep=""), row.names=F, col.names=F, sep=",")
write.table(t(c(data.timbre.mean,data.timbre.sd)), file=paste(file.output, ".timbre.csv", sep=""), row.names=F, col.names=F, sep=",")
write.table(t(c(data.pitches.mean,data.pitches.sd)), file=paste(file.output, ".pitche.csv", sep=""), row.names=F, col.names=F, sep=",")


