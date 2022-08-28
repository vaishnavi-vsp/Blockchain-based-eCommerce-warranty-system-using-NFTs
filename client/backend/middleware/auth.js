import jwt from 'jsonwebtoken'

export default function (req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    console.log("No token found")
    return res.status(401).json({ msg: "NO token , authorization denied" });
  }

  try {
    console.log("Token found and verifying")
    const decoded = jwt.verify(token, "JwtSecret");
    console.log("this is decoded msg-----------")
    console.log(decoded)
    req.user = decoded.user;
    console.log("this is req.user =========")
    console.log(req.user)
    next();
  } catch {
    res.status(401).json({ msg: "Token is not valid" });
  }
}