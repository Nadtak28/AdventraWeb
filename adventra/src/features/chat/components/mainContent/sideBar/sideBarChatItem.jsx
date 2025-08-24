
const SidebarChatItem = ({ image, title, subtitle, time }) => (
  <li className="flex items-center gap-4">
    <img src={image} alt={title} className="w-10 h-10 rounded-lg object-cover" />
    <div className="flex-1">
      <p className="font-medium text-sm">{title}</p>
      <p className="text-gray-500 text-xs">{subtitle}</p>
    </div>
    <span className="text-xs text-gray-400">{time}</span>
  </li>
);

export default SidebarChatItem;