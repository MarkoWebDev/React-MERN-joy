const bcrypt = require("bcrypt");

const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(12, function (err, salt) {
      if (err) {
        reject(err);
      }
      bcrypt.hash(password, salt, function (err, hash) {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  });
};

const comparePassword = (password, hashed) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hashed, function (err, result) {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};

module.exports = {
  hashPassword,
  comparePassword,
};
