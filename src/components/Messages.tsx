import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import { useEffect, useState } from "react";
import { getMessages } from "../services/getMessages";
import { Message } from "../types/Message";

interface MessagesProps {
  onSelectConversation: (conversation: Message) => void;
}

export const Messages = ({ onSelectConversation }: MessagesProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      const fetchedMessages = await getMessages();
      setMessages(fetchedMessages);
      setLoading(false);
    };

    fetchMessages();
  }, []);

  return (
    <div className="flex flex-col rounded-2xl border-2 border-customGray m-4 overflow-hidden bg-gray-800">
      <div className="flex gap-10 p-4 justify-between h-[30%] border-b-2 border-b-customGray">
        <span className="text-xl font-bold text-white">Discussions</span>
      </div>
      <div className="flex-1 space-y-1">
        {loading ? (
          <p className="text-center text-gray-500">Loading messages...</p>
        ) : messages.length === 0 ? (
          <p className="text-center text-gray-500">No messages available.</p>
        ) : (
          <div className="bg-gray-700">
            {messages.map((message) => (
              <div
                key={message.id}
                className="flex gap-2 py-4 items-center px-2 cursor-pointer hover:bg-gray-600 transition-colors duration-100"
                onClick={() => onSelectConversation(message)}
              >
                <span className="p-1 border-2 border-customPink rounded-full">
                  <div className="rounded-full border-2 border-customGray flex items-center justify-center">
                    <PersonOutlineRoundedIcon
                      fontSize="large"
                      className="text-white"
                    />
                  </div>
                </span>
                <div>
                  <p className="font-bold text-white">{message.sender}</p>
                  <p className="text-sm text-gray-300">{message.content}</p>
                </div>
                <div className="ml-auto">
                  <p className="text-gray-400">{message.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
