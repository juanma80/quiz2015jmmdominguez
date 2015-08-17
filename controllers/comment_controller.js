//comment_controller
var models = require('../models/models.js');

exports.new = function(req, res) {
	console.log('comment_controller.new');
	var autologoutController = require('./autologout_controller');
	autologoutController.watchDog(req,res,
		function(){
		  res.render('comments/new', { quizid: req.params.quizId, errors:[]});
		}
	);
};

exports.create = function(req, res) {
	console.log('comment_controller.create');
	var autologoutController = require('./autologout_controller');
	autologoutController.watchDog(req,res,
		function(){
			var valTexto = req.body.comment.texto;
			var valQuizId = req.params.quizId;
			
			console.log('valTexto['+valTexto+'] valQuizId['+valQuizId+']');
			
			var comment = models.Comment.build( 
				{
					texto: valTexto, 
					QuizId: valQuizId
				});
			var validation = comment.validate();

			if (validation) {
				var i=0; 
				var errors=new Array();
				for (var prop in validation) {
					errors[i++]={message: validation[prop]};
				}
				res.render('comments/new',
				{comment: comment, quizid: req.params.quizId, errors: errors});
			} else {
				comment.save().
					then(function(){
						res.redirect('/quizes/'+req.params.quizId);
					});
			}		
		}
	);
};
