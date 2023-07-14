import React, { useRef, useEffect, useState } from "react";
import { connect } from "react-redux";
import { convertDate } from "../../libs/hooks";
import "./message.css";

const Messages = ({ messages }) => {
  const messagesWrapperRef = useRef(null);
  const [user, setUser] = useState({});

  useEffect(() => {
    const userDetails = localStorage.getItem("user");
    const parsedUser = JSON.parse(userDetails);
    setUser(parsedUser);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    const messagesWrapper = messagesWrapperRef.current;
    if (messagesWrapper) {
      messagesWrapper.scrollTop = messagesWrapper.scrollHeight;
    }
  };

  return (
    <div className="messages-wrapper" ref={messagesWrapperRef}>
      {messages.map((message, index) => {
        const sameSender =
          index > 0 &&
          messages[index].author._id === messages[index - 1].author._id;

        return (
          <div key={message._id} className="message-wrapper">
            {message.author.name === user.name ? (
              <div key={index} className="your-message-wrapper">
                <div className="your-message-content">
                  <div className="your-message-date">
                    {convertDate(new Date(message.date))}
                  </div>
                  <div className="your-message-content">{message.content}</div>
                </div>
              </div>
            ) : (
              <div className="friend-message-wrapper">
                <div className="friend-message-content">
                  <div className="friend-message-date-and-name">
                    <div className="friend-message-date">
                      {convertDate(new Date(message.date))}
                    </div>
                    {!sameSender && (
                      <div className="friend-message-name">
                        ~{message.author.name}
                      </div>
                    )}
                  </div>
                  <div className="friend-message-content">
                    {message.content}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

const mapStoreStateToProps = ({ chat }) => {
  return {
    ...chat,
  };
};

export default connect(mapStoreStateToProps)(Messages);
