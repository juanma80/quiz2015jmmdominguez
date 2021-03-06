var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

var sessionController = require('../controllers/session_controller');

var generalController = require('../controllers/general_controller');

var commentController = require('../controllers/comment_controller');

/* GET home page. */
router.get('/', generalController.init);


//Autoload
router.param('quizId', quizController.load);
router.param('commentId', commentController.load);

//Rutas de sesión
router.get('/login', sessionController.new);
router.post('/login', sessionController.create);
router.get('/logout', sessionController.destroy);

router.get('/quizes',quizController.index);
router.get('/quizes/:quizId(\\d+)',quizController.show);
router.get('/quizes/:quizId(\\d+)/answer',quizController.answer);

router.get('/quizes/new',sessionController.loginRequired, quizController.new);
router.post('/quizes/create',sessionController.loginRequired, quizController.create);

router.get('/quizes/:quizId(\\d+)/edit',sessionController.loginRequired, quizController.edit);
router.put('/quizes/:quizId(\\d+)',sessionController.loginRequired, quizController.update);
router.delete('/quizes/:quizId(\\d+)',sessionController.loginRequired, quizController.destroy);

router.get('/quizes/:quizId(\\d+)/comments/new',commentController.new);
router.post('/quizes/:quizId(\\d+)/comments',commentController.create);

router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish',
	sessionController.loginRequired, commentController.publish);

router.get('/quizes/query',quizController.query);
router.get('/quizes/search',quizController.search);

router.get('/author', generalController.author);

module.exports = router;
