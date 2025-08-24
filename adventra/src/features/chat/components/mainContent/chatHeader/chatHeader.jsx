
const ChatHeader = () => (
  <div className="flex justify-between items-center px-6 py-4 border-b">
    <div>
      <h1 className="text-xl font-bold text-gray-900">Northern Lights</h1>
      <p className="text-sm text-gray-500">Group chat</p>
    </div>
    <button className="text-sm px-4 py-2 bg-gray-100 text-gray-700 rounded-full">
      Leave group
    </button>
  </div>
);

export default ChatHeader;