const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: 'bd54297934154ebba5bb359e2e482ed2'
});

const handleApiCall = (req, res) => {
	app.models
		.predict(
		    Clarifai.FACE_DETECT_MODEL, 
		    req.body.input)
		.then(data => {
			res.json(data)
		})
		.catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
	  .increment('entries', 1)
	  .returning('entries')
	  .then(entries => {
	  	res.json(entries[0])
	  })
	  .catch(err => res.status(400).json('unable to get rank'))
}

module.exports = {
	handleImage: handleImage,
	handleApiCall: handleApiCall
};