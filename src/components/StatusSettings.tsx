import UserCircleIcon from "../icons/AvatarIcon";

const StatusSettings = () => {
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  return (
    <div className="flex flex-col border-1 border-customGray overflow-hidden bg-gray-800 min-w-[303px]">
      <div className="flex gap-10 p-4 justify-between">
        <span className="text-xl font-bold text-white">Status</span>
      </div>
      <div className="flex gap-2 py-4 items-center px-2 border-b-customGray cursor-pointer hover:bg-customGrayHover transition-colors duration-100">
        <UserCircleIcon className="w-10 h-10" />
        <div className="flex flex-col">
          <p className="font-bold text-white text-lg">
            {user?.username || "User"}
          </p>
          <p className="text-xs text-gray-300">{user?.status || "No status"}</p>
        </div>
      </div>
    </div>
  );
};

export default StatusSettings;
