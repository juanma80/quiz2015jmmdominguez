//comment_controller
var models = require('../models/models.js');

//Autoload :id de comentarios
exports.load = function(req, res, next, commentId) {
	console.log('comment_controller.load');
	var autologoutController = require('./autologout_controller');
	autologoutController.watchDog(req,res,
		function(){
			models.Comment.find({
				where: {
					id: Number(commentId)}
				}).then(function(comment){
					if (comment) {
						req.comment = comment;
						next();
					} else {
						next(new Error('No existe commentdId=' + commentdId));
					}
				}
			).catch(function(error) {
				next(error);
			});
		}
	);
}

exports.publish = function(req, res) {
	console.log('comment_controller.publish');
	var autologoutController = require('./autologout_controller');
	autologoutController.watchDog(req,res,
		function(){
		  req.comment.publicado = true;
		  req.comment.save({fields: ["publicado"]}).
			then(function() { 
				res.redirect('/quizes/'+req.params.quizId);
			}).
			catch(function(error) {next(error);});
		  //res.render('comments/new', { quizid: req.params.quizId, errors:[]});
		}
	);
};

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
