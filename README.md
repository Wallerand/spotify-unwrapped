# Spotify Unwrapped 👀

Explore your Spotify streaming history, playlists & tracks library using [Metabase](https://www.metabase.com/).

Works locally without third-party or API, from GDPR request data. 

<img src="assets/overview.png" alt="Sample question example" />

### Getting started

1. Request your Spotify "Account data" and "Extended streaming history" from account [privacy settings](https://www.spotify.com/account/privacy/)
3. Place following JSON files to "dataset" folder :
    - Streaming_History_Audio_*.json
    - Playlist*.json
    - YourLibrary.json
4. Launch services via `docker-compose up -d`
5. Open http://localhost:3000 and set up Metabase by creating an account and adding the following MongoDB database :

    ```mongodb://admin:password@spotify-database/spotify?retryWrites=true&w=majority&authSource=admin&readPreference=nearest```

### Fields details

#### Streaming history

|                 Field               |   Type   |  Description        |
|:-----------------------------------:|:--------:|:--------------------|
| `ts`                                | Datetime | This field is a timestamp indicating when the track stopped playing in UTC (Coordinated Universal Time). The order is year, month and day followed by a timestamp in military time |
| `username`                          | String   | This field is your Spotify username. |
| `platform`                          | String   | This field is the platform used when streaming the track (e.g. Android OS, Google Chromecast). |
| `ms_played`                         | Integer  | This field is the number of milliseconds the stream was played. |
| `conn_country`                      | String   | This field is the country code of the country where the stream was played (e.g. SE - Sweden). |
| `ip_addr_decrypted`                 | String   | This field contains the IP address logged when streaming the track. |
| `user_agent_decrypted`              | String   | This field contains the user agent used when streaming the track (e.g. a browser, like Mozilla Firefox, or Safari). |
| `master_metadata_track_name`        | String   | This field is the name of the track. |
| `master_metadata_album_artist_name` | String   | This field is the name of the artist, band or podcast. |
| `master_metadata_album_album_name`  | String   | This field is the name of the album of the track. |
| `spotify_track_uri`                 | String   | A Spotify URI, uniquely identifying the track in the form of “spotify:track:<base-62 string>”. |
| `episode_name`                      | String   | This field contains the name of the episode of the podcast. |
| `episode_show_name`                 | String   | This field contains the name of the show of the podcast. |
| `spotify_episode_uri`               | String   | A Spotify Episode URI, uniquely identifying the podcast episode in the form of “spotify:episode:<base-62 string>”. |
| `reason_start`                      | String   | This field is a value telling why the track started (e.g. “trackdone”, see below). |
| `reason_end`                        | String   | This field is a value telling why the track ended (e.g. “endplay”, see below). |
| `shuffle`                           | Boolean  | This field has the value True or False depending on if shuffle mode was used when playing the track. |
| `skipped`                           | Boolean  | This field indicates if the user skipped to the next song. |
| `offline`                           | Boolean  | This field indicates whether the track was played in offline mode (“True”) or not (“False”). |
| `offline_timestamp`                 | Integer  | This field is a timestamp of when offline mode was used, if used. |
| `incognito_mode`                    | Boolean  | This field indicates whether the track was played in incognito mode (“True”) or not (“False”). |

`reason_start` identified values :
- appload
- backbtn
- clickrow
- clickside
- fwdbtn
- persisted
- playbtn
- popup
- remote
- trackdone
- trackerror
- unknown
- uriopen

`reason_end` identified values :
- backbtn
- clickrow
- clickside
- endplay
- fwdbtn
- logout
- playbtn
- popup
- remote
- trackdone
- trackerror
- unexpected-exit
- unexpected-exit-while-paused
- unknown
- uriopen

#### Playlists

|         Field       |   Type   |  Description                              |
|:-------------------:|:--------:|:------------------------------------------|
| `name`              | String   | Playlist name.                            |
| `lastModifiedDate`  | Datetime | Last modified date (note: no time given). |
| `description`       | String   | Playlist description.                     |
| `tracksCount`       | Integer  | Number of tracks for given playlist.      |
| `numberOfFollowers` | Integer  | Number of followers for given playlist.   |
| `items`             | Array    | Playlist tracks.                          |

### Miscellaneous

#### Querying MongoDB

Mongo database is queryable by running :
```bash
$ docker exec -it spotify-database mongosh spotify \ 
    --username admin --password password --authenticationDatabase admin
```

#### Re-importing data

Data can be re-imported by running :
```bash
$ docker stop spotify-database
$ docker rm spotify-database
$ docker volume rm spotify-db
$ docker-compose up -d database
```

#### Duration conversion cheatsheet

To convert milliseconds to human-readable unit :
| Wanted unit   | Operation              |
|---------------|------------------------|
| ms to seconds | divide by `1 000`      |
| ms to minutes | divide by `60 000`     |
| ms to hours   | divide by `3 600 000`  |
| ms to days    | divide by `86 400 000` |