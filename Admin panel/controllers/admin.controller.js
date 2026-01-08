
const addAdmin = require('../model/admin.model');

module.exports.addminForm = (req, res) => {
   console.log("hello word");
   return res.render('/addAdmin');

}

// Add Admin Page
module.exports.addminForm = (req, res) => {
   return res.render('addminForm');
}