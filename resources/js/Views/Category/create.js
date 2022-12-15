
import React, {useEffect, useState} from 'react'
import {inject, observer} from 'mobx-react'
import Layout from "../../Components/Layout/front.layout";
import {Formik} from "formik";
import * as Yup from "yup";
import CustomInput from "../../Components/Form/CustomInput";
import Select from 'react-select'
import axios from "axios";
import ImageUploader from 'react-images-upload';
import { CKEditor } from 'ckeditor4-react';
import swal from 'sweetalert';


const Create = (props) => {

    // verileri gönderme işlemi
    const handleSubmit = (values, {resetForm}) => {
        const data = new FormData()

        data.append('name', values.name)

        const config = {
            headers: {
                'Accept': 'application/json',
                'content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + props.AuthStore.appState.user.access_token
            }
        }
        axios.post(`/api/category`, data, config)
            .then((res) => {
                if (res.data.success){
                    resetForm()
                    swal("Başarılı")
                }else {
                    swal(res.data.message);
                }
            }).catch((e) => {
            console.log(e)
        })
    }

    return (
        <Layout>
            <div className="mt-5">
                <div className="container">
                    <Formik initialValues={{
                        name: ''
                    }}
                            onSubmit={handleSubmit}
                            validationSchema={
                                Yup.object().shape({
                                    name: Yup.string().required('Kategori adı zorunludur'),
                                })
                            }>
                        {({
                              values,
                              handleChange,
                              handleSubmit,
                              handleBlur,
                              errors,
                              isValid,
                              isSubmitting,
                              setFieldValue,
                              touched
                          }) => (
                            <div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <CustomInput
                                            title='Kategori Adı'
                                            value={values.name}
                                            handleChange={handleChange('name')}
                                        />
                                        {errors.name && touched.name &&<p className="form-error">{errors.name}</p>}
                                    </div>
                                </div>
                                <button
                                    disabled={!isValid || isSubmitting}
                                    className="btn btn-lg btn-primary btn-block"
                                    type="button"
                                    onClick={handleSubmit}
                                    onBlur={handleBlur}
                                >Kategori Ekle
                                </button>
                            </div>
                        )}

                    </Formik>
                </div>
            </div>
        </Layout>
    )
}
export default inject("AuthStore")(observer(Create))
