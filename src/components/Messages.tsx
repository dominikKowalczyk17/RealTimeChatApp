import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import { useEffect, useState } from "react";
import { getMessages } from "../services/getMessages";
import { Message } from "../types/Message";

export const Messages = () => {
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
    <div className="flex flex-col rounded-2xl border-2 border-customGray m-4 overflow-hidden">
      <div className="flex gap-10 p-4 justify-between h-[30%] border-b-2 border-b-customGray">
        <span className="text-xl font-bold">Discussions</span>
      </div>
      <div className="flex-1 p-4">
        {loading ? (
          <p className="text-center text-gray-500">Loading messages...</p>
        ) : messages.length === 0 ? (
          <p className="text-center text-gray-500">No messages available.</p>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className="flex gap-10 items-center p-2 bg-account"
            >
              <span className="p-1 border-2 border-customPink rounded-full">
                <div className="rounded-full border-2 border-customGray flex items-center justify-center">
                  <PersonOutlineRoundedIcon fontSize="large" />
                </div>
              </span>
              <div>
                <p className="font-bold">{message.sender}</p>
                <p className="text-sm text-customGray">{message.content}</p>
              </div>
              <div className="">
                <p>{message.timestamp}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
