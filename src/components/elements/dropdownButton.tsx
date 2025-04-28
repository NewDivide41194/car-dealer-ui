import { JSX, memo } from "react";

interface DropDownButtonProps {
  onClickButton: () => void;
  text: string | null;
  placeholder: string;
}
const DropDownButton = (props: DropDownButtonProps): JSX.Element => {
  const { onClickButton, text, placeholder } = props;
  return (
    <button
      onClick={() => onClickButton()}
      className="w-[150px] justify-between text-white bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-gray-700 dark:hover:bg-gray-600"
      type="button"
    >
      {text || placeholder}
      <svg
        className="w-2.5 h-2.5 ms-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 10 6"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="m1 1 4 4 4-4"
        />
      </svg>
    </button>
  );
};

export default memo(DropDownButton);
