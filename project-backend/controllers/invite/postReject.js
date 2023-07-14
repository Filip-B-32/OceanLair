const invitation = require("../../models/friendInvitation");
const update = require("../../handlers/updatesHandler");

const postReject = async (req, res) => {
  try {
    const { id } = req.body;
    const { userId } = req.user;

    const exists = await invitation.exists({ _id: id });

    if (exists) {
      await invitation.findByIdAndDelete(id);
    }

    update.updateInvitations(userId);
    return res.status(200).send("rejected");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong");
  }
};

module.exports = postReject;
