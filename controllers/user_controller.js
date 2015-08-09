var users = {
		admin:{id:1, username:"admin", password:"1234"},
		pepe:{id:2, username:"pepe", password:"5678"},
};

exports.autenticar = function(login, password, callback){
	console.log('user_controler.autenticar');
	if (users[login]) {
		if (password === users[login].password) {
			console.log('user_controler.autenticar'+' login OK');
			callback(null, users[login]);
		} else {
			console.log('user_controler.autenticar'+' login NOK (Password)');
			callback(new Error('Password erróneo'));
		}
	} else {
		console.log('user_controler.autenticar'+' login NOK (user)');
		callback(new Error('No existe el usuario'));
	}
};
