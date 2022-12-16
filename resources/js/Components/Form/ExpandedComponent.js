import React from "react";
const ExpandedComponent = ({ data, field = 'text' }) => {
    return (
        <div dangerouslySetInnerHTML={{ __html: data[field] }}></div>
    )
}
export default ExpandedComponent
