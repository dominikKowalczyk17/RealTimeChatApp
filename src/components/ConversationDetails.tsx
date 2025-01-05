import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Avatar from "../assets/Avatar.png"; // Assuming you have an avatar image

interface ConversationDetailsProps {
  onBack: () => void;
}

export const ConversationDetails = ({ onBack }: ConversationDetailsProps) => {
  return (
    <div className="p-4 bg-gray-800 text-white flex items-center">
      <div className="items-center flex md:hidden">
        <ArrowBackIcon className="mr-2 cursor-pointer" onClick={onBack} />
      </div>
      <img
        src={Avatar}
        alt="User Avatar"
        className="w-10 h-10 rounded-full mr-2"
      />
      <h2 className="text-xl font-bold">User Name</h2>
    </div>
  );
};
