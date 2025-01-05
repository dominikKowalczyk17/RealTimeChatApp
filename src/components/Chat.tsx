import { Message } from "../types/Message";

interface ChatProps {
  messages: Message[];
  currentUser: string;
}

export const Chat = ({ messages, currentUser }: ChatProps) => {
  return (
    <div className="flex-1 p-4 bg-gray-700 text-white overflow-y-auto">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex mb-4 ${
            message.sender === currentUser ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`p-2 rounded-lg max-w-xs ${
              message.sender === currentUser
                ? "bg-blue-500 text-white"
                : "bg-gray-800 text-white"
            }`}
          >
            <p className="text-sm">{message.content}</p>
            <p className="text-xs text-gray-400 mt-1">{message.timestamp}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
