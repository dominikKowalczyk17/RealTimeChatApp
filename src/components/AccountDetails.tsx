import Avatar from "../assets/Avatar.png";
import { useState } from "react";
import { Settings } from "./Settings";

export const AccountDetails = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  return (
    <div
      onClick={() => setSettingsOpen(true)}
      className="cursor-pointer flex flex-col rounded-2xl border-2 border-customGray m-4 bg-gray-800 text-white"
    >
      <div className="flex gap-10 p-4 justify-between h-[30%] border-b-2 border-b-customGray"></div>
      <div className="flex gap-10 rounded-b-2xl items-center p-4 bg-gray-700 h-[70%]">
        <div className="h-16 block">
          <img className="h-full" src={Avatar} alt="avatar" />
        </div>
        <p className="text-2xl font-bold">{user?.username || "User"}</p>
      </div>

      <Settings open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  );
};
