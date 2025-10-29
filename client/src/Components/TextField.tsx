import type { Dispatch, SetStateAction } from "react";

interface Props<T extends string | number> {
  label?: string;
  value?: T | undefined;
  setValue?: Dispatch<SetStateAction<T | undefined>>;
  type?: "text" | "password" | "email" | "address" | "number";
  placeholder?: string;
}

const TextField = <T extends string | number>({
  label,
  value,
  setValue,
  placeholder,
  type = "text",
}: Props<T>) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (type === "number") {
      setValue?.(val === "" ? undefined : (Number(val) as T));
    } else {
      setValue?.(val as T);
    }
  };

  return (
    <div className="w-full">
      {label && <p className="font-medium mb-1">{label}</p>}
      <input
        value={value ?? ""}
        onChange={handleChange}
        placeholder={placeholder}
        type={type}
        className="p-2 w-full border border-gray-500 outline-none focus:border-blue-500 focus:border-2 transition-all rounded-xl"
      />
    </div>
  );
};

export default TextField;
