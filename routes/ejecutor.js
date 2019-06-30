var config = require('./config');
const { Client } = require('pg');

module.exports = function(){
	var connection = {
		exec: function(consulta,parametros,callback){
			try{
				const client = new Client({
					user: config.user,
					host: config.host,
					database: config.database,
					password: config.password,
					port: config.port,
				  });
				client.connect();
				client.query(consulta, parametros, (error, resultado) =>{
					if(error){
						client.end();
						console.log(error);
						console.log('error en la consulta ' + consulta);
						console.log(resultado);
						callback(error);
					}else{
						client.end();
						callback(resultado);
					}
				});
			}catch(e){
				console.log(e);
				console.log(consulta);
			}
		}
	};
	return connection;
};