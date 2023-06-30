import React from "react";
import {Button} from "@mui/material";

const UploadImage = (props) => {
    const { setBgImage } = props;

    const handleUploadFile = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setBgImage(base64);
    }

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    return (
            <div>
                <input
                    accept="image/*"
                    className='upload-img'
                    style={{ display: 'none' }}
                    id="raised-button-file"
                    multiple
                    type="file"
                    onChange={handleUploadFile}
                />
                <label htmlFor="raised-button-file">
                    <Button sx={{ backgroundColor: '#9a9de0de'}} variant="raised" component="span" className='upload-img'>
                        Change your Background
                    </Button>
                </label>
            </div>
    );
};

export default UploadImage;