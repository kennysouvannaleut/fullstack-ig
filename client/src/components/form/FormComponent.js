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
            <ImageUploader 
                {...props}
                onChange={ onDrop }
                // withIcon={ true }
                withPreview={ true }
                singleImage={ true }
                imgExtension={ ['.jpg', '.gif', '.png', '.jpeg'] }
                maxFileSize={ 10000000 }
                fileSizeError='file size is to big'
                fileTypeError='is not supported file extension'
                buttonText='upload an image'
                label='Max file size 10mb, accepted: jpg, png, gif'
            />
            <textarea
                name='description'
                value={ description }
                onChange={ handleChange }
                placeholder='provide an image description'
                cols={ 50 }
                rows={ 3 } 
            />
            <button>{ buttonText }</button>
        </form>
    );
};

export default FormComponent;

