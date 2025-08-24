import SidebarChatItem from "./sideBarChatItem";

const Sidebar = () => {
  const chats = [
    {
      title: "Northern Lights",
      subtitle: "Group chat",
      time: "2h",
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=40&h=40&q=80",
    },
    {
      title: "Japanese Cherry…",
      subtitle: "Group chat",
      time: "1d",
      image:
        "https://images.unsplash.com/photo-1529236182218-d5ee6773725b?auto=format&fit=crop&w=40&h=40&q=80",
    },
    {
      title: "Machu Picchu…",
      subtitle: "Group chat",
      time: "3d",
      image:
        "https://images.unsplash.com/photo-1508261302403-e50e16c3c820?auto=format&fit=crop&w=40&h=40&q=80",
    },
  ];

  return (
    <aside className="w-80 border-r border-gray-200  flex flex-col">
      <div className="p-4">
        <input
          type="text"
          placeholder="Search"
          className="w-full px-4 py-2 rounded-lg bg-gray-100 text-sm focus:outline-none"
        />
      </div>
      <div className="flex-1 overflow-y-auto">
        <ul className="space-y-4 px-4">
          {chats.map((chat, index) => (
            <SidebarChatItem key={index} {...chat} />
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
