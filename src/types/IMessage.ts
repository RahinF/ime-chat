interface IMessage {
  date: {
    seconds: number;
    nanoseconds: number;
  };
  id: string;
  text: string;
  senderId: string;
  image: string;
}

export default IMessage;
