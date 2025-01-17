import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Avatar from "../assets/Avatar.png";
import { Message } from "../types/Message";

interface ConversationDetailsProps {
  onBack: () => void;
  conversation: Message;
}

export const ConversationDetails = ({
  onBack,
  conversation,
}: ConversationDetailsProps) => {
  return (
    <div className="py-3 px-4 bg-gray-800 text-white flex items-center">
      <div className="items-center flex md:hidden">
        <ArrowBackIcon className="mr-2 cursor-pointer" onClick={onBack} />
      </div>
      <img
        src={Avatar}
        alt="User Avatar"
        className="w-10 h-10 rounded-full mr-2"
      />
      <h2 className="text-xl font-bold">{conversation.sender}</h2>
    </div>
  );
};
