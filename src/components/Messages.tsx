import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";

export const Messages = () => {
  return (
    <div className="flex flex-col rounded-lg border-2 border-customGray m-4">
      <div className="flex gap-10 p-4 justify-between h-[30%] border-2 border-b-customGray">
        <span className="text-xl font-bold">Account Details</span>
      </div>
      <div className="flex gap-10 items-center p-4 bg-account h-[70%]">
        <span className="p-1 border-2 border-customPink rounded-full">
          <div className="rounded-full border-2 border-customGray flex items-center justify-center">
            <PersonOutlineRoundedIcon fontSize="large" />
          </div>
        </span>
        <p className="text-2xl font-bold">Nathan</p>
      </div>
    </div>
  );
};
