import React, { useState } from 'react';
import ImageUploader from 'react-images-upload';

const ImgUploader = () => {
    const [pictures, setPictures] = useState([])

    const onDrop = (picture) => {
        setPictures(pictures).concat(picture)
    }

    return (
        <ImageUploader 
            withIcon={ true }
            buttonText='Choose images'
            withPreview={ true }
            onChange={ onDrop }
            imgExtension={ ['.jpg', '.gif', '.png' ] }
            maxFileSize={ 5242880}
            fileSizeError='file size is to big'
            fileTypeError='is not supported file extension'
        />
    );
}

export default ImgUploader;
