const Chats = () => {
  return (
    <div className="flex flex-col divide-y overflow-y-auto">
      {[...Array(20)].map((element, index) => (
        <div
          key={index}
          className="flex cursor-pointer gap-2 p-4 hover:bg-blue-500 hover:text-white"
        >
          <div className="h-12 w-12 shrink-0 rounded-full bg-blue-300" />
          <div>
            <div className="font-bold">John Smith</div>
            <div className="truncate max-w-xs">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
              praesentium dolore nesciunt provident placeat alias temporibus!
              Dolorem minima, aliquid provident inventore sed ex quis maiores
              eveniet dolores similique, alias qui.
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;
