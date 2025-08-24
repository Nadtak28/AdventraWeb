
const MessageInput = () => (
  <div className="border-t p-4 flex items-center gap-4">
    <img
      src="https://images.unsplash.com/photo-1603415526960-f8f0a6240f76?auto=format&fit=crop&w=40&h=40&q=80"
      className="w-10 h-10 rounded-full"
      alt="User"
    />
    <input
      type="text"
      placeholder="Type a message"
      className="flex-1 px-4 py-2 rounded-full bg-gray-100 focus:outline-none"
    />
    <button className="px-4 py-2 bg-teal-400 text-white rounded-full text-sm">Send</button>
  </div>
);

export default MessageInput;