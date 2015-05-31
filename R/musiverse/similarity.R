library('proxy')

#colnames(datasongsanalysis)
#summary(datasongsanalysis)

datasongsanalysis <- read.csv("../../dados/datasongsanalysis.csv")

#datasongsanalysis <- datasongsanalysis[,c("tempo","loudness","mode", "mode_confidence", "time_signature_confidence", "time_signature", "start_of_fade_out", "end_of_fade_in", "key", "key_confidence", "analysis_sample_rate")]
datasongsanalysis <- datasongsanalysis[,c("track_id", "tempo","loudness")]


# TO DO ----------------------------------------------------------------
#datasongschroma <- read.csv("../../dados/chroma.csv")
#datasongsanalysis <- cbind(datasongsanalysis, datasongschroma)

# ----------------------------------------------------------------------


# normalize funtion to 0 - 1
normalize <- function(x){(x-min(x))/(max(x)-min(x))}
# sapply normalize function to every column
datasongsanalysis[,c(-1)] <- sapply(datasongsanalysis[,c(-1)], normalize ) 

# do the euclidian function in the datasongsanalysis
#matrixDistance <- dist(datasongsanalysis[c(1:10),c(-1)], method="Euclidean", auto_convert_data_frames = T)
matrixDistance <- as.matrix(dist(datasongsanalysis[,c(-1)], method="Euclidean", auto_convert_data_frames = T))

# give the songsid to every row (rownames)
rownames(matrixDistance) = datasongsanalysis$track_id
write.table(matrixDistance, file="matrixAnalysisDistance.tsv", sep="\t", row.names= T, col.names=F, quote=F)

# or cbind in it
#matrixDistance <- cbind(as.character(datasongsanalysis$track_id[c(1:10)]), matrixDistance )
#write.table(matrixDistance, file="matrixAnalysisDistance.tsv", sep="\t", col.names=F, quote=F)
