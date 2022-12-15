import React from "react";
const ExpandedComponent = ({ data }) => {
    return (
        <div dangerouslySetInnerHTML={{ __html: data.text }}></div>
    )
}
export default ExpandedComponent
