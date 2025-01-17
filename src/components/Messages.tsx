import UserCircleIcon from "../icons/AvatarIcon";
import { useEffect, useState } from "react";
import { Message } from "../types/Message";
import { getMessages } from "../services/getMessages";

interface MessagesProps {
  onSelectConversation: (conversation: Message) => void;
  onChangeView: (view: string) => void;
}

export const Messages = ({ onSelectConversation }: MessagesProps) => {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const loadedMessages = await getMessages();
      setMessages(loadedMessages);
      setLoading(false);
    };

    fetchMessages();
  }, []);

  return (
    <div className="flex flex-col border-1 border-customGray overflow-hidden bg-gray-800 min-w-[303px]">
      <div className="flex gap-10 p-4 justify-between">
        <span className="text-xl font-bold text-white">Chats</span>
      </div>
      <div className="flex-1 space-y-1">
        {loading ? (
          <p className="text-center text-gray-500">Loading messages...</p>
        ) : messages.length === 0 ? (
          <p className="text-center text-gray-500">No messages available.</p>
        ) : (
          <div className="">
            {messages.map((message) => (
              <div
                key={message.id}
                className="flex gap-2 border-b-[1px] py-4 items-center px-2 border-b-customGray cursor-pointer hover:bg-customGrayHover transition-colors duration-100"
                onClick={() => onSelectConversation(message)}
              >
                <div className="rounded-full border-customGray flex items-center justify-center">
                  <UserCircleIcon className="w-10 h-10" />
                </div>
                <div>
                  <p className="font-bold text-white text-lg">
                    {message.sender}
                  </p>
                  <p className="text-xs text-gray-300">{message.content}</p>
                </div>
                <div className="ml-auto text-xs">
                  <p className="text-gray-400">{message.timestamp}</p>
                </div>
                <div className="box-border flex flex-none items-center self-center h-full pr-3.5"></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
