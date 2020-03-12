import React from 'react';
import { useForm } from '../hooks/useForm';

export const UserForm = () => {
    const { values, handleChange, handleSubmit } = useForm();

    return (
        <>
            <form onSubmit = { handleSubmit }>
                <input 
                    className='input'
                    type='text'
                    name='user'
                    onChange={ handleChange }
                    value={ values.user }
                    requied 
                />
            </form>
        </>
    );
};