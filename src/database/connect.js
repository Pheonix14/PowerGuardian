const { QuickDB, MySQLDriver } = require('quick.db');
const config = require("./../../config/config.json");

(async () => {
  
  if(config.settings.mysql) {
    const mysql = new MySQLDriver({
        host:     config.mysql.host,
        user:     config.mysql.user,
        password: config.mysql.password,
        database: config.mysql.database
    });
    
    await mysql.connect();
console.log("➥ Connected To Database")
  
    module.exports = new QuickDB({ driver: mysql });
  } else {
    module.exports = new QuickDB({ filePath: './src/database/database.sqlite' });
    console.log("➥ Connected To Database")
  }
  
})();