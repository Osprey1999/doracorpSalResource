const pgp = require("pg-promise")();
const salary = require("../../lib/repository/userSalaryComponents");
const validateToken = require("../../lib/utils/validateToken");

exports.main = async (event, context) => {
  const { headers, payload } = event;

  //validate the token received
  try {
    const { tokenDetails } = validateToken.validateAuthToken(
      headers.Authorization
    );
  } catch (err) {
    console.log("ERROR: " + err);
    return (res = {
      statusCode: 403,
      body: {
        error: true,
        message: "Invalid Authorization Token",
      },
    });
  }

  //fetch the Employee salary components from the details
  try {
    const employeeid = tokenDetails.employeeid;
    const month = payload.month;
    const year = payload.year;

    const saldetails = await salary.fetchOne(employeeid, month, year);
    console.log('MESSAGE: DATA FETCH SUCCESS');
    pgp.end();

    return (res = {
      statusCode: 200,
      body: {
        components: saldetails,
        error: false,
        message: `Salary details for the employee: ${id} fetched`,
      },
    });
  } catch (err) {
    console.log("ERROR: " + err);
    return (res = {
      statusCode: 400,
      body: {
        error: true,
        message: "Error in fetching the employee details",
      },
    });
  }
};
