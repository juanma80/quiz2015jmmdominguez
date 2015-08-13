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
				res.render('quizes/index', {quizes: quizes, errors:[]});
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
			res.render('quizes/show', {quiz: req.quiz, errors:[]});
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
			res.render('quizes/answer', {quiz: req.quiz, 
				respuesta: resultado, errors:[]});
		});
};

//GET /quizes/query
exports.query = function(req, res) {
	console.log('quiz_controller.query');
	var autologoutController = require('./autologout_controller');
	autologoutController.watchDog(req,res,
		function(){
			res.render('quizes/search', {errors:[]});
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
				res.render('quizes/index', {quizes: quizes, errors:[]});
			}
			).catch(function(error) {next(error);});
		}
	);
};

//GET quizes/new
exports.new = function(req, res) {
	console.log('quiz_controller.new');
	var autologoutController = require('./autologout_controller');
	autologoutController.watchDog(req,res,
		function(){
			var quiz = models.Quiz.build(
				{pregunta: "Pregunta", respuesta: "respuesta"});
			res.render('quizes/new', {quiz: quiz, errors:[]});
		}
	);
};

//POST quizes/create
exports.create = function(req, res) {
	console.log('quiz_controller.create');
	var autologoutController = require('./autologout_controller');
	autologoutController.watchDog(req,res,
		function(){
			var quiz = models.Quiz.build( req.body.quiz);
			var validation = quiz.validate();

			if (validation) {
				var i=0; 
				var errors=new Array();
				for (var prop in validation) {
					errors[i++]={message: validation[prop]};
				}
				res.render('quizes/new',
				{quiz: quiz, errors: errors});
			} else {
				quiz.save({fields: ["pregunta", "respuesta"]}).
					then(function(){
						res.redirect('/quizes');
					});
			}		
		}
	);
};



