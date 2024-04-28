ls -1 ./usr/dataset/Streaming_History_Audio_*.json | while read jsonfile; do \
    mongoimport --db=spotify --collection=streaming_history --file=$jsonfile --jsonArray; done

ls -1 ./usr/dataset/Playlist*.json | while read jsonfile; do \
    jq ".playlists" $jsonfile | mongoimport --db=spotify --collection=playlists --jsonArray; done