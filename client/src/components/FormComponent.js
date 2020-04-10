import React from 'react';
import ImageUploader from 'react-images-upload';

const FormComponent = props => {
    const {
        handleChange,
        handleSubmit,
        onDrop,
        buttonText,
        inputs: { description }
    } = props;

    return (
        <form onSubmit={ handleSubmit }>
            <textarea
                name='description'
                value={ description }
                onChange={ handleChange }
                placeholder='image description...'
                cols={ 50 }
                rows={ 10 } 
            />
            <ImageUploader 
                onChange={ onDrop }
                withIcon={ false }
                withPreview={ true }
                singleImage={ true }
                imgExtension={ ['.jpg', '.gif', '.png', '.jpeg'] }
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

