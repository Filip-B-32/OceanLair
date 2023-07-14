const User = require("../../models/user");
const invitation = require("../../models/friendInvitation");
const update = require("../../handlers/updatesHandler")

const postInvitation = async (req, res) => {
  const { friendMail } = req.body;

  const { userId, mail } = req.user;

  if (mail.toLowerCase() === friendMail.toLowerCase()) {
    return res.status(409).send("Use a different mail than yours");
  }

  const friend = await User.findOne({
    mail: friendMail.toLowerCase(),
  });

  if (!friend) {
    return res.status(404).send("User not existent");
  }

  const alreadySent = await invitation.findOne({
    senderId: userId,
    receiverId: friend._id,
  });

  if (alreadySent) {
    return res.status(409).send("Friend already invited");
  }

  const alreadyFriend = await friend.friends.find(
    (id) => id.toString() === userId.toString()
  );

  if (alreadyFriend) {
    return res.status(409).send("Friend already added");
  }
  const friendInvitation = await invitation.create({
    senderId: userId,
    receiverId: friend._id,
  });

  update.updateInvitations(friend._id.toString());

  return res.status(201).send("Invitation sent");
};

module.exports = postInvitation;
