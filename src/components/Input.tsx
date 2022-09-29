import { Paperclip, PaperPlaneRight } from "phosphor-react";

const Input = () => {
  return (
    <div className="flex items-center gap-2 border-t bg-white py-2 px-4">
      <button className="rounded-full p-3 transition hover:bg-blue-500 hover:text-white">
        <Paperclip size={24} />
      </button>
      <input
        className="w-full flex-1 p-3"
        placeholder="Enter your message here"
      />

      <div className="flex gap-2 text-black">
        <button className="rounded-full bg-blue-500 p-3 text-white">
          <PaperPlaneRight weight="fill" />
        </button>
      </div>
    </div>
  );
};

export default Input;
