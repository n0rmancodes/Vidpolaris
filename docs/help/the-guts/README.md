# How VidPolaris Works
## The Basics
VidPolaris works using things called packages. These packages pull things from websites to let programs like
VidPolaris read and parse them for their use.

Packages can be found and published on a website called [npmjs.com](https://npmjs.com). 

Most reasons that VidPolaris has errors is due to outdated packages. Updating VidPolaris regularly, along with running 
``npm outdated`` to find outdated packages can go a long way.
## More Specific
Most of VidPolaris uses the packages 
- [ytdl-core](https://www.npmjs.com/package/ytdl-core) for getting video information.
- [got](https://www.npmjs.com/package/got) for most proxying HTTP requests

Reddit functionalities (trending on Reddit, Reddit-based searches, etc.) uses a package I made called [redddit](https://www.npmjs.com/package/redddit).

Other core functionalities of the site, like channels, playlists, the trending tab, and searches use
- [ytsr](https://www.npmjs.com/package/ytsr) for searches.
- [ytpl](https://www.npmjs.com/package/ytpl) for playlists (unused currently).
- [yt-channel-info](https://www.npmjs.com/package/yt-channel-info) for channel pages.
- [yt-trending-scraper](https://www.npmjs.com/package/yt-trending-scraper) for the trending data.

Utility scripts like [cheerio](https://www.npmjs.com/package/cheerio) are being used to edit HTML pages when they are loaded.

On VidPolaris Music, [deezer-public-api](https://www.npmjs.com/package/deezer-public-api) is used to get song metadata.

Along with VidPolaris's base code, that's what is used to make VidPolaris run.