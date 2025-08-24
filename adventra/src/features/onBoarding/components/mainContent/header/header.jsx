import Logo from "../../../../../components/header&footer/logo";
import LogInButton from "./logINButton";
import SignUpButton from "./signUpButton";

export default function Header() {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#e8f2f1] px-10 py-3">
   <Logo/>
      <div className="flex flex-1 justify-end gap-8">
       
        <div className="flex gap-2">
        <SignUpButton/>
        <LogInButton/>
          
        </div>
      </div>
    </header>
  );
}
