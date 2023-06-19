import React from "react";

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    if (message.includes("hello") || message.includes("helo")) {
      actions.handleHello();
    } else if (message.includes("How are you") || message.includes("how r u")) {
      actions.handleHowAreYou();
    }
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions: {},
        });
      })}
    </div>
  );
};

export default MessageParser;
