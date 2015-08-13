#as duas linhas abaixo sao pra instalar a biblioteca!
#source("http://bioconductor.org/biocLite.R")
#biocLite("rhdf5")

library(rhdf5)
library(FNN)

args <- commandArgs(TRUE)
k <- as.numeric(args[3])

data.timbre.a <- t(h5read(args[1], "/analysis/segments_timbre"))

output <- read.table(args[2])

calcKL <- function(x) {
  return (KL.dist(data.timbre.a, t(h5read(x, "/analysis/segments_timbre")), k)[k])
}

output <- transform(output, V2 = apply(output, 1, calcKL))
                    
write.table(file = "output.txt", output, row.names = FALSE, col.names = FALSE, quote = FALSE)
