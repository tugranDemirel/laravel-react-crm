import React, {useEffect, useState} from 'react'
import {inject, observer} from 'mobx-react'
import Layout from "../../Components/Layout/front.layout";
import SubHeaderComponent from "../../Components/Form/SubHeaderComponent";
import ExpandedComponent from "../../Components/Form/ExpandedComponent";
import axios from "axios";
import DataTable from 'react-data-table-component'
import swal from 'sweetalert';
const Index = (props) => {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState({
        filteredData: [],
        text: '',
        isFilter: false
    });

    const [refresh, setRefresh] = useState(false)

    useEffect(async () => {
        await axios.get(`/api/category`,  {
            headers: {
                Authorization: 'Bearer ' + props.AuthStore.appState.user.access_token
            }
        }).then((res) => {
            setData(res.data.data)
        }).catch(e => {
            console.log(e)
        })
    }, [refresh])

    const filterItem = e => {
        const filterText = e.target.value
        if(filterText !== ''){
            const filteredItems = data.filter((item) => (
                item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
            ))

            setFilter({
                filteredData: filteredItems,
                text: filterText,
                isFilter: true
            })
        }else{
            setFilter({
                filteredData: [],
                text: '',
                isFilter: false
            })
        }
    }
    const deleteItem = (item) => {
        swal({
            title: "Emin misiniz?",
            text: "Silmek istediğinize emin misiniz?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete){
                    axios.delete(`/api/category/${item.id}`, {
                        headers: {
                            Authorization: 'Bearer ' + props.AuthStore.appState.user.access_token
                        }
                    })
                        .then((res) => {
                            if(res.data.success){
                                swal(res.data.message)
                                setRefresh(true)
                            }
                            else
                                swal(res.data.message)
                        })
                        .catch((e) => {
                            console.log(e)
                        })
                }
            })
            .catch((e) => {
                console.log(e)
            })
    }

    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <DataTable
                            columns={[
                                {
                                    name: 'kategori Adı',
                                    selector: 'name',
                                    sortable: true,
                                },
                                {
                                    name: 'Düzenle',
                                    cell:(item) => <button className="btn btn-primary" onClick={() => props.history.push(({
                                        pathname: `/kategori/${item.id}/duzenle`,
                                    }))}>Düzenle</button>,
                                    button: true,
                                },
                                {
                                    name: 'Sil',
                                    cell:(item) => <button onClick={() => deleteItem(item)} className="btn btn-danger" >Sil</button>,
                                    button: true,
                                }
                            ]}
                            subHeader={true}
                            responsive={true}
                            hover={true}
                            fixedHeader={true}
                            pagination={true}
                            data={(filter.isFilter) ? filter.filteredData : data}
                            subHeaderComponent={<SubHeaderComponent
                                filters={filterItem}
                                action={{
                                    class: 'btn btn-success btn-sm mr-1',
                                    uri: () => props.history.push('/kategori/ekle'),
                                    title:'Yeni kategori Ekle'}}
                            />}
                        />
                    </div>
                </div>
            </div>
        </Layout>
    )
}
export default inject("AuthStore")(observer(Index))
