import React from 'react'
import {inject, observer} from 'mobx-react'
const Index = (props) => {
    props.AuthStore.getToken()
    const logout = () => {
        props.AuthStore.removeToken()
        props.history.push('/login')
    }
    return (
        <div>BUrası İNdex <button onClick={logout}>Çıkış</button></div>
    )
}
export default inject("AuthStore")(observer(Index))
