const invitation = require("../../models/friendInvitation");
const User = require("../../models/user");
const update = require("../../handlers/updatesHandler");

const postAccept = async (req, res) => {
  try {
    const { id } = req.body;
    const exists = await invitation.findById(id);

    if (!exists) {
      return res.status(401).send("Error, Try again");
    }

    const { senderId, receiverId } = exists;

    const sender = await User.findById(senderId);
    sender.friends = [...sender.friends, receiverId];

    const receiver = await User.findById(receiverId);
    receiver.friends = [...receiver.friends, senderId];

    await sender.save();
    await receiver.save();

    await invitation.findByIdAndDelete(id);
    update.updateFriendsList(senderId.toString());
    update.updateFriendsList(receiverId.toString());
    update.updateInvitations(receiverId.toString());
    return res.status(200).send("accepted");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong");
  }
};

module.exports = postAccept;
