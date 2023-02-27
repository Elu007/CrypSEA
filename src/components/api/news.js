import axios from 'axios';

export default async function handler(req, res) {
	const options = {
		method: 'GET',
		url: 'https://investing-cryptocurrency-markets.p.rapidapi.com/coins/get-news',
		params: {
			pair_ID: '1057391', // Setting Bitcoin as the general focus of the news.
			page: req.query.page, // Query parameter sent from the client side.
			time_utc_offset: '28800',
			lang_ID: '1'
		},
		headers: {
			'x-rapidapi-host':
				'investing-cryptocurrency-markets.p.rapidapi.com',
			'x-rapidapi-key': 'd8b6ef1eedmshd29a867b6652fcfp13c047jsnd6cf9d0aa95e'
		}
	};
	axios
		.request(options)
		.then(function (response) {
			res.status(200).json(response.data);
		})
		.catch(function (error) {
			console.error(error);
		});
}