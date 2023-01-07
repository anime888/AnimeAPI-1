<div align="center">
<img src="https://capsule-render.vercel.app/api?type=waving&color=auto&height=300&section=header&text=AnimeAPI&fontSize=90&animation=fadeIn&fontAlignY=38&desc=anime%20streaming%20and%20discovery%20api&descAlignY=51&descAlign=62" align="center" style="width: 100%" />
</div>  
  
### <div align="center">AnimeAPI is a anime streaming and discovery api built using NodeJS and express that scrapes Gogoanime and some other services to return data</div>  


<p align="center">
    <a href="https://github.com/IGRohan/AnimeAPI">
      <img src="https://img.shields.io/github/license/IGRohan/AnimeAPI?style=flat-square" alt="Github license">
    </a>
     <a href="https://github.com/IGRohan/AnimeAPI">
      <img src="https://img.shields.io/github/package-json/v/IGRohan/AnimeAPI/main?style=flat-square" alt="GitHub package.json version">
    </a>
</p>



<br/>

## Navigation
- [Navigation](#navigation)
- [Installation](#installation)
- [Available Routes](#available-routes)
  - [AnimeAPI docs will be available soon](#animeapi-docs-will-be-available-soon)
- [Contributing](#contributing)

## Installation
Execute the following commands in your terminal:

```sh
git clone https://github.com/IGRohan/AnimeAPI.git
cd AnimeAPI
npm install
npm start
```

## Available Routes

> **IMPORTANT:**
Animixplay has shut down, forever. The routes for animixplay will not be removed, however they do not work anymore.


You may test out these routes by going to [AnimeAPI demo](https://animeapi-57t9.onrender.com/), but do note that this might be very slow and it is recommended to self host to get the fastest response time possible.

### AnimeAPI docs will be available soon
Until then, the base structure for routes are:

**Search**: `/{provider}/search?keyw={query}` <br>
**Info**: `/{provider}/info/{animdId}` <br>
**Episode Source**: `/{provider}/watch/{episodeId}`

## Contributing

Contributions are always welcome!

You can contribute to this project by forking the project, adding
/making changes, and submitting a pull request.

However the best way to contribute would be to suggest new routes
or features and if possible, showing the logic and process behind
it.
