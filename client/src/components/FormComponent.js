import React from 'react';
import ImageUploader from 'react-images-upload';

const FormComponent = props => {
    const {
        handleChange,
        handleSubmit,
        handleOnDrop,
        buttonText
    } = props;

    return (
        <form onSubmit={ handleSubmit }
            >
            <ImageUploader 
                onChange={ handleOnDrop }
                withIcon={ true }
                withPreview={ true }
                imgExtension={ ['.jpg', '.gif', '.png' ] }
                maxFileSize={ 5242880 }
                fileSizeError='file size is to big'
                fileTypeError='is not supported file extension'
                buttonText='Upload Image'
            />
            <br />
            <textarea
                onChange={ handleChange }
                placeholder='some description...'
                cols={ 50 }
                rows={ 10 }
            />
            <br />
            <button>{ buttonText }</button>
        </form>
    );
};

export default FormComponent;

