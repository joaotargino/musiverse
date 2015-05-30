#as duas linhas abaixo sao pra instalar a biblioteca!
#source("http://bioconductor.org/biocLite.R")
#biocLite("rhdf5")

library(rhdf5)

tmp <- h5ls("subset_msd_summary_file.h5")
mydata <- h5read("subset_msd_summary_file.h5", "/metadata/songs")
mydataAnalysis <- h5read("subset_msd_summary_file.h5", "/analysis/songs")
mydatamuscBrainz <- h5read("subset_msd_summary_file.h5", "/musicbrainz/songs")

write.csv(mydata, "datasongsmetadata.csv")
write.csv(mydataAnalysis, "datasongsanalysis.csv")
write.csv(mydatamuscBrainz, "datasongsmusicbrainz.csv")


