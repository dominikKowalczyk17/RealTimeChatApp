import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";

export const Messages = () => {
  return (
    <div className="flex flex-col rounded-2xl border-2 border-customGray m-4 overflow-hidden">
      <div className="flex gap-10 p-4 justify-between h-[30%] border-b-2 border-b-customGray">
        <span className="text-xl font-bold">Discussions</span>
      </div>
      <div className="flex gap-10 items-center p-2 bg-account">
        <span className="p-1 border-2 border-customPink rounded-full">
          <div className="rounded-full border-2 border-customGray flex items-center justify-center">
            <PersonOutlineRoundedIcon fontSize="large" />
          </div>
        </span>
        <div>
          <p className="font-bold">Nathan</p>
          <p className="text-sm text-customGray">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          </p>
        </div>
        <div className="">
          <p>5h ago</p>
        </div>
      </div>
      <div className="flex gap-10 items-center p-2 bg-account">
        <span className="p-1 border-2 border-customPink rounded-full">
          <div className="rounded-full border-2 border-customGray flex items-center justify-center">
            <PersonOutlineRoundedIcon fontSize="large" />
          </div>
        </span>
        <div>
          <p className="font-bold">Nathan</p>
          <p className="text-sm text-customGray">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          </p>
        </div>
        <div className="">
          <p>5h ago</p>
        </div>
      </div>
      <div className="flex gap-10 items-center p-2 bg-account">
        <span className="p-1 border-2 border-customPink rounded-full">
          <div className="rounded-full border-2 border-customGray flex items-center justify-center">
            <PersonOutlineRoundedIcon fontSize="large" />
          </div>
        </span>
        <div>
          <p className="font-bold">Nathan</p>
          <p className="text-sm text-customGray">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          </p>
        </div>
        <div className="">
          <p>5h ago</p>
        </div>
      </div>
      <div className="flex gap-10 items-center p-2 bg-account">
        <span className="p-1 border-2 border-customPink rounded-full">
          <div className="rounded-full border-2 border-customGray flex items-center justify-center">
            <PersonOutlineRoundedIcon fontSize="large" />
          </div>
        </span>
        <div>
          <p className="font-bold">Nathan</p>
          <p className="text-sm text-customGray">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          </p>
        </div>
        <div className="">
          <p>5h ago</p>
        </div>
      </div>
      <div className="flex gap-10 items-center p-2 bg-account">
        <span className="p-1 border-2 border-customPink rounded-full">
          <div className="rounded-full border-2 border-customGray flex items-center justify-center">
            <PersonOutlineRoundedIcon fontSize="large" />
          </div>
        </span>
        <div>
          <p className="font-bold">Nathan</p>
          <p className="text-sm text-customGray">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          </p>
        </div>
        <div className="">
          <p>5h ago</p>
        </div>
      </div>
    </div>
  );
};
