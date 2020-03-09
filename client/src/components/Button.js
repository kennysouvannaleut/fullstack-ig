import React from 'react';
import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

const Button = () => (
    <ButtonToolbar>
        <Button href='#'>Link</Button>
        <Button type='submit'>Button</Button>
        <Button 
            as='input' 
            type='button' 
            value='Input' 
        />
        <Button
            as='input'
            type='submit'
            value='Submit'
        />
        <Button
            as='input'
            type='reset'
            value='Reset'
        />
        <Button 
            as='input'
            type='edit'
            value='Edit'
        />
    </ButtonToolbar>
);

export default Button;