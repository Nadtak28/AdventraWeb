import ConfirmPasswordInput from "./confirmPasswordInput";
import EmailInput from "./emailInput";
import NameInput from "./nameInput";
import PasswordInput from "./passwordInput";
import { GenerateUnverifiedUserService } from "../../api/generateUnverifiedUserService";
import SubmitButton from "./submitButton";

export default function GenerateUnverifiedUserForm({onSuccess}) {


  return (
    <form >
      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <NameInput />
      </div>

      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <EmailInput />
      </div>

      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <PasswordInput />
      </div>

      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <ConfirmPasswordInput />
      </div>

      <div className="flex px-4 py-3">
        <SubmitButton onSuccess={onSuccess} />
      </div>
    </form>
  );
}
