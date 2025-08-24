import EmailInput from "./emailInput";
import PasswordInput from "./passwordInput";
import LogInButton from "./logInButton";
import GoogleLoginButton from "./gogleLoginButton";
import ForgetPasswordLink from "../forgetPasswordLink/forgerPasswordLink";

export default function LoginForm({ onSuccess, onForgetPasswordClick }) {
  return (
    <form>
      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <EmailInput />
      </div>

      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <PasswordInput />
      </div>

      <ForgetPasswordLink onForgetPasswordClick={onForgetPasswordClick} />

      <div className="flex px-4 py-3">
        <LogInButton onSuccess={onSuccess} />
      </div>

      <div className="flex px-4">
        <GoogleLoginButton />
      </div>
    </form>
  );
}
