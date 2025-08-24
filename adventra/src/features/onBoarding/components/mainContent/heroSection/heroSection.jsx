
export default function HeroSection() {
  return (
    <div className="@container">
      <div className="@[480px]:p-4">
        <div
          className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-center justify-center p-4"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuD0EmD0tc_0UQ566U2vVdEruChyJAHBhccdmxv6Fhdy_hff9nAytGJE78WpCyDCQf5LwXdOmQkhAwcjjYTmNskD17AiYMzPeQSlaLbOGF6bq2pCkRTu3GGzVilp_SpidFacIMSVBljwocFwt5ZRlgxXulZQAn7BEhnlK64OBrd3TgS7Ziug-2cxcsMDV3UQQ-yOybfAfp6ms9sGeNc__nm5WH1sA4LzRqH4BU-yhNg95-c8H-Oj5Xa6_MblaWazgCSUEn7uptRU0pI")',
          }}
        >
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
              Explore the world with Adventra
            </h1>
            <h2 className="text-white text-md font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
              Discover unique tours and experiences led by local guides. Sign up to start your adventure or log in to continue exploring.
            </h2>
          </div>
          <div className="flex-wrap gap-3 flex justify-center">
            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#5ae4cd] text-white text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]">
              <span className="truncate">Explore Tours</span>
            </button>
            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#e8f2f1] text-[#0e1a18] text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]">
              <span className="truncate">Explore Destinations</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
