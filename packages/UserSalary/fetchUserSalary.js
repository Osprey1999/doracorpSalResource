const pgp = require('pg-promise')();
const salary = require('../../lib/repository/UserSalary')

exports.main = async (args) => {

    //to fetch the Employee salary components from the details
    try{

        const id = args.employeeid;
        
        const saldetails = await salary.fetchOne(id);
        console.log(saldetails);
        pgp.end();

        return res = {
            body:{
                basic: saldetails.basic,
                hra: saldetails.hra,
                travelAllowance: saldetails.travelAllowance,
                specialAllowance: saldetails.specialAllowance,
                error: false,
                message: 'Error in fetching the employee details'
            }
        }
        
    }
    catch(err){

        console.log("error");
        return res = {
            body:{
                error: true,
                message: 'Error in fetching the employee details'
            }
        }

    }

}