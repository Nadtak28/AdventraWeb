function GuideDetails({
  name = "Professional Guide",
  title = "Experienced Tour Guide",
}) {
  return (
    <div className="flex flex-col justify-center">
      <p className="text-[#0e1a18] text-base font-medium leading-normal line-clamp-1">
        {name}
      </p>
      <p className="text-[#519489] text-sm font-normal leading-normal line-clamp-2">
        {title}
      </p>
    </div>
  );
}

export default GuideDetails;
