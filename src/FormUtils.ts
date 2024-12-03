// function to handle inputs for text boxes
export const handleInputChange = <T extends Record<string, any>>(
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  setFormData: React.Dispatch<React.SetStateAction<T>>
) => {
  const { name, value } = event.target;
  setFormData((prev: T) => ({ ...prev, [name]: value }));
};

// create handleInputChange wrapper
export const makeInputChangeHandler = <T extends Record<string, any>>(
  setFormData: React.Dispatch<React.SetStateAction<T>>
) => {
  function hndlr(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    return handleInputChange(e, setFormData);
  }
  return hndlr;
}

// create function to handle inputs for checkboxes
export const makeCheckboxChangeHandler = <T extends Record<string, any>>(
  setFormData: React.Dispatch<React.SetStateAction<T>>
) => {
  function toggleElem(arr: string[], val: string): string[] {
    const ind = arr.indexOf(val);
    return (ind !== -1) ? arr.slice().splice(ind, 1) : arr.concat([val]);
  }
  return function(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData((prev: T) => ({ ...prev, [name]: toggleElem(prev[name], value) }));
  }
};

// create function to handle POST request & properly encode the form data.
export const makeSubmitHandler = <T extends Record<string, any>>(
  formData: T,
  endpoint: string,
  method: string,
  onSuccess: () => void
) => {
  return async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      console.log("Payload:", formData);

      const response = await fetch(endpoint, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include"
      });

      if (response.status === 401) {
        const errorData = await response.json();
        throw errorData.message;
      }

      if (response.ok) {
        const data = await response.json();
        console.log(`success `, data);
        onSuccess()
      }

    } catch (error) {
      console.error("Error during fetch:", error);
    }
  }
}
