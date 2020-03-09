import React from 'react';

const FormComponent = props => {
    const {
        handleChange,
        handleSubmit,
        btnText,
        inputs: {
            postDate,
            postTitle,
            postDescription,
            postURL
        }
    } = props;

    return (
        <form onSubmit={ handleSubmit }>
            <input
                type='date'
                name='postDate'
                value={ postDate }
                onChange={ handleChange }
            />

            <input 
                type='text'
                name='postTitle'
                value={ postTitle }
                onChange={ handleChange }
            />

            <input 
                type='text'
                name='postDescription'
                value={ postDescription }
                onChange={ handleChange }
            />

            <input 
                type='text'
                name='postURL'
                value={ postURL }
                onChange={ handleChange }
            />

            <button>{ btnText }</button>
        </form>
    );
};

export default FormComponent;