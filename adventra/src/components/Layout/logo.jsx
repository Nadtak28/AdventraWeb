import logo from ".//../../../public/assets/logo.png"; // adjust path if needed

const Logo = () => {
  return (
    <>
<div className="flex items-center">
  <img src={logo} alt="Logo" className="h-20 scale-200 transform origin-left" />
</div>

    </>
  );
};

export default Logo;
