import { createChatBotMessage } from "react-chatbot-kit";

const botName = "KisanSuvidha Bot";

const config = {
  initialMessages: [createChatBotMessage(`Hi! I'm ${botName}`)],
  botName: botName,
  customStyles: {
    botMessageBox: {
      backgroundColor: "green",
    },
    chatButton: {
      backgroundColor: "green",
    },
  },
};

export default config;
