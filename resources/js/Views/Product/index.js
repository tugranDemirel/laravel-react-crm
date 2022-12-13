import React, {useEffect} from 'react'
import {inject, observer} from 'mobx-react'
import Layout from "../../Components/Layout/front.layout";
import axios from "axios";
const Index = (props) => {
    useEffect(async () => {
        await axios.get(`/api/product`,  {
            headers: {
                Authorization: 'Bearer ' + props.AuthStore.appState.user.access_token
            }
        }).then((res) => {
            console.log(res)
        }).catch(e => {
            console.log(e)
        })
    }, [])
    return (
        <Layout>
            <button onClick={() => props.history.push('/urunler/ekle')}>Yeni Ürün Ekle</button>
            <div>BUrası URUNLER INDEX </div>
        </Layout>
    )
}
export default inject("AuthStore")(observer(Index))
