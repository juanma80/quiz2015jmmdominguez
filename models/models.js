var path = requiere('path');

var Sequelize = requiere('sequelize');

var sequelize = new Sequelize(null,null,null,
	{dialect: "sqlite", storage: "quiz.sqlite"}
	);
	
var Quiz = Sequelize.import(path.join(__dirname,'quiz'));

exports.Quiz = Quiz;

sequqlize.sync().success(function{
	Quiz.count().success(function (count){
		if (count === 0) {
			Quiz.create({	pregunta: 'Capital de Italia',
							respuesta: 'Roma'})
					.success(function(){
						console.log('Base de Datos inicializada')
					});
		}
	});
});

