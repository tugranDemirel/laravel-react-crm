import React from "react";
const CustomInput = ({title, classname = "form-control", type='text', placeholder='', value, handleChange}) => {
    return (
        <div className="form-group">
            <label htmlFor="inputEmail">{title}</label>
            <input
                type={type}
                className={classname}
                name="name"
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
            />
        </div>
    )
}
export default CustomInput
