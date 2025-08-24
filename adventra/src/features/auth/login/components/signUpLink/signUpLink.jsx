export default function SignUpLink({ onregisterClick }) {
  return (
    <p className="text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center  ">
      You don't have an account?{' '}
      <button
        className="text-[#519489] font-semibold underline hover:cursor-pointer"
        onClick={onregisterClick}
      >
        register
      </button>
    </p>
  );
}
