import { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";
import clsx from "clsx";

type TInput = {
  label: string;
  message?: string
  variant?: "info" | "accent" | "danger";
}
const baseStyles = "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500";

const variants = {
  info: "text-white bg-gray-800 hover:bg-gray-900 focus:ring-gray-300 dark:bg-gray-800 dark:hover:bg-gray-900 dark:focus:ring-gray-800",
  accent: "text-white bg-violet-700 hover:bg-violet-800  focus:ring-violet-300 dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800",
  danger: "text-white bg-rose-700 hover:bg-rose-800  focus:ring-rose-300 dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-800"
}

const disabledStyles = "opacity-60 pointer-events-none";


const Input = ({ label, message, variant = "info", ...restProps }: TInput & TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  const { disabled, name } = restProps;
  return (<div className="flex flex-col">
    <label
      htmlFor={`${name}-input`}
      className="block mb text-sm font-medium text-red-700 dark:text-red-500"
    >{label}</label>
    <textarea {...restProps} id={`${name}-input`} className={clsx(baseStyles, variants[variant], { [disabledStyles]: disabled })}
      placeholder="Error input" />
    {message && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{message}</p>}
  </div>
  )
}

export default Input;