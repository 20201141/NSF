// function to handle inputs for text boxes
export const handleInputChange = <T extends Record<string, any>>(
  event: React.ChangeEvent<HTMLInputElement>,
  setFormData: React.Dispatch<React.SetStateAction<T>>
) => {
  const { name, value } = event.target;
  setFormData((prev: T) => ({ ...prev, [name]: value }));
};