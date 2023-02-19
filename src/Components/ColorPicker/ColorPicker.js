import React, { useState } from "react";

import "./ColorPicker.scss";

function ColorPicker({ onClick }) {
    const [all_colors] = useState([
        "#E15755",
        "#1E102D",
        "#ffffff",
        "#1b1b1b",
        "#141414",
        "#000000",
    ]);

    return (
        <div className="colorpicker">
            <div className="d-flex">
                {all_colors.map((color, i) => (
                    <div
                        key={i}
                        onClick={() => onClick(color)}
                        className="color-box"
                        style={{
                            backgroundColor: `${color}`,
                        }}
                    ></div>
                ))}
            </div>
        </div>
    );
}

export default ColorPicker;
