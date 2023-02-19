import React from "react";

import "./RangeSlider.scss";

function RangeSlider({ name, setBlending, blending }) {
    const onChange = (e) => {
        if (name === "Left") setBlending([e.target.value, blending[1]]);
        else setBlending([blending[0], e.target.value]);
    };

    return (
        <div className="rangeslider">
            <div className="d-flex justify-content-between">
                <span>{name}</span>
                <span>{name === "Left" ? blending[0] : blending[1]}</span>
            </div>
            <div className="slidecontainer">
                <input
                    type="range"
                    min="0"
                    max="100"
                    defaultValue={name === "Left" ? blending[0] : blending[1]}
                    className="slider"
                    id="myRange"
                    onChange={onChange}
                />
            </div>
        </div>
    );
}

export default RangeSlider;
