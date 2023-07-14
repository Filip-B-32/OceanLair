const User = require("../models/user");
const invitation = require("../models/friendInvitation");
const conversation = require("../models/conversation");
const store = require("../store");

const updateInvitations = async (userId) => {
  try {
    const receiverList = store.getConnectedUsers(userId);

    if (receiverList.length > 0) {
      const incomingInvitationsList = await invitation
        .find({
          receiverId: userId,
        })
        .populate("senderId", "_id name mail");

      const io = store.getSocketServerInstance();

      receiverList.forEach((receiverSocketId) => {
        io.to(receiverSocketId).emit("friends-invitation-list", {
          incomingInvitations: incomingInvitationsList
            ? incomingInvitationsList
            : [],
        });
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const updateFriendsList = async (userId) => {
  try {
    const receiverList = store.getConnectedUsers(userId);

    if (receiverList.length > 0) {
      const current = await User.findById(userId, {
        _id: 1,
        friends: 1,
      }).populate("friends", "_id name mail");

      if (current) {
        const friendsList = current.friends.map((friend) => {
          return {
            id: friend._id,
            name: friend.name,
            mail: friend.mail,
          };
        });

        const io = store.getSocketServerInstance();

        receiverList.forEach((receiverSocketId) => {
          io.to(receiverSocketId).emit("friends-list", {
            friends: friendsList ? friendsList : [],
          });
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const updateChatHistory = async (conversationId, targetSocketId = null) => {
  const conversationHistory = await conversation
    .findById(conversationId)
    .populate({
      path: "messages",
      model: "Message",
      populate: {
        path: "author",
        model: "User",
        select: "name _id",
      },
    });

  if (conversationHistory) {
    const io = store.getSocketServerInstance();
    //first history update
    if (targetSocketId) {
      //request chat history - switch between friends
      return io.to(targetSocketId).emit("chat-history", {
        messages: conversationHistory.messages,
        participants: conversation.participants,
      });
    }

    //check online
    conversationHistory.participants.forEach((userId) => {
      const online = store.getConnectedUsers(userId.toString());

      online.forEach((socketId) => {
        io.to(socketId).emit("chat-history", {
          messages: conversationHistory.messages,
          participants: conversationHistory.participants,
        });
      });
    });
  }
};

const updateCallRooms = (targetSocketId = null) => {
  const io = store.getSocketServerInstance();
  const activeCallRooms = store.getActiveCallRooms();

  if (targetSocketId) {
    io.to(targetSocketId).emit("active-call-rooms", {
      activeCallRooms,
    });
  } else {
    io.emit("active-call-rooms", {
      activeCallRooms,
    });
  }
};

module.exports = {
  updateInvitations,
  updateFriendsList,
  updateChatHistory,
  updateCallRooms,
};
