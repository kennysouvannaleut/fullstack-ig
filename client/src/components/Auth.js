import React, { useState, useContext } from 'react';
import AuthForm from './AuthForm';
import UserContext from '../context/userContext';

const Auth = () => {
    const initialInputs = { username: '', password: '' };

    const [inputs, setInputs] = useState(initialInputs);
    const [toggle, setToggle] = useState(false);

    const userContext = useContext(UserContext);
    const { signup, login, errMsg, resetAuthErr } = userContext;

    const handleChange = e => {
        const { name, value } = e.target;
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        })
    )};

    const handleSignup = e => {
        e.preventDefault();
        signup(inputs);
    };

    const handleLogin = e => {
        e.preventDefault();
        login(inputs);
    };

    const toggleForm = () => {
        setToggle(prevToggle => !prevToggle);
        resetAuthErr();
    };

    return (
        <div className='auth-container'>
            <h1>IG Group Project</h1>
            { !toggle ?
            <>
                <AuthForm 
                    handleChange={ handleChange }
                    handleSubmit={ handleSignup }
                    inputs={ inputs }
                    buttonText='Signup'
                    errMsg={ errMsg }
                />
                <p onClick={ toggleForm }>Already have an account? Sign in</p>  
            </>
        :
            <>
                <AuthForm 
                    handleChange={ handleChange }
                    handleSubmit={ handleLogin }
                    inputs={ inputs }
                    buttonText='Login'
                    errMsg={ errMsg }
                />
                <p onClick={ toggleForm }>New users? Sign up</p>
            </>
            }
        </div>
    );
};

export default Auth;

