import Input from "./Input";
import Messages from "./Messages";

const Chat = () => {
  return (
    <div className="flex basis-full flex-col bg-white">
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
