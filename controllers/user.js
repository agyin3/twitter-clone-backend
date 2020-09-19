const User = require("../data/models/User");
const { Follower } = require("../data/models/Follower");

async function getAllUsers(req, res, next) {
  try {
    const users = await User.find({});
    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({
      message: "There was an error retrieving the users from the database",
      error: err,
    });
  }
}

async function getSingleUser(req, res, next) {
  delete res.locals.user.password;

  res.status(200).json({ user: res.locals.user });
}

async function getUserFollowers(req, res, next) {
  const { id } = req.params;

  try {
    const followers = await User.findById(id, "followers");

    res.status(200).json({ user: followers });
  } catch (error) {
    res.status(500).json({
      message: "There was an error retrieving the users from the database",
      error: err,
    });
  }
}

async function requestFriend(req, res, next) {
  const { id } = req.params;
  const { friend_id } = req.body;
  const user = res.locals.user;

  try {
    // Create new Follower (user being followed)
    const following_friend = new Follower({
      user: friend_id,
      status: user.private ? 1 : 2,
    });

    // Create new Follower (user sending request)
    const follower_friend = new Follower({
      user: id,
      status: user.private ? 1 : 2,
    });

    // Add Follower to the user(user sending request) following array
    const updated_follower = await User.findByIdAndUpdate(
      id,
      { $push: { following: following_friend } },
      { new: true }
    );

    // Add Follower to the user(user being followed) followers array
    const updated_following = await User.findByIdAndUpdate(
      friend_id,
      { $push: { followers: follower_friend } },
      { new: true }
    );

    res.status(201).json({
      message: "Friend request successfully sent",
      user: updated_follower,
      friend: updated_following,
    });
  } catch (err) {
    res.status(500).json({
      message: "There was an error retrieving the users from the database",
      error: err,
    });
  }
}

module.exports = {
  getAllUsers,
  getSingleUser,
  getUserFollowers,
  requestFriend,
};
