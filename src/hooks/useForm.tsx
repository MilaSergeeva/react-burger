import { useState } from "react";

interface IForm {
  name?: string;
  email?: string;
  password?: string;
  token?: string;
}

export function useForm(inputValues: IForm) {
  const [values, setValues] = useState<IForm>(inputValues);

  const handleChange = (event: React.ChangeEvent) => {
    const { value, name } = event.target as HTMLInputElement;
    setValues({ ...values, [name]: value });
  };
  return { values, handleChange, setValues };
}
