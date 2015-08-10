var models = require('../models/models.js');

//Autoload
exports.load = function(req, res, next, quizId) {
	console.log('quiz_controller.load');
	var autologoutController = require('./autologout_controller');
	autologoutController.watchDog(req,res,
		function(){
			models.Quiz.find(quizId).then(
				function(quiz) {
					if (quiz) {
						req.quiz = quiz;
						next();
					} else {
						next(new Error('No existe quizId='+quizId));
					}
				}
			).catch(function(error) {next(error);});
		}
	);
};

//GET /quizes/
exports.index = function(req, res) {
	console.log('quiz_controller.index');
	
	var autologoutController = require('./autologout_controller');
	autologoutController.watchDog(req,res,
		function(){
			models.Quiz.findAll().then(
			function(quizes){
				res.render('quizes/index', {quizes: quizes});
			}
			).catch(function(error) {next(error);});
		}
	);
};

//GET /quizes/:id
exports.show = function(req, res) {
	console.log('quiz_controller.show');
	var autologoutController = require('./autologout_controller');
	autologoutController.watchDog(req,res,
		function(){
			res.render('quizes/show', {quiz: req.quiz});
		}
	);

	
};

//GET /quizes/:id/answer
exports.answer = function(req, res) {
	console.log('quiz_controller.answer');
	var autologoutController = require('./autologout_controller');
	autologoutController.watchDog(req,res,
		function(){
			var resultado = 'Incorrecto';
			if(req.query.respuesta === req.quiz.respuesta) {
				resultado = 'Correcto';
			}
			res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado});
		});
};

//GET /quizes/query
exports.query = function(req, res) {
	console.log('quiz_controller.query');
	var autologoutController = require('./autologout_controller');
	autologoutController.watchDog(req,res,
		function(){
			res.render('quizes/search');
		}
	);
};

//GET /quizes/search
exports.search = function(req, res) {
	console.log('quiz_controller.search');
	var autologoutController = require('./autologout_controller');
	autologoutController.watchDog(req,res,
		function(){
			var search = req.query.search;
			search = search.replace(/\s/g, "%");
			console.log('search- buscamos['+search+']');
			models.Quiz.findAll({where: ["pregunta like ?", '%' + search + '%']}).then(
			function(quizes){
				res.render('quizes/index', {quizes: quizes});
			}
			).catch(function(error) {next(error);});
		}
	);
};





