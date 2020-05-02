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
        <form onSubmit={ handleSubmit } className='post-form'>
            <ImageUploader 
                {...props}
                onChange={ onDrop }
                withPreview={ true }
                singleImage={ true }
                imgExtension={ ['.jpg', '.gif', '.png', '.jpeg'] }
                maxFileSize={ 10000000 }
                fileSizeError='file size is to big'
                fileTypeError='is not supported file extension'
                buttonText='Upload An Image'
                label='Max file size 10mb, accepted: jpg, png, gif'
                buttonStyles={{
                    'backgroundColor': 'whitesmoke', 
                    'color': 'black', 
                    'border': 'solid rgb(190, 190, 190) 1px', 
                    'borderRadius': '5px'
                }}
            />
            <textarea
                name='description'
                className='input post-description-textarea'
                value={ description }
                onChange={ handleChange }
                placeholder='Provide an image description (optional)'
                cols={ 50 }
                rows={ 3 } 
                maxLength={300}
            />
            <br/>
            <button className='post-submit-button button'>{ buttonText }</button>
        </form>
    );
};

export default FormComponent;

