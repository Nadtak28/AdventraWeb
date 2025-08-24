export default function HeroImage() {
  return (
    <div className="@container w-full flex justify-center items-center py-4">
      <div
        className="relative bg-[#f8fbfb] @[480px]:rounded-xl overflow-hidden"
        style={{
          width: "100%",             // takes full container width
          maxWidth: "800px",         // limit to desktop-friendly size
          height: "600px",           // set fixed height
        }}
      >
        {/* Background SVG Shape */}
        <img
          src="/assets/download.svg"
          alt="Decorative Background Shape"
          className="absolute inset-0 w-full h-full object-contain z-0"
        />

        {/* Hero Image */}
        <img
          src="/assets/hero-img.png"
          alt="Tourism Hero"
          className="absolute inset-0 w-full h-full object-contain opacity-90 z-10"
        />

        {/* Optional Overlay or Content */}
        <div className="relative z-20 flex justify-end items-end h-full p-4">
          {/* Add text/buttons if needed */}
        </div>
      </div>
    </div>
  );
}
