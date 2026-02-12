module.exports = {
  mongoURI: process.env.mongoURI,
  secretOrKey: process.env.secretOrKey || "secret",
  jwtSecret: process.env.JWT_SECRET || process.env.secretOrKey || "secret",
};
