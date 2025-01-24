import { useEffect, useMemo, useState } from 'react';

export const useForm = (initialForm = {}, formValid) => {

    const form = useMemo(() => {
        let form = {};
        Object.keys(formValid).forEach(item => {
            form[item + 'Valid'] = [false, null]
        });
        return form
    }, []);

    const [formState, setFormState] = useState(initialForm);
    const [formStateValid, setFormStateValid] = useState({ ...form });
    const [isValidForm, setisValidForm] = useState(true);
    const keysForm = useMemo(() => Object.keys(formValid), []);

    const onInputChange = ({ target }) => {
        const { name, value } = target;

        setFormState({
            ...formState,
            [name]: value
        });

        setFormStateValid({
            ...formStateValid,
            [`${name}Valid`]: [formValid[name][0](value), formValid[name][0](value) ? formValid[name][1] : null]
        })

    }

    const isCheckingForm = () => {
        const num = keysForm.length - 1;
        setisValidForm(true);
        for (let i in keysForm) {
            i *= 1
            if(!formState[keysForm.at(-1) ].trim()) return;
            if (formStateValid[keysForm[i]+'Valid'][0] ) return;
            if(!formState[keysForm[i] ].trim()) return;
            if (i !== num) continue;
                setisValidForm(false)
                
        }
    }

    const onResetForm = () => {
        setFormState(initialForm);
    }

    useEffect(()=>{
        setFormState(initialForm)
    },[initialForm])

    useEffect(() => {
        isCheckingForm()

    }, [formState]);

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        formStateValid,
        isValidForm
    }
}