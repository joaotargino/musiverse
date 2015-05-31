

mapmbid = data.frame( mbid = unique(tags$artistMbid))

mapmbid$id = c(1:length(mapmbid$mbid))


maptag = data.frame( tag = unique(tags$tagname))

maptag$id = c(1:length(maptag$tag))


input = merge(tags, mapmbid, by.x="artistMbid", by.y="mbid")
input = merge(input, maptag, by.x="tagname", by.y="tag")

input=input[, c("id.x", "id.y", "tagcount")]

write.table(input, file="input.tsv", col.names=F, row.names=F, quote=F)


write.table(mapmbid$id, file="mbid2.tsv", col.names=F, row.names=F, quote=F)
