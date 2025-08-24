import { useState } from "react";
import { Navigate } from "react-router-dom";
import HeroImage from './HeroSection/heroImage';
import GenerateUnverifiedUserForm from "../signUp/components/generateUnverifiedUserForm/generateUnverifiedUSerForm";
import LoginFormLink from '../signUp/components/LogInLink/logInLink';
import Header from './header/header';
import VerificationForm from '../signUp/components/VerificationForm/verificationForm';
import ResendVerificationForm from '../signUp/components/resendVerification/resendVerificationForm';
import LoginForm from "../login/components/logInForm/logInForm";
import SignUpLink from "../login/components/signUpLink/signUpLink";
import ForgetPasswordForm from "../forgetPassword/components/forgetPassword/forgetPasswordForm";
import CheckCodeForm from "../forgetPassword/components/checkCodeForm/checkCodeForm";
import ResetPasswordForm from '../forgetPassword/components/resetPassword/resetPasswordForm'
export default function MainContent() {
  const [step, setStep] = useState("form");

  if (step === "success") return <Navigate to="/home" />;

  return (
    <main className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <div className="w-full max-w-[600px] flex flex-col justify-center px-10">
          {step === "form" && (
            <>
              <h2 className="text-[#0e1a18] text-[28px] font-bold leading-tight pb-3 text-center">
                Create your account
              </h2>
              <GenerateUnverifiedUserForm onSuccess={(newStep) => setStep(newStep)} />
              <LoginFormLink onLoginClick={() => setStep("login")} />
            </>
          )}

          {step === "loading" && (
            <div className="flex justify-center items-center h-full w-full">
              <div className="w-12 h-12 border-4 border-t-[#53e3cb] border-gray-300 rounded-full animate-spin"></div>
            </div>
          )}

          {step === "verify" && (
            <VerificationForm onSuccess={() => setStep("success")} onResend={() => setStep("resend")} />
          )}

          {step === "resend" && (
            <ResendVerificationForm onBackToVerification={() => setStep("verify")} />
          )}

          {step === "login" && (
            <>
              <h2 className="text-[#0e1a18] text-[28px] font-bold leading-tight pb-3 text-center">
                Login to Your Home
              </h2>
              <LoginForm
                onSuccess={(s) => setStep(s)}
                onForgetPasswordClick={() => setStep("forget")}
              />
              <SignUpLink onregisterClick={() => setStep("form")} />
            </>
          )}

      {step === "forget" && (
  <>
    <h2 className="...">You Forgot Your Password</h2>
    <p className="...">Enter your email to receive a verification code</p>
    <ForgetPasswordForm onForgetPassword={() => setStep("checkCode")} />
  </>
)}
          {step === "checkCode" && (
            <>
              <CheckCodeForm onSuccess={()=>setStep("resetPassword")} />
            </>
          )}
{step === "resetPassword" && (
  <>
    <h2 className="text-[#0e1a18] text-[28px] font-bold leading-tight pb-3 text-center">
      Reset Password
    </h2>
    <ResetPasswordForm onResetSuccess={() => setStep("login")} />
  </>
)}

        </div>



        <div className="flex-1 hidden lg:block">
          <HeroImage />
        </div>
      </div>
    </main>
  );
}
