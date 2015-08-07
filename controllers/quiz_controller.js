var models = require('../models/models.js');

//Autoload
exports.load = function(req, res, next, quizId) {
	console.log('load');
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
	console.log('index');
	models.Quiz.findAll().then(
	function(quizes){
		res.render('quizes/index', {quizes: quizes});
	}
	).catch(function(error) {next(error);});
};

//GET /quizes/:id
exports.show = function(req, res) {
	console.log('show');
	res.render('quizes/show', {quiz: req.quiz});
	//~ models.Quiz.find(req.params.quizId).then(function(quiz){
		//~ res.render('quizes/show', {quiz: req.quiz});
	//~ })
	
};

//GET /quizes/:id/answer
exports.answer = function(req, res) {
	//~ models.Quiz.find(req.params.quizId).then(function(quiz){
		//~ if(req.query.respuesta === req.quiz.respuesta) {
			//~ res.render('quizes/answer', {quiz: req.quiz, respuesta: 'Correcto'});
		//~ } else {
			//~ res.render('quizes/answer', {quiz: req.quiz, respuesta: 'Incorrecto'});
		//~ }
	//~ })
	var resultado = 'Incorrecto';
	console.log('answer');
	if(req.query.respuesta === req.quiz.respuesta) {
		resultado = 'Correcto';
	}
	res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado});
};




