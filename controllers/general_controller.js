//general_controller

exports.init = function(req, res) {
	console.log('general_controller.init');
	var autologoutController = require('./autologout_controller');
	autologoutController.watchDog(req,res,
		function(){
		  res.render('index', { title: 'Quiz', errors:[]});
		}
	);
};

exports.author = function(req, res) {
	console.log('general_controller.author');
	var autologoutController = require('./autologout_controller');
	autologoutController.watchDog(req,res,
		function(){
			res.render('author', { title: 'Autor', errors:[]});
		}
	);
};
