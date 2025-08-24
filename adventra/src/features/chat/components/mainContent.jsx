import Sidebar from "./mainContent/sideBar/sideBar";
import ChatHeader from "./mainContent/chatHeader/chatHeader";
import ChatMessage from "./mainContent/chatMessage/chatMessage";
import MessageInput from "./mainContent/chatMessage/messageInput";

const MainContent = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col ">
        <ChatHeader />
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <ChatMessage
            author="Evelyn"
            message="Hey everyone! I'm so excited for our trip to Iceland. I'm from New York and I've never been to Iceland before. What about you?"
            image="https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=40&h=40&q=80"
            isOwn={true}
          />
          <ChatMessage
            author="Andrew"
            message="Hey Evelyn! I'm from San Francisco and I've been to Iceland once. I'm really looking forward to seeing the Northern Lights again."
            image="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=40&h=40&q=80"
            isOwn={false}
          />
        </div>
        <MessageInput />
      </main>
    </div>
  );
};

export default MainContent;
