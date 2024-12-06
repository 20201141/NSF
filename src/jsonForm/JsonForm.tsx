import React from "react";
import { makeSubmitHandler } from "../FormUtils";

type JsonFormProps <T extends Record<string, any>> = {
  children: React.ReactNode;
  formData: T;
  // setFormData: React.Dispatch<React.SetStateAction<T>>; 
  action: string; 
  method: string;
  className: string;
  onSuccess?: () => void;
}

// type JsonFormProps = <T extends Record<string, any>> React.PropsWithChildren<JsonFormArgs<T>>;

// const JsonForm: React.FC<JsonFormProps<T>> = ({ children, action, method, className, formData }) => {
function JsonForm <T extends Record<string, any>> (props: JsonFormProps<T>) {
  const { children, action, method, className, formData } = props;
  return <form 
    className={className}
    onSubmit={makeSubmitHandler(formData, action, method, props.onSuccess || (() => null))}
  >
    {children}
  </form>;
}

export default JsonForm;
