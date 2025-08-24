
export default function SignUpOptions() {
  return (
    <div className="my-8 flex flex-col items-center gap-3">
      <p className="text-[#0e1a18] text-sm font-semibold leading-normal">
        Already have an account? <a href="#" className="underline text-[#5ae4cd]">Log in</a>
      </p>
      <p className="text-[#0e1a18] text-sm font-semibold leading-normal">or</p>
      <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full h-10 px-4 bg-white text-[#0e1a18] text-sm font-bold leading-normal tracking-[0.015em] border border-[#0e1a18]">
        <span className="size-5">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.5 12.2225C22.5 11.44 22.4317 10.885 22.2844 10.3075H12.2041V13.7475H18.0538C17.9387 14.63 17.3528 15.94 16.0809 16.835L16.0636 16.9515L18.7186 18.9865L18.901 19C20.5966 17.455 22.5 14.965 22.5 12.2225Z" fill="#4285F4"></path>
            <path d="M12.2041 22C14.7066 22 16.821 21.175 18.901 19L16.0809 16.835C14.9992 17.595 13.5684 18.1025 12.2041 18.1025C9.75958 18.1025 7.70813 16.5575 6.95517 14.39L6.84459 14.3998L4.08491 16.5135L4.04883 16.615C6.11796 20.005 9.89882 22 12.2041 22Z" fill="#34A853"></path>
            <path d="M6.95517 14.39C6.75657 13.8125 6.64349 13.1925 6.64349 12.555C6.64349 11.9175 6.75657 11.2975 6.94526 10.72L6.9405 10.5963L4.14595 8.44629L4.04883 8.49502C3.38212 9.79252 3 11.1375 3 12.555C3 13.9725 3.38212 15.3175 4.04883 16.615L6.95517 14.39Z" fill="#FBBC05"></path>
            <path d="M12.2041 6.97751C13.7659 6.97751 14.8252 7.63751 15.4088 8.17501L19.0126 4.71501C16.8111 2.72751 14.7066 2 12.2041 2C9.89882 2 6.11796 3.99501 4.04883 8.49501L6.94527 10.72C7.70813 8.55251 9.75958 6.97751 12.2041 6.97751Z" fill="#EA4335"></path>
          </svg>
        </span>
        <span className="truncate">Sign up with Google</span>
      </button>
    </div>
  );
}
