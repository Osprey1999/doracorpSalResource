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

  //to update salary components of a employee for a month and year
  try {
    const employeeid = tokenDetails.employeeid;
    const month = payload.month;
    const year = payload.year;
    const label = payload.label;

    const updateSalComponents = await salary.updateEmployeeSalComponents(
      employeeid,
      month,
      year,
      label
    );
    console.log("MESSAGE: DATA UPDATED SUCCESSFULLY");

    return (res = {
      statusCode: 200,
      body: {
        error: false,
        message: "Successfully updated the salary details",
      },
    });
  } catch (err) {
    console.log("ERROR: " + err);
    return (res = {
      statusCode: 400,
      body: {
        error: true,
        message: "INTERNAL SERVER ERROR",
      },
    });
  }
};
