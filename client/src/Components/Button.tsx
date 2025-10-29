interface props {
  label?: string;
  onClick?: () => void;
}

const Button = ({ label, onClick }: props) => {
  return (
    <button
      onClick={onClick}
      type="submit"
      className="py-2 cursor-pointer px-4 font-medium bg-blue-500 text-white w-full rounded-xl text-center"
    >
      {label}
    </button>
  );
};

export default Button;
