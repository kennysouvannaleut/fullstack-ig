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
                value={ description}
                onChange={ handleChange }
                placeholder='image description...'
                cols={ 50 }
                rows={ 10 } 
            />
            <ImageUploader 
                onChange={ onDrop }
                withIcon={ true }
                withPreview={ true }
                imgExtension={['.jpg', '.jpeg', '.gif', '.png']}
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

