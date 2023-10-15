const db = require("../utils/dbConnect");
const { PreparedStatement: PS } = require("pg-promise");
const errorConstant = require("../utils/errorConstant");
const errorResponse = require("../utils/errorResponse");

Object.defineProperty(global, "components", {
  value: new pgp.helpers.ColumnSet(
    ["?employeeid", "?year", "?month", "type", "?label", "amount"],
    { table: "components" }
  ),
  writable: false,
  enumerable: true,
  configurable: false,
});

//fetching the salary components of a employee using employeeid, month, year
module.exports.fetchOne = async (args) => {
  try {
    const salaryCom = new PS({
      name: "salaryCom",
      text: "select id, employeeid, type, label, amount from Components WHERE EmployeeID = $1 AND Month = $2 AND Year = $3;",
      values: [args.employeeid, args.month, args.year],
    });
    console.log("QUERY: " + salaryCom);

    return await db.any(salaryCom);
  } catch (err) {
    return Promise.reject(
      new errorResponse(errorConstant.INTERNAL_SERVER_ERROR)
    );
  }
};

//update salary components for a user
module.exports.updateEmployeeSalComponents = async (args) => {
  try {
    const update =
      pgp.helpers.update(args, components) +
      "WHERE v.employeeid = t.employeeid and v.month = t.month and v.year = t.year and v.label = t.year";
    console.log(update);

    const transac = await db.tx("updation", (t) => {
      return db.none("UPDATE QUERY: " + update);
    });
  } catch (err) {
    return Promise.reject(
      new errorResponse(errorConstant.INTERNAL_SERVER_ERROR)
    );
  }
};

//getting the salary for all the users for a particular month
module.exports.getSalaryComponentsforMonth = async (args) => {
  try {
    const getSalforMon = new PS({
      name: "getSalforMon",
      text: "select employeeid, type, label, amount from Components WHERE Month = $1 AND Year = $2;",
      values: [args.month, args.year],
    });
    console.log("QUERY: " + getSalforMon);

    return await db.any(getSalforMon);
  } catch (err) {
    return Promise.reject(
      new errorResponse(errorConstant.INTERNAL_SERVER_ERROR)
    );
  }
};

//add salary components for a user, month, year
module.exports.addEmployeeSalComponents = async (args) => {
  try {
    const insert = pgp.helpers.insert(args, components) + "RETURNING id";
    console.log("INSERT QUERY:" + insert);

    const transac = await db.tx("insertion", (t) => {
      return db.any(insert);
    });
  } catch (err) {
    return Promise.reject(
      new errorResponse(errorConstant.INTERNAL_SERVER_ERROR)
    );
  }
};
