import Header from "../features/onBoarding/components/mainContent/header/header";
import HeroSection from "../features/onBoarding/components/mainContent/heroSection/heroSection";
import SignUpOptions from "../features/onBoarding/components/signUpOptions";

export default function OnBoarding(){

     return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-[#f8fbfb] group/design-root overflow-x-hidden"
      style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <Header />
        <main className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <HeroSection />
            <SignUpOptions />
          </div>
        </main>
      </div>
    </div>
  );


}