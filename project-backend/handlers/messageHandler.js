const message = require("../models/message");
const conversation = require("../models/conversation");
const update = require("../handlers/updatesHandler");

const messageHandler = async (socket, data) => {
  try {
    console.log("event is being handled -> message");

    const { userId } = socket.user;
    const { receiverId, content } = data;

    const createMessage = await message.create({
      content: content,
      author: userId,
      date: new Date(),
    });

    //find the conversation between the 2 users (current user and receiver)
    const findConversation = await conversation.findOne({
      participants: { $all: [userId, receiverId] },
    });

    if (findConversation) {
      findConversation.messages.push(createMessage._id);
      await findConversation.save();

      //real time update
      update.updateChatHistory(findConversation._id.toString());
    } else {
      //if conversation is empty (first time the user and receiver write)
      const newConversation = await conversation.create({
        messages: [createMessage._id],
        participants: [userId, receiverId],
      });

      //real time update
      update.updateChatHistory(newConversation._id.toString());
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = messageHandler;
