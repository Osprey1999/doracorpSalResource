const pgp = require("pg-promise")();
const salary = require("../../lib/repository/UserSalary");
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

  //to update salary payout for the user --> transaction id, timest
  try {
    const employeeid = tokenDetails.employeeid;
    const payflag = payload.payflag;
    const timestamp = new Date();
    const transactionid = payload.transactionid;
    const remarks = payload.remarks;
    const month = payload.month;
    const year = payload.year;

    const fetch = await salary.fetch(employeeid, month, year);

    if (fetch.transactionid == null && fetch.payflag == 0) {
      await salary.updateEmployeeSal(
        employeeid,
        payflag,
        timestamp,
        transactionid,
        remarks,
        month,
        year
      );
      console.log("MESSAGE: DATA UPDATED SUCCESSFULLY");

      return (res = {
        statusCode: 200,
        body: {
          error: false,
          message: "Successfully updated the salary details",
        },
      });
    } else {
      console.log("MESSAGE: TRANSACTION DETAILS ALREADY PRESENT " + fetch.id + employeeid);

      return (res = {
        statusCode: 400,
        body: {
          error: true,
          message: "Salary payout details are already updated",
        },
      });
    }
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
