module.exports.validateAuthToken = (auth) => {
    if (auth.startsWith("Bearer ")) {
      const token = auth.split(" ")[1];
      const publicKey = process.env.ACCESS_TOKEN_PUBLIC_KEY;
      const tokenDetails = jwt.verify(token, publicKey, (err, tokenDetails) => {
        if (err)
          return Promise.reject({ error: true, message: "Invalid Access Token" });
        Promise.resolve({
          tokenDetails,
          message: "Valid Access Token",
        });
      });
      return tokenDetails;
    } else {
      return Promise.reject({
        error: true,
        message: "Invalid Authorization Token",
      });
    }
  };