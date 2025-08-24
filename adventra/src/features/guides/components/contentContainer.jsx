const ContentContainer = ({ children }) => {
  return (
    <div className="layout-content-container flex flex-col max-w-full flex-1 space-y-8">
      {children}
    </div>
  );
};

export default ContentContainer;
