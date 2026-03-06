const AdminRegisterService = require("../../../services/auth/admin/register.services");


module.exports.register =(req,res) => {

    try {
       const registerService = new AdminRegisterService();

       registerService.registerservices(req.body);
    }catch(err)
    {
        console.log("error", err);
        
    }

}


module.exports.login =(req,res) => {

    try {

    }catch(err)
    {
        console.log("error", err);
        
    }

}