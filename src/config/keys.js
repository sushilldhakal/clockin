module.exports = {
  mongoURI:
    process.env.mongoURI_DEV ||
    "mongodb+srv://clock-in:vwvaR5YVffwzyrZo@testtravel.xcy06.gcp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  secretOrKey: "secret",
};
