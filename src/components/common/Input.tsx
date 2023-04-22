import React from "react";

type InputTypes = {
  id: string;
  placeholder: string;
};

const Input: React.FC<InputTypes> = ({ id, placeholder }) => {
  return (
    <>
      <input
        type="text"
        id={id}
        placeholder={placeholder}
        className="h-full w-full rounded-md border border-gray-300 p-3 text-sm outline-none focus:border-gray-600"
      />
    </>
  );
};

export default Input;
