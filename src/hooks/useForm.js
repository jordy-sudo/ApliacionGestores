import { useState } from "react";

export const useForm = (initialForm={}) => {

    const [customForm, setCustomForm] = useState(initialForm);
    const onInputChange =({target})=>{
        const {name,value}=target;
        setCustomForm({
            ...customForm,
            [name]:value,
        })
    }
    const onResetForm =()=>{
        setCustomForm(
            initialForm
        )
    }
  return {
    ...customForm,
    customForm,
    onInputChange,
    onResetForm
  }
}