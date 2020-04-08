import React from 'react';
import ImageUploader from 'react-images-upload';

const FormComponent = props => {
    const {
        handleChange,
        handleSubmit,
        onDrop,
        buttonText,
        inputs: {
            user,
            description, 
            pictures,
            // likes,
            // dateAdded
        }
    } = props;

    return (
        <form onSubmit={ handleSubmit }>
            {/* <input 
                type='date'
                name='dateAdded'
                value={ dateAdded }
                onChange={ handleChange }
            /> */}
            <input 
                type='text'
                name='user'
                value={ user }
                onChange={ handleChange }
                placeholder='Username'
            />
            <br />
            <br />
            <textarea
                name='description'
                value={ description}
                onChange={ handleChange }
                placeholder='some image description...'
                cols={ 50 }
                rows={ 10 } 
            />
            <ImageUploader 
                name={ pictures }
                onChange={ onDrop }
                withIcon={ true }
                withPreview={ true }
                imgExtension={ ['.jpg', '.gif', '.png' ] }
                maxFileSize={ 5242880 }
                fileSizeError='file size is to big'
                fileTypeError='is not supported file extension'
                buttonText='Upload an image'
            />
            <button>{ buttonText }</button>
        </form>
    );
};

export default FormComponent;

