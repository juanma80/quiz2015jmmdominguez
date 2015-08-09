var models = require('../models/models.js');

//Autoload
exports.load = function(req, res, next, quizId) {
	console.log('quiz_controller.load');
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
	res.render('quizes/show', {quiz: req.quiz});
	//~ models.Quiz.find(req.params.quizId).then(function(quiz){
		//~ res.render('quizes/show', {quiz: req.quiz});
	//~ })
	
};

//GET /quizes/:id/answer
exports.answer = function(req, res) {
	var resultado = 'Incorrecto';
	console.log('quiz_controller.answer');
	if(req.query.respuesta === req.quiz.respuesta) {
		resultado = 'Correcto';
	}
	res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado});
};

//GET /quizes/query
exports.query = function(req, res) {
	console.log('quiz_controller.query');
	//res.render('quizes/search', {quizes: quizes});
	res.render('quizes/search');
};

//GET /quizes/search
exports.search = function(req, res) {
	console.log('quiz_controller.search');
	var search = req.query.search;
	
	search = search.replace(/\s/g, "%");
	console.log('search- buscamos['+search+']');
	//models.Quiz.findAll().then(
	models.Quiz.findAll({where: ["pregunta like ?", '%' + search + '%']}).then(
	function(quizes){
		res.render('quizes/index', {quizes: quizes});
		//res.render('quizes/search', {quizes: quizes});
	}
	).catch(function(error) {next(error);});
};





