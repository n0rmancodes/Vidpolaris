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

[Example](https://vidpolaris.tube/api/)

## Trending Tab

### GET ``/api/trending``

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

[Example](https://vidpolaris.tube/api/trending?type=gaming&locale=CA)

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

[Example](https://vidpolaris.tube/api/reddit?sub=DeepIntoYouTube)

This examples get the top videos in /r/DeepIntoYouTube.

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

[Example](https://vidpolaris.tube/api/search?q=creative%20exercise%20siivagunner)

This searches YouTube for Creative Excerise by SiIvagunner.

## Search for a video on Reddit

Search Reddit for posts about a specific YouTube video.

### GET ``/api/reddit/search``

### Parameters
```
id: YouTube video ID.
url: YouTube video URL.
```

You must use one parameter or the other **not both**.

### Example Body 
```json
[
    {
        "kind":"t3",
        "data":{
            "approved_at_utc":null,
            "subreddit":"Reaper",
            "selftext":"",
            "author_fullname":"t2_20nyhj",
            "saved":false,
            "mod_reason_title":null,
            "gilded":0,
            "clicked":false,
            "title":"How would I make something like this in reaper?",
            "link_flair_richtext":[],
            "subreddit_name_prefixed":"r/Reaper",
            "hidden":false,
            "pwls":6,
            "link_flair_css_class":"",
            "downs":0,
            "thumbnail_height":105,
            "top_awarded_type":null,
            "hide_score":false,
            "name":"t3_c20kli",
            "quarantine":false,
            "link_flair_text_color":"light",
            "upvote_ratio":0.5,
            "author_flair_background_color":null,
            "subreddit_type":"public",
            "ups":0,
            "total_awards_received":0,
            "media_embed":{
                "content":"&lt;iframe width=\"600\" height=\"338\" src=\"https://www.youtube.com/embed/ymbw2R3uIqc?feature=oembed&amp;enablejsapi=1\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen&gt;&lt;/iframe&gt;",
                "width":600,
                "scrolling":false,
                "height":338
            },
            "thumbnail_width":140,
            "author_flair_template_id":null,
            "is_original_content":false,
            "user_reports":[],
            "secure_media":{
                "type":"youtube.com",
                "oembed":{
                    "provider_url":"https://www.youtube.com/",
                    "version":"1.0",
                    "title":"Creative Exercise - Mario Paint",
                    "type":"video",
                    "thumbnail_width":480,
                    "height":338,
                    "width":600,
                    "html":"&lt;iframe width=\"600\" height=\"338\" src=\"https://www.youtube.com/embed/ymbw2R3uIqc?feature=oembed&amp;enablejsapi=1\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen&gt;&lt;/iframe&gt;",
                    "author_name":"SiIvaGunner",
                    "provider_name":"YouTube",
                    "thumbnail_url":"https://i.ytimg.com/vi/ymbw2R3uIqc/hqdefault.jpg",
                    "thumbnail_height":360,
                    "author_url":"https://www.youtube.com/channel/UC9ecwl3FTG66jIKA9JRDtmg"
                }
            },
            "is_reddit_media_domain":false,
            "is_meta":false,
            "category":null,
            "secure_media_embed":{
                "content":"&lt;iframe width=\"600\" height=\"338\" src=\"https://www.youtube.com/embed/ymbw2R3uIqc?feature=oembed&amp;enablejsapi=1\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen&gt;&lt;/iframe&gt;",
                "width":600,
                "scrolling":false,
                "media_domain_url":"https://www.redditmedia.com/mediaembed/c20kli",
                "height":338
            },
            "link_flair_text":"help request",
            "can_mod_post":false,
            "score":0,
            "approved_by":null,
            "author_premium":false,
            "thumbnail":"https://b.thumbs.redditmedia.com/9FXCJ44WnaTmGPE33s37wbaESdCSH33he4iFUq9uYoQ.jpg",
            "edited":false,
            "author_flair_css_class":null,
            "author_flair_richtext":[],
            "gildings":{},
            "post_hint":"rich:video",
            "content_categories":null,
            "is_self":false,
            "mod_note":null,
            "created":1560882396,
            "link_flair_type":"text",
            "wls":6,
            "removed_by_category":null,
            "banned_by":null,
            "author_flair_type":"text",
            "domain":"youtu.be",
            "allow_live_comments":false,
            "selftext_html":null,
            "likes":null,
            "suggested_sort":null,
            "banned_at_utc":null,
            "url_overridden_by_dest":"https://youtu.be/ymbw2R3uIqc",
            "view_count":null,
            "archived":true,
            "no_follow":true,
            "is_crosspostable":false,
            "pinned":false,
            "over_18":false,
            "preview":{
                "images":[
                    {
                        "source":{
                            "url":"https://external-preview.redd.it/CK2dnsk9Di7A9-kkEBhZA9IzhLxXm_waU0SgGEqbnBI.jpg?auto=webp&amp;s=73a1216d5b309dddf8491e75fb6d2218f9f92935",
                            "width":480,
                            "height":360
                        },
                        "resolutions":[
                            {
                                "url":"https://external-preview.redd.it/CK2dnsk9Di7A9-kkEBhZA9IzhLxXm_waU0SgGEqbnBI.jpg?width=108&amp;
                            crop=smart&amp;auto=webp&amp;s=5ec5985b3c48336a38c42ab52c60237c7b4ea5b8",
                                "width":108,
                                "height":81
                            },{
                                "url":"https://external-preview.redd.it/CK2dnsk9Di7A9-kkEBhZA9IzhLxXm_waU0SgGEqbnBI.jpg?width=216&amp;crop=smart&amp;auto=webp&amp;s=a8ee90005babac5bb7248ad1d0159d6c198a2e4f",
                                "width":216,
                                "height":162
                            },{
                                "url":"https://external-preview.redd.it/CK2dnsk9Di7A9-kkEBhZA9IzhLxXm_waU0SgGEqbnBI.jpg?width=320&amp;crop=smart&amp;auto=webp&amp;s=c019929912948dd7835e95fa6f0bdd0b5e19ecd5",
                                "width":320,
                                "height":240
                            }
                        ],
                        "variants":{},
                        "id":"WXfE6XBU88YcePnUC7d7O8kw-9UXiifOiDuY280Sbd4"
                    }
                ],
                "enabled":false
            },
            "all_awardings":[],
            "awarders":[],
            "media_only":false,
            "link_flair_template_id":"88b0cca8-d9e0-11e5-a548-0e81bdc99363",
            "can_gild":false,
            "spoiler":false,
            "locked":false,
            "author_flair_text":null,
            "treatment_tags":[],
            "visited":false,
            "removed_by":null,
            "num_reports":null,
            "distinguished":null,
            "subreddit_id":"t5_2rm0e",
            "mod_reason_by":null,
            "removal_reason":null,
            "link_flair_background_color":"#2192cc",
            "id":"c20kli",
            "is_robot_indexable":true,
            "report_reasons":null,
            "author":"WaveOfMicrowave",
            "discussion_type":null,
            "num_comments":9,
            "send_replies":true,
            "whitelist_status":"all_ads",
            "contest_mode":false,
            "mod_reports":[],
            "author_patreon_flair":false,
            "author_flair_text_color":null,
            "permalink":"/r/Reaper/comments/c20kli/how_would_i_make_something_like_this_in_reaper/",
            "parent_whitelist_status":"all_ads",
            "stickied":false,
            "url":"https://youtu.be/ymbw2R3uIqc",
            "subreddit_subscribers":26411,
            "created_utc":1560853596,
            "num_crossposts":0,
            "media":{
                "type":"youtube.com",
                "oembed":{
                    "provider_url":"https://www.youtube.com/",
                    "version":"1.0","title":"Creative Exercise - Mario Paint",
                    "type":"video",
                    "thumbnail_width":480,
                    "height":338,
                    "width":600,
                    "html":"&lt;iframe width=\"600\" height=\"338\" src=\"https://www.youtube.com/embed/ymbw2R3uIqc?feature=oembed&amp;enablejsapi=1\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen&gt;&lt;/iframe&gt;",
                    "author_name":"SiIvaGunner",
                    "provider_name":"YouTube",
                    "thumbnail_url":"https://i.ytimg.com/vi/ymbw2R3uIqc/hqdefault.jpg",
                    "thumbnail_height":360,
                    "author_url":"https://www.youtube.com/channel/UC9ecwl3FTG66jIKA9JRDtmg"
                }
            },
            "is_video":false
        }
    }
]
```

[Example](https://vidpolaris.tube/api/reddit/search?id=ymbw2R3uIqc)

## Deezer Charts
Get the most popular songs on Deezer.

### GET ``/api/deezer/charts``

#### Example Body

```json
    {
        "id":986939372,
        "title":"Savage Love (Laxed - Siren Beat)",
        "title_short":"Savage Love (Laxed - Siren Beat)",
        "title_version":"",
        "link":"https://www.deezer.com/track/986939372",
        "duration":171,
        "rank":997408,
        "explicit_lyrics":true,
        "explicit_content_lyrics":0,
        "explicit_content_cover":0,
        "preview":"https://cdns-preview-f.dzcdn.net/stream/c-fad919850f67c847921eee0647c068ea-3.mp3",
        "position":1,
        "artist":{
            "id":92319522,
            "name":"Jawsh 685",
            "link":"https://www.deezer.com/artist/92319522",
            "picture":"https://api.deezer.com/artist/92319522/image",
            "picture_small":"https://cdns-images.dzcdn.net/images/artist/ae220905519d1bb84cddd953abbc08da/56x56-000000-80-0-0.jpg",
            "picture_medium":"https://cdns-images.dzcdn.net/images/artist/ae220905519d1bb84cddd953abbc08da/250x250-000000-80-0-0.jpg",
            "picture_big":"https://cdns-images.dzcdn.net/images/artist/ae220905519d1bb84cddd953abbc08da/500x500-000000-80-0-0.jpg",
            "picture_xl":"https://cdns-images.dzcdn.net/images/artist/ae220905519d1bb84cddd953abbc08da/1000x1000-000000-80-0-0.jpg",
            "radio":true,
            "tracklist":"https://api.deezer.com/artist/92319522/top?limit=50",
            "type":"artist"
        },
        "album":{
            "id":153680822,
            "title":"Savage Love (Laxed - Siren Beat)",
            "cover":"https://api.deezer.com/album/153680822/image",
            "cover_small":"https://cdns-images.dzcdn.net/images/cover/ae220905519d1bb84cddd953abbc08da/56x56-000000-80-0-0.jpg",
            "cover_medium":"https://cdns-images.dzcdn.net/images/cover/ae220905519d1bb84cddd953abbc08da/250x250-000000-80-0-0.jpg",
            "cover_big":"https://cdns-images.dzcdn.net/images/cover/ae220905519d1bb84cddd953abbc08da/500x500-000000-80-0-0.jpg",
            "cover_xl":"https://cdns-images.dzcdn.net/images/cover/ae220905519d1bb84cddd953abbc08da/1000x1000-000000-80-0-0.jpg",
            "tracklist":"https://api.deezer.com/album/153680822/tracks",
            "type":"album"
        },
        "type":"track"
    }
```

## Deezer Search
This searches a query on Deezer, for use with the audio mode on VidPolaris

### GET ``/api/deezer/search`` 

#### Parameters
```
q: query
type: "artist", "album", "song"
```

#### Example Body
```
WIP
```

[Example](https://vidpolaris.tube/api/deezer/search?type=song&id=12345678) 

## Deezer Album/Artist/Song

### GET ``/api/deezer/``

#### Parameters
```
type: "album", "artist", "song",
id: Deezer id
```

#### Example Body
```
WIP
```

[Example](https://vidpolaris.tube/api/deezer?type=song&id=12345678) 

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

[Example](https://vidpolaris.tube/api/info?id=ymbw2R3uIqc)

This example gets formats and metadata of [the legendary SiIvagunner rip of Creative Exercise](https://www.youtube.com/watch?v=ymbw2R3uIqc).


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

[Example](https://vidpolaris.tube/api/itag?id=0XgdWnsT0yc&itag=133)

Getting itag 133 on a random video I found browsing Reddit.