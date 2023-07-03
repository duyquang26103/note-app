import React, {useEffect, useState} from "react";
import { FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import { bgImageLoader } from "../utils/imageUtils";


const UploadImage = (props) => {
    const { setBgImage } = props;
    const [currentImg, setCurrentImg] = useState([]);
    const [selectImg, setSelectImg] = useState('');

    const loader = async () => {
        const res = await bgImageLoader();
        setCurrentImg(res.bgImage);
    };

    useEffect(() => {
        loader();
    },[])

    const handleChange = async (e) => {
        setSelectImg(e.target.value);
        setBgImage(e.target.value);
    }

    return (

        <div style={{display: 'flex'}}>
            <FormControl fullWidth style={{justifyItems: 'right', width: '30vh'}}>
                <InputLabel id="demo-simple-select-label" sx={{paddingX: '8px', backgroundColor: '#1976d2', borderRadius: '8px', color: 'white'}}>BackGround</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectImg}
                    label="Age"
                    onChange={handleChange}
                >
                    {currentImg.map((url, index) => {
                        return (<MenuItem key={index} value={url}>{index}</MenuItem>)
                    })}
                </Select>
            </FormControl>
        </div>

    );
};

export default UploadImage;