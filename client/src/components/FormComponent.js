import React from 'react';
import ImageUploader from 'react-images-upload';

const FormComponent = props => {
    const {
        handleChange,
        handleSubmit,
        // handleOnDrop,
        buttonText,
        inputs: { user, description }
    } = props;
        console.log('props', props);

    return (
        <form onSubmit={ handleSubmit }>
            <input 
                type='text'
                name='user'
                value={ user }
                onChange={ handleChange }
                placeholder='username'
            />
            <br />
            <textarea
                name='description'
                value={ description}
                onChange={ handleChange }
                placeholder='image description...'
                cols={ 50 }
                rows={ 10 } 
            />
            <ImageUploader 
                // onChange={ handleOnDrop }
                withIcon={ true }
                withPreview={ true }
                imgExtension={['.jpg', '.gif', '.png']}
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

