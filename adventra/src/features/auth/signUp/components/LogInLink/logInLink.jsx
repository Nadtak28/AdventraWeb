export default function LoginFormLink({ onLoginClick }) {
  return (
    <p className="text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center  ">
      Already have an account?{' '}
      <button
        className="text-[#519489] font-semibold underline hover:cursor-pointer"
        onClick={onLoginClick}
      >
        Log in
      </button>
    </p>
  );
}
