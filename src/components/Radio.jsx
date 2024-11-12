
function Radio({ options, onChange, label, value }) {

    // className="flex items-center justify-end pr-4 inset-0 absolute cursor-pointer "
  return (
    <span className="uppercase m-auto mt-2  flex gap-3 items-center ">
      {label}
      <form className="w-full flex gap-5">
        {options.map((option, index) => (
          <span
            key={index}
            className="flex gap-2 relative border-solid border-gray-500 border-[2px] rounded-md p-3 "
          >
            <input
            className="p-0"
              checked={option == value}
              onChange={(ev) => onChange(ev.target.value)}
              id={option}
              type="radio"
              value={option}
              name={"radioGroup" + label}
            />
            <label
              className="cursor-pointer "
              htmlFor={option}
            >
              {option}
            </label>
          </span>
        ))}
      </form>
    </span>
  );
}

export default Radio;
