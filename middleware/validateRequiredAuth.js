module.exports = (req, res, next) => {
  const { path } = req;
  const creds = req.body;

  if (!creds.password || !creds.username) {
    res
      .status(400)
      .json({ message: "Username and password are required fields" });
  } else if (path.includes("/register") && !creds.name) {
    res
      .status(400)
      .json({
        message: "Name, username, and password are all required fields",
      });
  } else {
    next();
  }
};
