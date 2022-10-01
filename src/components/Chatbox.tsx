import Input from "./Input";
import Messages from "./Messages";

const Chatbox = () => {
  return (
    <div className="flex basis-full flex-col bg-white">
      <Messages />
      <Input />
    </div>
  );
};

export default Chatbox;
