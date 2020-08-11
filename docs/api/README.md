# Endpoint Documentation

All endpoints return a JSON body that can be parsed and used to your liking.

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

```json
{
    "video": [], // An array of video only formats.
    "audio": [], // An array of audio only formats.
    "joined": [], // An array of formats with audio and video joined together.
    "info": {
        // To be written
    }
}

```

[Example](https://beta.vidpolaris.ml/api/info?id=ymbw2R3uIqc)

This example gets formats and metadata of [the legendary SiIvagunner rip of Creative Exercise](https://www.youtube.com/watch?v=ymbw2R3uIqc).