const db = require("../utils/dbConnect");
const { PreparedStatement: PS } = require("pg-promise");
const errorConstant = require("../utils/errorConstant");
const errorResponse = require("../utils/errorResponse");

Object.defineProperty(global, "salary", {
  value: new pgp.helpers.ColumnSet(
    [
      "?employeeid",
      "payabledays",
      "?month",
      "?year",
      {
        name: "payflag",
        def: 0,
      },
      {
        name: "timestamp",
        def: null,
      },
      {
        name: "transactionid",
        def: null,
      },
      {
        name: "remarks",
        def: null,
      },
    ],
    { table: "salary" }
  ),
  writable: false,
  enumerable: true,
  configurable: false,
});

//add salary payable for a user, month and year
module.exports.addEmployeeSalPayableDays = async (args) => {
  try {
    const insert = pgp.helpers.insert(args, salary) + "RETURNING id";
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

//update details for a user in salary table -> payable days or salary payout transaction details
module.exports.updateEmployeeSal = async (args) => {
  try {
    const update = pgp.helpers.update(args, salary);
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
