import Avatar from "../assets/Avatar.png";
import SettingsIcon from "@mui/icons-material/SettingsOutlined";

export const AccountDetails = () => {
  return (
    <div className="flex flex-col rounded-lg border-2 border-customGray m-4">
      <div className="flex gap-10 p-4 justify-between h-[30%] border-2 border-b-customGray">
        <span className="text-xl font-bold">Account Details</span>
        <SettingsIcon />
      </div>
      <div className="flex gap-10 items-center p-4 bg-account h-[70%]">
        <div className="h-16 block">
          <img className="h-full" src={Avatar} alt="avatar" />
        </div>
        <p className="text-2xl font-bold">Nathan</p>
      </div>
    </div>
  );
};
