import { useEffect, useState } from 'react';

export const useForm01 = (initialForm = {}) => {


    const [formState, setFormState] = useState(initialForm);

    const onInputChange = ({ target }) => {
        const { name, value } = target;

        setFormState({
            ...formState,
            [name]: value
        });

 

    }



    const onResetForm = () => {
        setFormState(initialForm);
    }

    useEffect(()=>{
        setFormState(initialForm)
    },[initialForm])


    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
  
    }
}