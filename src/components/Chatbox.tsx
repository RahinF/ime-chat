import useUserStore from "../hooks/useUserStore";
import Input from "./Input";
import Messages from "./Messages";

const Chatbox = () => {
  const { chatId } = useUserStore();

  return (
    <div className="flex basis-full flex-col bg-white">
      {chatId ? (
        <>
          <Messages />
          <Input />
        </>
      ) : (
        <div className="grid h-full place-items-center">
          Select a user to being a conversation
        </div>
      )}
    </div>
  );
};

export default Chatbox;
