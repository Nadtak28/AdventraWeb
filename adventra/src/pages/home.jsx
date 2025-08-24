import MainContent from "../features/home/components/mainContent";
import HomeContextProvider from "../features/home/context/homeContext/homeContextProvider";

function Home() {
  return (
    <HomeContextProvider>
      <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden font-sans dark:bg-gradient-to-br from-[#0a1b17] via-[#11221f] to-[#1a332d]">
        <MainContent />
      </div>
    </HomeContextProvider>
  );
}

export default Home;
