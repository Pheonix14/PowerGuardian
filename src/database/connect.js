const { MongoDriver } = require("quickmongo");
const { QuickDB } = require("quick.db");

(async () => {

  const driver = new MongoDriver("mongodb+srv://trollmod_testing:bsdk+chutiya@cluster0.zkvjii9.mongodb.net/?retryWrites=true&w=majority");
  
console.log('Connecting To Database...')
await driver.connect();
console.log("➥ Connected To Database")
  
    module.exports = new QuickDB({ driver });
})();