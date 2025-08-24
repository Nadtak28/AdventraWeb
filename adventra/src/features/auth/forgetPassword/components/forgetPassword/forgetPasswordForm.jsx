import { ForgetPasswordService } from "../../api/forgetPasswordService";
import ForgetPasswordEmailInput from "./forgetPasswordEmail";
import SendCodeButton from "./sendCodeButton";
export default function ForgetPasswordForm({ onForgetPassword }) {
 

  return (
    <form>
         <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
<ForgetPasswordEmailInput/> 
        </div>

            <div className="flex px-4 py-3">
<SendCodeButton onSuccess={onForgetPassword} />
         </div>
       </form>
  );
}
