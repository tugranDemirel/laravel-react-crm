import React from 'react'
import {inject, observer} from 'mobx-react'
const Index = (props) => {
    props.AuthStore.getToken()
    return (
        <div>BUrası İNdex</div>
    )
}
export default inject("AuthStore")(observer(Index))
