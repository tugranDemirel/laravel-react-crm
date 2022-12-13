import React from 'react'
import {inject, observer} from 'mobx-react'
import Layout from "../../Components/Layout/front.layout";
const Index = (props) => {
    props.AuthStore.getToken()

    return (
       <Layout>
           <div>BUrası İNdex </div>
       </Layout>
    )
}
export default inject("AuthStore")(observer(Index))
