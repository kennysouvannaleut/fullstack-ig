import React from 'react';

const AuthForm = props => {
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
        <form className='auth-form' onSubmit={ handleSubmit }>
            <input 
                type='text'
                name='username'
                value={ username }
                onChange={ handleChange }
                placeholder='Username'
                autoFocus
            />
            <input
                type='password'
                name='password'
                value={ password }
                onChange={ handleChange }
                placeholder='Password'
            />
            <button className='button'>{ buttonText }</button>
            { errMsg && <p style={{ color: 'red' }}>{ errMsg }</p> }
        </form>
    );
};

export default AuthForm;