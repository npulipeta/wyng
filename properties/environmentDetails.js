
var config                                        = require('config');

exports.databaseSettings = {
    mysql : {
        master :{
          host              : config.get('databaseSettings.host'),
          user              : process.env.MYSQL_ROOT_USERNAME || config.get('databaseSettings.user'),
          password          : process.env.MYSQL_ROOT_PASSWORD || config.get('databaseSettings.password'),
          database          : config.get('databaseSettings.database'),
          port              : config.get('databaseSettings.port'),
          multipleStatements: true
        }
    }
};

exports.port            = process.env.PORT || config.get('PORT');
