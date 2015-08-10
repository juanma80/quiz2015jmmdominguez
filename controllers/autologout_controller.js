//autologout_controller.js
var maxSessionTime = 10000;

exports.timeStamp = function(req, res) {
	console.log('autologout_controller.timeStamp');
	var d = new Date();
	var timeStamp = d.getTime();
	console.log('timeStamp['+timeStamp+']');
	//Se crea la marca de tiempo
	req.session.timeStamp = timeStamp;
	
};
exports.watchDog = function(req, res, callback) {
	console.log('autologout_controller.watchDog');
	if (req.session.timeStamp) {
		var d = new Date();
		var currentTime = d.getTime();
		console.log('currentTime['+currentTime+']');
		console.log('req.session.timeStamp['+req.session.timeStamp+']');
		//Se comprueba si ha pasado más del tiempo máximo de sesión desde 
		//la última actualización de la marca de tiempo
		if (currentTime-req.session.timeStamp > maxSessionTime) {
			//Se agotó el tiempo
			console.log('Sesión expirada');
			//Se destruye la marca de tiempo
			delete req.session.timeStamp;
			//Se destruye la sesión
			var session = require('./session_controller');
			session.destroy(req,res);
		} else {
			//Se actualiza la marca de tiempo
			console.log('timeStamp actualizado');
			req.session.timeStamp = currentTime;
			callback();
		}
	} else {
		console.log('no hay timeStamp');
		callback();
	}
};
