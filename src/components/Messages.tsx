import Message from "./Message";

const Messages = () => {
  return (
    <div className="flex flex-1 flex-col gap-6 overflow-y-auto p-4">
      {[...Array(20)].map((element, index) => (
        <Message key={index} />
      ))}
    </div>
  );
};

export default Messages;
