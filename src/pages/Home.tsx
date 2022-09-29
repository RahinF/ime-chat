import Chat from "../components/Chat";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="flex h-[calc(100vh_-_64px)]">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};

export default Home;
