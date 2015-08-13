#as duas linhas abaixo sao pra instalar a biblioteca!
#source("http://bioconductor.org/biocLite.R")
#biocLite("rhdf5")

library(rhdf5)
library(FNN)

args <- commandArgs(TRUE)
k <- as.numeric(args[3])

data.timbre.a <- h5read(args[1], "/analysis/segments_timbre")
data.timbre.b <- h5read(args[2], "/analysis/segments_timbre")
cat(KL.dist(t(data.timbre.a), t(data.timbre.b), k)[k])
