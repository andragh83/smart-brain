
const handleSignin = (req, res, db, bcrypt)=> {
	const saltRounds = 10;
	const { email, password } = req.body;
	if (!email || !password ) {
		return res.status(400).json('incorrect form submission')
	}
	db.select('email', 'hash').from('login')
		.where('email', '=', email)
		.then(data => {
			bcrypt.compare(password, data[0].hash, function(err, isValid) {
    			if (isValid) {
    				return db.select('*').from('users')
	    				.where('email', '=', email)
	    				.then(user => {
	    					console.log(user);
	    					res.json(user[0]);
	    				})
	    				.catch(err => res.status(400).json('unable to get user'))
	    			} else {
	    				res.status(400).json('wrong credentials')
	    			}
			});
		})
		.catch(err => res.status(400).json('unable to signin'))
}

module.exports = {
	handleSignin: handleSignin
};