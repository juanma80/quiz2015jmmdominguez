var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

var sessionController = require('../controllers/session_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

//Autoload
router.param('quizId', quizController.load);

//Rutas de sesión
router.get('/login', sessionController.new);
router.post('/login', sessionController.create);
router.get('/logout', sessionController.destroy);

router.get('/quizes',quizController.index);
router.get('/quizes/:quizId(\\d+)',quizController.show);
router.get('/quizes/:quizId(\\d+)/answer',quizController.answer);

router.get('/quizes/query',quizController.query);
router.get('/quizes/search',quizController.search);

router.get('/author',function(req, res) {
  res.render('author', { title: 'Autor' });
});
module.exports = router;
