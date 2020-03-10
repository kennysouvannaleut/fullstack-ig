import React from 'react';

const FormComponent = props => {
    const {
        handleChange,
        handleSubmit,
        btnText,
        inputs: {
            imgURL,
            description,
            likes
        }
    } = props;

    return (
        <form onSubmit={ handleSubmit }>
            <input
                type='text'
                name='imgURL'
                value={ imgURL }
                onChange={ handleChange }
                placeholder='Image URL'
            />
            <input 
                type='text'
                name='description'
                value={ description }
                onChange={ handleChange }
                placeholder='Description'
            />
            <input 
                type='text'
                name='likes'
                value={ likes }
                onChange={ handleChange }
                placeholder='Likes'
            />
            <button>{ btnText }</button>
        </form>
    );
};

export default FormComponent;