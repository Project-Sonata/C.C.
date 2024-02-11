import * as React from 'react';
import {Slider} from "@mui/material";
import "./SonataSlider.css"

interface Props {
    value: number,
    onChange?: (event: Event, value: number | number[], activeThumb: number) => void;
    onChangeCommitted?: (event: React.SyntheticEvent | Event, value: number | number[]) => void;
}

export const SonataSlider = ({onChange, value, onChangeCommitted}: Props) => {
    return (
            <Slider min={0}
                    max={100}
                    className="slider"
                    value={value}
                    onChange={onChange}
                    onChangeCommitted={onChangeCommitted}/>
    );
};