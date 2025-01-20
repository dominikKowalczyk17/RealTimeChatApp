import Avatar from "../assets/Avatar.png";
import ArrowBackIcon from "../icons/ArrowBackIcon";
import { Message } from "../types/Message";

interface ConversationDetailsProps {
  conversation: Message;
  showBackButton?: boolean;
  onBack?: () => void;
}

export const ConversationDetails = ({
  conversation,
  showBackButton,
  onBack,
}: ConversationDetailsProps) => {
  return (
    <div className="py-3 px-4 bg-gray-800 text-white flex items-center">
      {showBackButton && (
        <div className="items-center flex md:hidden">
          <ArrowBackIcon className="mr-2 cursor-pointer" onClick={onBack} />
        </div>
      )}
      <img
        src={Avatar}
        alt="User Avatar"
        className="w-10 h-10 rounded-full mr-2"
      />
      <h2 className="text-xl font-bold">{conversation.sender}</h2>
    </div>
  );
};
