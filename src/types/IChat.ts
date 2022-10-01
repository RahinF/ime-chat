interface IChat {
  date: {
    nanoseconds: number;
    seconds: number;
  };

  uid: string;
  lastMessage: {
    text: string;
  };
}

export default IChat;
