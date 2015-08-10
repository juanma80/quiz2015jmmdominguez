exports.new = function(req, res) {
	var errors = req.session.errors || {};
	req.session.errors = {};
	console.log('session_controller.new');
	res.render('sessions/new', {errors: errors});
};

exports.create = function(req, res) {
	var login = req.body.login;
	var password = req.body.password;
	console.log('session_controller.create');
	var userController = require('./user_controller');
	userController.autenticar(login, password, 
		function(error, user) {
			if (error) {
				req.session.errors = 
				[{"message": 'Se ha producido un error' + error}];
				res.redirect("/login");
				return;
			}
			
			//Control de tiempo de sesión
			var autologoutController = require('./autologout_controller');
			autologoutController.timeStamp(req,res);
			
			req.session.user = {id:user.id, username:user.username};
			res.redirect(req.session.redir.toString());
		});
};

exports.destroy = function(req, res, errors) {
	console.log('session_controller.destroy');
	delete req.session.user;
	//res.redirect("/login");
	res.render('sessions/out', {errors: errors});
};
