const PageLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br dark:bg-[#1a1f2e] bg-white  px-6 md:px-12 lg:px-20 py-8 flex justify-center">
      <div className="flex flex-col w-full max-w-screen-2xl">{children}</div>
    </div>
  );
};

export default PageLayout;
