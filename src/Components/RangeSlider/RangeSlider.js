import React from "react";

import "./RangeSlider.scss";

function RangeSlider({ name, min, max, onChange, slider }) {
    return (
        <div className="rangeslider">
            <div className="d-flex justify-content-between">
                <span>{name}</span>
                <span>{slider}</span>
            </div>
            <div className="slidecontainer">
                <input
                    type="range"
                    min={min}
                    max={max}
                    defaultValue={slider}
                    className="slider"
                    id="myRange"
                    onChange={onChange}
                />
            </div>
        </div>
    );
}

export default RangeSlider;
