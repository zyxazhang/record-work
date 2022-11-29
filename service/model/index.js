const mysql = require('mysql2')

const db_config = {
  host: "114.132.201.39",
  user: "test-last",
  password: "z123456",
  database: "test-last",
};
var db;
(function handleDisconnect() {
  db = mysql.createConnection(db_config);

  db.connect((err) => {
    if (err) {
      console.log("error when connecting to mysql", err);
      setTimeout(handleDisconnect, 2000);
    }
  });
  setInterval(function () {
    console.log("---The mysql connection has been re-established---");
    db.query("SELECT 1");
  }, 480000);
  db.on("error", (err) => {
    console.log("db error", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      handleDisconnect();
    } else {
      throw err;
    }
  });
  console.log(`------ MySQL database connection is successful ------`);
})();

module.exports = db
