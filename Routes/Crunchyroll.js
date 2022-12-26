import express from "express";
const router = express.Router();

import {
    fetchSearchCrunchyroll,
    fetchCrunchyrollEpisodes,
    fetchCrunchyrollSources
} from "../scraper/scrape.js";

router.get('/search', async (req, res) => {
    const keyw = req.query.keyw;

    const data = await fetchSearchCrunchyroll({ keyw: keyw });
    res.json(data).status(200)
});

router.get('/episodes/:id', async (req, res) => {
    const id = req.params.id;

    const data = await fetchCrunchyrollEpisodes({ id });
    res.json(data).status(200)
});

router.get('/watch/:episodeId', async (req, res) => {
	const episodeId = req.params.episodeId;

	const data = await fetchCrunchyrollSources({ episodeId });
	if (data.sources) {
		const result = data.sources.find(source => source.hardsub_locale === 'en-US')
		if(!result) return res.status(400).json({message:"Not found en-Us"})
		res.redirect(
			307,
			'https://plyr.link/p/player.html#' + btoa(result.url)
		);
	} else {
		res.status(404).json({message:"Not found episode", data})
	}
});

export default router;
