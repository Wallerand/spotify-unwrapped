let res = [
    // Post-process streaming history data
    db.streaming_history.updateMany({}, [
        {
            $set: {
                "ts": { $toDate: "$ts" },
                "seconds_played": { $round: [{$divide: ["$ms_played", 1000]}, 2] }
            }
        }
    ]),
    // Post-process playlists data
    db.playlists.updateMany({}, [
        {
            $set: {
                "lastModifiedDate": { $toDate: "$lastModifiedDate" },
                "tracksCount": { $size: "$items" }
            }
        }
    ]),
    // Create indexes
    db.streaming_history.createIndex({ ts: 1 }),
    db.streaming_history.createIndex({ master_metadata_track_name: 1 }),
    db.streaming_history.createIndex({ master_metadata_album_artist_name: 1 }),
    db.streaming_history.createIndex({ master_mmaster_metadata_album_album_nameetadata_track_name: 1 }),
];

printjson(res);