import React from 'react';
const SubHeaderComponent = ({action, filters}) => {
    return (
        <div style={{display:'flex'}}>
            <button
                className={action.class}
                onClick={action.uri}
            >
                {action.title}
            </button>
            <input
                placeholder={'ara'}
                onChange={filters}
                style={{flex:1}}
                type={'text'}
                className={'form-control'}
            />
        </div>
    )
}
export default SubHeaderComponent
