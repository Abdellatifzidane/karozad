
import connection from "../db.js";

class UserModel {
  static findByUsername(username, callback) {
    const query = `SELECT * FROM users WHERE username = ?`;
    connection.query(query, [username], (err, results) => {
      if (err) throw err;
      callback(results[0]);
    });
  }

}

export default UserModel;
