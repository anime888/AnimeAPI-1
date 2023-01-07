import express from 'express';
const router = express.Router();

import {
    fetchAllanimeRecentEpisodes,
    fetchSearchAllanime,
    fetchAllanimeInfo,
    fetchAllanimeEpisodeSource
} from '../scraper/scrape.js';


router.get('/recent-episodes', async (req, res) => {
    const data = await fetchAllanimeRecentEpisodes();
    res.json(data).status(200);
})

router.get('/search', async (req, res) => {
    const keyw = req.query.keyw;

    const data = await fetchSearchAllanime({ keyw });
    res.json(data).status(200);
});

router.get('/info/:animeId', async (req, res) => {
    const animeId = req.params.animeId;

    const data = await fetchAllanimeInfo({ animeId });
    res.json(data).status(200);
});

router.get('/watch/:episodeId', async (req, res) => {
    const episodeId = req.params.episodeId;

    const data = await fetchAllanimeEpisodeSource({ episodeId });
   	if (data.sources) {
		res.redirect(
			307,
			'https://plyr.link/p/player.html#' + btoa(data.sources[0].link)
		);
	} else {
		res.status(404).json({message:"Not found episode"})
	}
		});
	}
})


export default router;
