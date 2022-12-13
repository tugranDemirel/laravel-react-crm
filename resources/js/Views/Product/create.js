import React from 'react'
import {inject, observer} from 'mobx-react'
import Layout from "../../Components/Layout/front.layout";
const Create = (props) => {

    return (
        <Layout>
            <div>BUrası URUNLER create </div>
        </Layout>
    )
}
export default inject("AuthStore")(observer(Create))
