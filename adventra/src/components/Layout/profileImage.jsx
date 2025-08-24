import { Link } from "react-router-dom";
export default function ProfileImage() {
  return (
    <Link to="/user">

     <button
      className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10  text-[#0e1a18] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 "
    >
    <div
      className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
      style={{
        backgroundImage:
          'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCisu_3YTPYCi34jSXwpPmu2FNCa5EhGf0B8U4eAVMEvTWzTVbUbHN3lIvVgOoGlPvMYyYwQi_HCR5LvhWdF67iwwOFwmj5nZ0gO16UeEmul6ktlHU2EL5yNpxTrmhUA3l0o56dBl1D1kB_NbmyGWYN3MMwfc0zXYsgmnSlqM1PYEIgTlMNMEEAgRb_ulI7CezyHm0xS3k9xb-ZNTReSqSyQZGPu4ZNGR46SG0iH9CRC6gZBEAP2N5WZrsS_fKqfRX354EE95v_i0M")', 
      }}
    ></div>
    </button>
    </Link>

  );
}