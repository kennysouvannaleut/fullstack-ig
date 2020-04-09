import React from 'react';

const AuthForm = props => {
    console.log('props', props);
    const {
        handleChange,
        handleSubmit,
        buttonText,
        errMsg,
        inputs: {
            username,
            password
        }
    } = props;
    
    return (
        <form onSubmit={ handleSubmit }>
            <input 
                type='text'
                name='username'
                value={ username }
                onChange={ handleChange }
                placeholder='Username'
            />

            <input
                type='text'
                name='password'
                value={ password }
                onChange={ handleChange }
                placeholder='Password'
            />

            <button>{ buttonText }</button>
            { errMsg && <p style={{ color: 'red' }}>{ errMsg }</p> }
        </form>
    );
};

export default AuthForm;