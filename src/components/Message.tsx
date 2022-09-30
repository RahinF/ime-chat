const Message = () => {
  return (
    <div className="flex gap-4">
      <div className="h-12 w-12 shrink-0 rounded-full bg-blue-900" />
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="font-bold">John Smith</span>
          <span className="text-xs">just now</span>
        </div>
        <span className="rounded bg-blue-500 p-3 text-white">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit, omnis
          ipsa optio aliquid provident vel voluptatem doloremque voluptas fugiat
          quaerat?
        </span>
      </div>
    </div>
  );
};

export default Message;
