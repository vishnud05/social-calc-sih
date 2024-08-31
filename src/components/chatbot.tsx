"use client";
import React, { useState, useRef, useEffect } from "react";

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<
    { text: string; sender: "bot" | "user" }[]
  >([
    {
      text: "Hello! How may I assist you today?\nSelect a number for help with Excel:",
      sender: "bot",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const chatBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (inputValue.trim() === "") return;

    setMessages([...messages, { text: inputValue, sender: "user" }]);
    const botResponse = getBotResponse(inputValue);
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: botResponse, sender: "bot" },
    ]);
    setInputValue("");
  };

  const getBotResponse = (input: string): string => {
    const responses: { [key: string]: string } = {
      "1": "To add a formula, select a cell, type '=' followed by the formula, and press Enter.",
      "2": "To apply conditional formatting, go to the Home tab, click on Conditional Formatting, and set your rules.",
      "3": "To create a chart, select your data and click on the Insert tab, then choose a chart type.",
      "4": "To filter data, click on any column header and choose the Filter option from the Data tab.",
      "5": "To sort data, select the column you want to sort and use the Sort buttons on the Data tab.",
      "6": "To use pivot tables, go to the Insert tab and select PivotTable, then choose your data range.",
      "7": "To freeze panes, go to the View tab and click Freeze Panes.",
      "8": "To merge cells, select the cells you want to merge, then click Merge & Center from the Home tab.",
      "9": "To protect a sheet, go to the Review tab and click Protect Sheet.",
      "10": "To split text into columns, select the text, go to the Data tab, and click Text to Columns.",
      hello: "Hello! How can I assist you today?",
      hi: "Hi there! How may I help you with Excel today?",
      thanks: "You're welcome! If you have more questions, feel free to ask.",
      "thank you": "You're welcome! Happy to help!",
    };

    const lowerCaseInput = input.toLowerCase();
    if (responses[lowerCaseInput]) {
      return responses[lowerCaseInput];
    } else if (!isNaN(Number(lowerCaseInput)) && responses[lowerCaseInput]) {
      return responses[lowerCaseInput];
    } else {
      return "I'm sorry, I don't understand. Please choose a number from 1 to 10, or ask a greeting.";
    }
  };

  return (
    <div className="fixed bottom-0 right-5 w-96 flex flex-col items-end text-gray-800">
      <div
        className={`bg-gradient-to-r from-blue-400 to-blue-600 text-white p-4 rounded-t-3xl cursor-pointer font-bold text-center shadow-lg transition-colors duration-300 hover:from-pink-500 hover:to-red-500`}
        onClick={() => setIsOpen(!isOpen)}
      >
        💬 Chat with us
      </div>
      {isOpen && (
        <div className="bg-gradient-to-r from-pink-300 to-red-300 rounded-3xl shadow-2xl flex flex-col overflow-hidden transition-all duration-500 ease-in-out transform translate-y-0 opacity-100">
          <div className="bg-gradient-to-r from-blue-300 to-blue-400 p-5 text-center text-white text-xl font-bold rounded-t-3xl">
            Helper Bot
          </div>
          <div ref={chatBodyRef} className="p-5 h-96 overflow-y-auto bg-white">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`${
                  message.sender === "bot"
                    ? "bg-gradient-to-r from-purple-200 to-blue-200"
                    : "bg-gradient-to-r from-blue-400 to-purple-500 text-white self-end"
                } p-3 rounded-3xl mb-4 max-w-3/4 shadow-md text-sm break-words`}
              >
                <p>{message.text}</p>
                {message.sender === "bot" && index === 0 && (
                  <ol className="list-decimal list-inside mt-2">
                    <li>How to add a formula?</li>
                    <li>How to apply conditional formatting?</li>
                    <li>How to create a chart?</li>
                    <li>How to filter data?</li>
                    <li>How to sort data?</li>
                    <li>How to use pivot tables?</li>
                    <li>How to freeze panes?</li>
                    <li>How to merge cells?</li>
                    <li>How to protect a sheet?</li>
                    <li>How to split text into columns?</li>
                  </ol>
                )}
              </div>
            ))}
          </div>
          <div className="p-4 bg-white flex items-center justify-between rounded-b-3xl">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 p-3 rounded-full bg-gray-100 outline-none shadow-inner text-sm"
              placeholder="Type your message here..."
            />
            <button
              onClick={handleSend}
              className="bg-gradient-to-r from-purple-400 to-blue-400 text-white p-3 rounded-full ml-4 shadow-md transition-all duration-300 hover:from-pink-500 hover:to-red-500 text-sm"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
