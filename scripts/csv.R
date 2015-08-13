library(proxy)
library(ggplot2)

args <- commandArgs(TRUE)

data.timbre <- read.csv(args[1], header=F)
data.timbre.mean <- t(apply(data.timbre, 1, median))
data.timbre.sd <- t(apply(data.timbre, 1, sd))

data.timbre <- read.csv(args[2], header=F)
data.timbre.mean <- t(apply(data.timbre, 1, median))
data.timbre.sd <- t(apply(data.timbre, 1, sd))
