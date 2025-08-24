
const ChatMessage = ({ author, message, image, isOwn }) => (
  <div className={`flex ${isOwn ? "justify-end" : ""} gap-3`}>
    {!isOwn && <img src={image} className="w-10 h-10 rounded-full" alt={author} />}
    <div className={`text-sm ${isOwn ? "text-right" : ""}`}>
      <p className="text-gray-500 text-xs mb-1">{author}</p>
      <div
        className={`p-3 rounded-lg max-w-md ${
          isOwn ? "bg-teal-400 text-white" : "bg-gray-100 text-gray-900"
        }`}
      >
        {message}
      </div>
    </div>
    {isOwn && <img src={image} className="w-10 h-10 rounded-full" alt={author} />}
  </div>
);

export default ChatMessage;