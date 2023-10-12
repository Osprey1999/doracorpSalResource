const db = require('../utils/dbConnectPg');

const {PreparedStatement: PS} = require('pg-promise');

module.exports.fetchOne = async (args) => {
    
    try{
        // fetching user salary details from the table using PreparedStatement
        const findUser = new PS({text: 'SELECT basic, hra, travelAllowance, specialAllowance FROM SALARY WHERE EMPLOYEEID = $1', values: [args.id]});

        return await db.one(findUser);
    }
    catch(err){
        throw new Error (" DB Error!! ");
    }

}

module.exports.addEmployeeSal = async (args) => {

    
    try{
        //creating a userid with new Salary details using Prepared Statement
        //change required -- primary id should be there other than EmployeeID
        const addUserSal = new PS({text: 'INSERT INTO DoraSalary (basic, hra, travelAllowance, specialAllowance, payableDays, month, year) VALUES ($1, $2, $3, $4, $5, $6, $7);', 
        values: [args.basic, args.hra, args.travelAllowance, args.specialAllowance, args.payableDays, args.month, args.year]});

        return await db.none(addUser);
    }
    catch(err){
        throw new Error (" DB Error!! ");
    }

}

module.exports.updateEmployeeSal = async (args) => {

    
    try{
        //updating a user Salary details searching by employeeID using Prepared Statement
        //change required -- primary id should be there other than EmployeeID
        const updateUser = new PS({text: 'UPDATE DoraSalary SET basic = $1, hra = $2, travelAllowance = $3, specialAllowance = $4, payableDays = $5, month = $6, year = $7 WHERE employeeid = $8 RETURNING *;', 
        values: [args.basic, args.hra, args.travelAllowance, args.specialAllowance, args.payableDays, args.month, args.year, args.employeeid]});

        return await db.one(updateUser);
    }
    catch(err){
        throw new Error (" DB Error!! ");
    }

}

