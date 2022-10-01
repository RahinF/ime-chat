import Chatbox from "../components/Chatbox";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="flex h-[calc(100vh_-_64px)]">
        <Sidebar />
        <Chatbox />
      </div>
    </div>
  );
};

export default Home;
