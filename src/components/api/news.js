import axios from 'axios';

const BASE_URL = 'https://investing-cryptocurrency-markets.p.rapidapi.com/coins'

const api = axios.create({
	baseURL: BASE_URL,
})

export const getNews = async (page = 1) => {
	try {
		const res = await api.get("/get-news", {
			params: {
				pair_ID: '1057391', // Setting Bitcoin as the general focus of the news.
				page: page, // Query parameter sent from the client side.
				time_utc_offset: '28800',
				lang_ID: '1'
			},
			headers: {
				'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY
			}
		})
		const news = res.data.data[0].screen_data.news
		console.log(news)
		return news;
	} catch (error) {
		throw new Error("Failed to get news.");
	}
}