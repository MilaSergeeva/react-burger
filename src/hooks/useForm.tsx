import { useState } from "react";

export function useForm(inputValues: any) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (event: React.ChangeEvent) => {
    const { value, name } = event.target as HTMLInputElement;
    setValues({ ...values, [name]: value });
  };
  return { values, handleChange, setValues };
}
