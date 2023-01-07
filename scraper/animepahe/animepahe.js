import axios from 'axios';
import { load } from 'cheerio';

const animepaheBase = `https://animepahe.com/`;
const animepaheApi = `https://animepahe.com/api`;
import { extractSource } from '../../helper/kwik.js';


export const fetchSearchAnimepahe = async ({ keyw, list = [] }) => {
    try {
        if (!keyw) return {
            error: true,
            error_message: "No keyword provided"
        };

        const { data } = await axios.get(animepaheApi, {
            params: {
                m: 'search',
                q: keyw
            }
        });

        data.data.map((anime) => {
            list.push({
                animeTitle: anime.title,
                animeId: anime.session,
                animeImg: anime.poster,
                totalEpisodes: anime.episodes,
                type: anime.type,
                status: anime.status,
                season: anime?.season + ' ' + anime?.year,
                score: anime.score
            })
        })

        return list;
    } catch (error) {
        return {
            error: true,
            error_message: error
        }
    }
}

export const fetchAnimepaheInfo = async ({ animeId, page = 1, list = {} }) => {
    try {
        if (!animeId) return {
            error: true,
            error_message: "No animeId provided"
        };

        const res = await axios.get(`${animepaheBase}/anime/${animeId}`);
        const $ = load(res.data);

        const epList = await axios.get(animepaheApi, {
            params: {
                m: "release",
                id: animeId,
                sort: "episode_asc",
                page: page
            }
        });

        let episodes = [];

        epList.data.data.map((ep) => {
            episodes.push({
                epNum: ep.episode,
                episodeId: ep.session,
                thumbnail: ep.snapshot,
                duration: ep.duration,
                isFiller: ep.filler ? true : false,
                isBD: ep.disc === "BD" ? true : false
            })
        })

        list = {
            animeTitle: $('div.title-wrapper > h1 > span').text(),
            animeId: animeId,
            animeImg: $('div.anime-poster > a').attr('href'),
            synopsis: $('div.anime-synopsis')?.text()?.trim(),
            otherTitles: $('div.anime-info > p:nth-child(1)')?.text()?.split("Synonyms:")[1]?.trim(),
            type: $('div.anime-info > p:nth-child(3) > strong > a')?.text(),
            totalEpisodes: $('div.anime-info > p:nth-child(4)')?.text(),
            status: $('div.anime-info > p:nth-child(5) > strong > a')?.text(),
            duration: $('div.anime-info > p:nth-child(6)')?.text()?.split("Duration:")[1]?.trim(),
            season: $('div.anime-info > p:nth-child(8) > strong > a')?.text(),
            studio: $('div.anime-info > p:nth-child(9)')?.text()?.split("Studio:")[1]?.trim(),
            genres: Array.from($('div.anime-genre > ul > li')?.map((i, el) => $(el).find('a').text())),
            episodesPage: page,
            totalEpisodesPage: epList.data.last_page,
            episodes
        };

        return list;

    } catch (error) {
        console.log(error)
        return {
            error: true,
            error_message: error
        }
    }
};

export const fetchAnimepaheEpisodeSource = async ({ episodeId, list = [] }) => {
    try {
        if (!episodeId) return {
            error: true,
            error_message: "No episodeId provided"
        };

        const { data } = await axios.get(animepaheApi, {
            params: {
                m: "links",
                id: episodeId
            }
        });


        await Promise.all(data.data.map(async (source) => {
            const key = Object.keys(source)[0]
            const sourceUrl = await extractSource(source[key].kwik);

            list.push({
                quality: key,
                audioLanguage: source[key].audio,
                file: sourceUrl
            })
        }))

        return {
            referer: 'https://kwik.cx/',
            sources: list.sort((a, b) => b.audioLanguage.localeCompare(a.audioLanguage))
        };
    } catch (error) {
        // console.log(error)
        return {
            error: true,
            error_message: error
        }
    }
};