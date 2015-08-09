//autologout_controller.js
var maxSessionTime = 5000;

exports.timeStamp = function(req, res) {
	console.log('autologout_controller.timeStamp');
	var d = new Date();
	var timeStamp = d.getTime();
	console.log('timeStamp['+timeStamp+']');
	req.session.timeStamp = timeStamp;
	delete req.session.expired;
	
};
exports.watchDog = function(req, res, callback) {
	console.log('autologout_controller.watchDog');
	var d = new Date();
	var currentTime = d.getTime();
	console.log('currentTime['+currentTime+']');
	console.log('req.session.timeStamp['+req.session.timeStamp+']');
	if (currentTime-req.session.timeStamp > maxSessionTime) {
		console.log('Sesión expirada');
		var session = require('./session_controller');
		session.destroy(req,res);
	} else {
		callback();
	}
};
