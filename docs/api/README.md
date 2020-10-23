# Endpoint Documentation

All endpoints return a JSON body (unless otherwise noted) that can be parsed and used to your liking.

## Instance Information

Information like the version of the instance, the port it is running on, and what type it's running on (either ``all`` or ``apiOnly``).

### GET ``/api/``

#### [Example Body](./example-responses/instanceInfo.json)


## Trending Tab
Get the currently trending YouTube videos.

### GET ``/api/trending``

#### [Example Body](./example-responses/trendingYt.json)


The example gets regular trending videos.

## Trending on Reddit
This uses a package called [``redddit``](https://github.com/n0rmancodes/redddit) to get the top posts with YouTube links of any given subreddit.

### GET ``/api/reddit``

#### Parameters
```
sub: subreddit to look at
```

#### [Example Body](./example-response/trendingReddit.json)


This examples get the top videos in /r/DeepIntoYouTube.

## Search YouTube

This searches YouTube for content using [``ytsr``](https://github.com/TimeForANinja/node-ytsr).

### GET ``/api/search``

#### Parameters
```
q: query
src: "youtube", "reddit", blank
```

#### [Example Body (YouTube)](./example-responses/youtubeSearch.json) 
#### [Example Body (Reddit)](./example-responses/redditSearch.json)


## Search for Reddit posts about a YouTube video

Search Reddit for posts about a specific YouTube video.

### GET ``/api/reddit/search``

### Parameters
```
id: YouTube video ID.
url: YouTube video URL.
```

You must use one parameter or the other **not both**.

### [Example Body](./example-responses/redditPostSearch.json)

## Deezer Charts
Get the most popular songs on Deezer.

### GET ``/api/deezer/charts``

#### [Example Body](./example-responses/deezerCharts.json)


## Deezer Search
This searches a query on Deezer, for use with the audio mode on VidPolaris

### GET ``/api/deezer/search`` 

#### Parameters
```
q: query
type: "artist", "album", "song"
```

#### [Example Body](./example-responses/deezerSearch.json)


## Deezer Album/Artist/Song

### GET ``/api/deezer/``

#### Parameters
```
type: "album", "artist", "song",
id: Deezer id
```

## Video Infomation
This gets video infomation and formats from any given ID and/or YouTube url. Retrived by [``node-ytdl-core``](https://github.com/fent/node-ytdl-core).

### GET ``/api/info``

#### Parameters
```
id: YouTube video ID
url: YouTube video URL
```

**NOTE** You cannot use both, you must use one or the other.

#### [Example Body](./example-responses/ytInfo.json)


## Specific Format for YouTube video
Gets a specific format/quality of a YouTube video.

### GET ``/api/itag/``

#### Parameters
```
id*: YouTube video ID.
url*: YouTube video URL.
itag: YouTube video ITAG.
```
* = One or the other, **not both**.

#### [Example Body](./example-responses/ytItag.json) 