const conversation = require("../models/conversation");
const update = require("../handlers/updatesHandler");

const chatHistoryHandler = async (socket, data) => {
  try {
    const { userId } = socket.user;
    const { receiverId } = data;

    const conversationList = await conversation.findOne({
      participants: { $all: [userId, receiverId] },
    });

    if (conversationList) {
      update.updateChatHistory(conversationList._id.toString(), socket.id);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = chatHistoryHandler;
