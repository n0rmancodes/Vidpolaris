# Endpoint Documentation

All endpoints return a JSON body (unless otherwise noted) that can be parsed and used to your liking.

## Instance Information

Information like the version of the instance, the port it is running on, and what type it's running on (either ``all`` or ``apiOnly``).

### GET ``/api/``

#### Example Body:

```json
{
    "err": "invalidEnpoint",
    "version": "0.2",
    "port": 3001,
    "type": "all"
}
```

[Example](https://beta.vidpolaris.ml/api/)

## Trending Tab

This currently runs on Invidious's data, but will be replaced with our own scraping method soon!

### GET ``/api/trending``

#### Parameters

```
inst: "snopyta", "13ad", "gcc" (defaults to "snopyta")
type: "music", "gaming", "news", "movies", none (defaults to none (general))
locale: ISO 3166 country code (defaults to "US")
```

#### Example Body

```json
[
    {
        "type":"video",
        "title":"I Downloaded The World's Hardest Mod!",
        "videoId":"ELS5RLbSukU",
        "author":"MrBeast Gaming",
        "authorId":"UCIPPMRA040LQr5QPyJEbmXA",
        "authorUrl":"/channel/UCIPPMRA040LQr5QPyJEbmXA",
        "videoThumbnails":[{
            "quality":"maxres",
            "url":"https://invidious.snopyta.org/vi/ELS5RLbSukU/maxres.jpg",
            "width":1280,
            "height":720
        }],
        "description":"We played the hardest mod created for Minecraft. Dark Souls is basically for babies after this.\n\n\nShout out to RL Craft for the content! Check it out here: https://www.curseforge.com/minecraft/modp...",
        "descriptionHtml":"We played the hardest mod created for Minecraft. Dark Souls is basically for babies after this.\n\n\nShout out to RL Craft for the content! Check it out here: https://www.curseforge.com/minecraft/modp...",
        "viewCount":1356774,
        "published":1597169468,
        "publishedText":"4 hours ago",
        "lengthSeconds":605,
        "liveNow":false,
        "paid":false,
        "premium":false,
        "isUpcoming":false
    }
]
```

[Example](https://beta.vidpolaris.ml/api/trending?type=gaming&locale=CA)

The example gets trending gaming videos in Canada.

## Trending on Reddit

This uses a package called [``redddit``](https://github.com/n0rmancodes/redddit) to get the top posts with YouTube links of any given subreddit.

### GET ``/api/reddit``

#### Parameters
```
sub: subreddit to look at
```

#### Example Body
```json
[
    {
        "title":"Damn: Andy Levy Of Fox News Apologizes For Chris Brown \"Punching\" Tweet!",
        "author":"365DailyMusicHere",
        "id":"sxPl9ftWGvY",
        "originalUrl":"https://www.youtube.com/watch?v=sxPl9ftWGvY",
        "score":24442
    }
]
```

[Example](https://beta.vidpolaris.ml/api/reddit?sub=DeepIntoYouTube)

This examples get the top videos in /r/DeepIntoYouTube.

## Search for a video on Reddit

Search Reddit for posts about a specific YouTube video.

### GET ``/api/reddit/search```

### Parameters
```
id: YouTube video ID.
url: YouTube video URL.
```

You must use one parameter or the other **not both**.

### Example Body 
```json

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

#### Example Body 

```
To be written.
```

[Example](https://beta.vidpolaris.ml/api/info?id=ymbw2R3uIqc)

This example gets formats and metadata of [the legendary SiIvagunner rip of Creative Exercise](https://www.youtube.com/watch?v=ymbw2R3uIqc).


## Specific Format for YouTube video

### GET ``/api/itag/``

#### Parameters
```
id*: YouTube video ID.
url*: YouTube video URL.
itag: YouTube video ITAG.
```
* = One or the other, **not both**.

#### Example Body 
```json
{
    "mimeType":"video/mp4; codecs=\"avc1.4d400d\"",
    "qualityLabel":"240p",
    "bitrate":225840,
    "audioBitrate":null,
    "itag":133,
    "width":352,
    "height":240,
    "initRange":{
        "start":"0",
        "end":"733"
    },
    "indexRange":{
        "start":"734",
        "end":"1677"},
    "lastModified":"1577535225391991",
    "contentLength":"9932885",
    "quality":"small",
    "fps":30,
    "projectionType":"RECTANGULAR",
    "averageBitrate":195527,
    "approxDurationMs":"406403",
    "s":"===gJ0jWlRpH421emBpKH-zHSpiuPU_1nLlH39pkP1hWVpDQICofVXiKaAqks7qj7VxBxHgvU00NZD1l6t6wN9_9_6o1WgIQRw8JQ0qO55",
    "sp":"sig",
    "url":"<insert url here>",
    "hasVideo":true,
    "hasAudio":false,
    "container":"mp4",
    "codecs":"avc1.4d400d",
    "videoCodec":"avc1.4d400d",
    "audioCodec":null,
    "isLive":false,
    "isHLS":false,
    "isDashMPD":false
}
```

[Example](https://beta.vidpolaris.ml/api/itag?id=0XgdWnsT0yc&itag=133)

Getting itag 133 on a random video I found browsing Reddit.

## Search YouTube

This searches YouTube for content using [``ytsr``](https://github.com/TimeForANinja/node-ytsr).

### GET ``/api/search``

#### Parameters
```
q: query
```

#### Example Body 
```json
{
    "query":"creative exercise siivagunner",
    "items":[
        {
            "type":"video",
            "live":false,
            "title":"Creative Exercise - Mario Paint",
            "link":"https://www.youtube.com/watch?v=ymbw2R3uIqc",
            "thumbnail":"https://i.ytimg.com/vi/ymbw2R3uIqc/hqdefault.jpg?sqp=-oaymwEjCPYBEIoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLBxJZ0Vk2TEe9qPo5ccuw-i7rtEsA",         
            "author":{
                "name":"SiIvaGunner",
                "ref":"https://www.youtube.com/channel/UC9ecwl3FTG66jIKA9JRDtmg",
                "verified":false
            },
            "description":"Music: Creative Exercise Composer: Kazumi Totaka Playlist: ...",
            "views":2122280,
            "duration":"2:02",
            "uploaded_at":"4 years ago"
        }
    ]
}
```

[Example](https://beta.vidpolaris.ml/api/search?q=creative%20exercise%20siivagunner)

This searches YouTube for Creative Excerise by SiIvagunner.