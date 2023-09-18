const { QuickDB, MySQLDriver } = require('quick.db');
const config = require("./../../config/config.json");

(async () => {
  
  if(config.settings.mysql) {
    try {
    
    const mysql = new MySQLDriver({
        host:     config.mysql.host,
        port: 
config.mysql.port,
        user:     config.mysql.user,
        password: config.mysql.password,
        database: config.mysql.database
    });
      await mysql.connect();
      console.log("➥ Connected To Database")

module.exports = new QuickDB({ driver: mysql });
      
  } catch (error) {
       console.error(error);
    }
  } else {
    module.exports = new QuickDB({ filePath: './src/database/database.sqlite' });
    console.log("➥ Connected To Database")
  }
  
})();