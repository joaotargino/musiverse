library('proxy')


colnames(datasongsanalysis)
summary(datasongsanalysis)
c("tempo","loudness","mode", "mode_confidence", "time_signature_confidence", "time_signature", "start_of_fade_out", "end_of_fade_in", "key", "key_confidence", "analysis_sample_rate")

test_music = datasongsanalysis[c(1:3),c("tempo","loudness")]

## S3 method for class 'dist'
dist1 = dist(test_music, method="Manhattan")
print(dist1)
as.matrix(dist1)


dataSim = datasongsanalysis[,c("tempo","loudness","mode", "mode_confidence", "time_signature_confidence", "time_signature", "start_of_fade_out", "end_of_fade_in", "key", "key_confidence", "analysis_sample_rate")]

result = dist(dataSim, auto_convert_data_frames = T)

result = as.matrix(result)

