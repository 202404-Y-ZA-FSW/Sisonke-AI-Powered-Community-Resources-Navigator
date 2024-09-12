const { verify } = require("jsonwebtoken");

// MIDDLEWARE FUNCTION TO CHECK IF USER IS AUTHENTICATED
const secret = "This is the secret of the 21st century";
const isAuthenticated = (req, res, next) => {

  // EXTRACT TOKEN FROM AUTHORIZATION HEADER
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "You are not authorized to access this resource" });
  }
  const token = authHeader.split(" ")[1];
  try {

    // VERIFY TOKEN
    const decoded = verify(token, secret);

    // VERIFY USER ROLE AND SET USER ID IN REQUEST OBJECT
    if (decoded.role === "administrator") {
      req.userID = decoded.id;
    } else if (decoded.role === "user") {
      req.userID = decoded.id;
    } else if (decoded.role === "ngo") {
      req.userID = decoded.id;
    } else if (decoded.status === "inactive") {
      return res.status(401).json({ message: "This account has been suspended please contact support" });
    } else {
      return res.status(401).json({ message: "Oops, we are unable to verify this account please contact support" });
    }
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Invalid access token" });
  }
};

// EXPORTING THE MIDDLEWARE FUNCTION
module.exports = isAuthenticated;