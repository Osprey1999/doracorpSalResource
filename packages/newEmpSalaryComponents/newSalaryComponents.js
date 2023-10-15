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

  //to insert the salary components for a employee for month and year
  try {
    const data = Object.values(payload.updateData).map((items) => {
      return {
        employeeid: tokenDetails.employeeid,
        year: items.year,
        month: items.month,
        type: items.type,
        label: items.label,
        amount: items.amount,
      };
    });

    const insertSalComp = await salary.addEmployeeSalComponents(data);
    console.log("MESSAGE: INSERT DATA SUCCESS WITH IDs" + insertSalComp);
    pgp.end();

    return (res = {
      statusCode: 200,
      body: {
        error: false,
        message: "Successfully inserted the salary details",
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
