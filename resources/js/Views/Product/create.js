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
    const [categories, setCategories] = useState([])
    const [images, setImages] = useState([])
    const [property, setProperty] = useState([])

    // verileri gönderme işlemi
    const handleSubmit = (values, {resetForm, setSubmitting}) => {
        const data = new FormData()
        images.forEach((image_file) => {
            data.append('file[]', image_file)
        })
        data.append('categoryId', values.categoryId)
        data.append('name', values.name)
        data.append('modelCode', values.modelCode)
        data.append('barcode', values.barcode)
        data.append('brand', values.brand)
        data.append('stock', values.stock)
        data.append('tax', values.tax)
        data.append('buyingPrice', values.buyingPrice)
        data.append('sellingPrice', values.sellingPrice)
        data.append('text', values.text)
        // yeni özellikleri json formatına değişip kayıt etme
        data.append('property', JSON.stringify(property))

        const config = {
            headers: {
                'Accept': 'application/json',
                'content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + props.AuthStore.appState.user.access_token
            }
        }
        axios.post(`/api/product`, data, config)
            .then((res) => {
                if (res.data.success){
                    resetForm()
                    setImages([])
                    setProperty([])
                    swal("Başarılı", res.data.message, "success")
                    setSubmitting(false)
                }else {
                    swal("Hata!", res.data.message, "error");
                    setSubmitting(false)
                }
            }).catch((e) => {
                console.log(e)
            })
    }
    // yeni ürün özelliği ekleme
    const newProperty = () => {
        setProperty([...property, {name: '', value: ''}])
    }
    // yeni eklenen özelliği kaldırma
    const removeProperty = (index) => {
        const oldProperty =[...property];
        // gelen index numarasından 1 sonraki özelliği sil
        oldProperty.splice(index, 1)
        setProperty([...oldProperty])
    }
    // yeni eklenen özelliğin değerini değiştirme
    const changeTextInput = (e, index) => {
        property[index][e.target.name] = e.target.value
        setProperty([...property])
    }
    useEffect(async () => {
        await axios.get(`/api/product/create`,  {
            headers: {
                Authorization: 'Bearer ' + props.AuthStore.appState.user.access_token
            }
        }).then((res) => {
            setCategories(res.data.categories)
        }).catch(e => {
            console.log(e)
        })
    }, [images])
    return (
        <Layout>
            <div className="mt-5">
            <div className="container">
            <Formik initialValues={{
                categoryId: '',
                name: '',
                modelCode:'',
                barcode:'',
                brand: '',
                stock: '',
                tax:'',
                buyingPrice: '',
                sellingPrice: '',
                text: ''

            }}
                    onSubmit={handleSubmit}
                    validationSchema={
                        Yup.object().shape({
                            categoryId: Yup.number().required('Kategori seçimi zorunludur'),
                            name: Yup.string().required('Ürün adı zorunludur'),
                            modelCode: Yup.string().required('Model kodu zorunludur'),
                            barcode: Yup.string().required('Barkod zorunludur'),
                            brand: Yup.string().required('Marka zorunludur'),
                            stock: Yup.number().required('Stok zorunludur'),
                            tax: Yup.number().required('KDV zorunludur'),
                            buyingPrice: Yup.number().required('Alış fiyatı zorunludur'),
                            sellingPrice: Yup.number().required('Satış fiyatı zorunludur'),
                            text: Yup.string().required('Ürün açıklaması zorunludur'),
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
                      setSubmitting,
                      setFieldValue,
                      touched
                  }) => (
                    <div>
                        <div className="row">
                            <div className="col-md-12">
                                <ImageUploader
                                    withIcon={true}
                                    buttonText='Resim seçiniz'
                                    onChange={(picturesFiles) => {setImages(images.concat(picturesFiles)) }}
                                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                    maxFileSize={5242880}
                                    withPreview={true}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <Select
                                        onChange={(e) => setFieldValue('categoryId', e.id)}
                                        placeholder='Ürün Kategorisi Seçiniz'
                                        options={categories}
                                        getOptionLabel={option => option.name}
                                        getOptionValue={option => option.id}
                                    />
                                    {errors.categoryId && touched.categoryId &&<p className="form-error">{errors.categoryId}</p>}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <CustomInput
                                    title='Ürün Adı'
                                    value={values.name}
                                    handleChange={handleChange('name')}
                                />
                                {errors.name && touched.name &&<p className="form-error">{errors.name}</p>}
                            </div>
                            <div className="col-md-6">
                                <CustomInput
                                    title='Ürün Model Kodu'
                                    value={values.modelCode}
                                    handleChange={handleChange('modelCode')}
                                />
                                {errors.modelCode && touched.modelCode &&<p className="form-error">{errors.modelCode}</p>}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <CustomInput
                                    title='Barkod'
                                    value={values.barcode}
                                    handleChange={handleChange('barcode')}
                                />
                                {errors.barcode && touched.barcode &&<p className="form-error">{errors.barcode}</p>}
                            </div>
                            <div className="col-md-6">
                                <CustomInput
                                    title='Marka'
                                    value={values.brand}
                                    handleChange={handleChange('brand')}
                                />
                                {errors.brand && touched.brand &&<p className="form-error">{errors.brand}</p>}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <CustomInput
                                    title='Stok'
                                    value={values.stock}
                                    handleChange={handleChange('stock')}
                                    type='number'
                                />
                                {errors.stock && touched.stock &&<p className="form-error">{errors.stock}</p>}
                            </div>
                            <div className="col-md-6">
                                <CustomInput
                                    title='KDV'
                                    type="number"
                                    value={values.tax}
                                    handleChange={handleChange('tax')}
                                />
                                {errors.tax && touched.tax &&<p className="form-error">{errors.tax}</p>}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <CustomInput
                                    title='Alış Fiyatı'
                                    value={values.buyingPrice}
                                    handleChange={handleChange('buyingPrice')}
                                    type='number'
                                />
                                {errors.buyingPrice && touched.buyingPrice &&<p className="form-error">{errors.buyingPrice}</p>}
                            </div>
                            <div className="col-md-6">
                                <CustomInput
                                    type="number"
                                    title='Satış Fiyatı'
                                    value={values.sellingPrice}
                                    handleChange={handleChange('sellingPrice')}
                                />
                                {errors.sellingPrice && touched.sellingPrice &&<p className="form-error">{errors.sellingPrice}</p>}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <CKEditor
                                    data={values.text}
                                    onChange={(e) => {
                                        const data = e.editor.getData();
                                        setFieldValue('text', data)
                                    }}
                                />
                                {errors.text && touched.text &&<p className="form-error">{errors.text}</p>}
                            </div>
                        </div>
                        <div className="row mb-3 mt-3">
                            <div className="col-md-12">
                                <button type="button" onClick={newProperty} className="btn btn-primary">Yeni Özellik</button>
                            </div>
                        </div>
                        {
                            property.map((item, index) => (
                                <div className="row mb-2" key={index}>
                                    <div className="col-md-5" >
                                        <label>Özellik Adı: </label>
                                        <input
                                            name="property"
                                            type="text"
                                            className="form-control"
                                            onChange={(e) => changeTextInput(e, index)}
                                            value={item.property}
                                        />
                                    </div>
                                    <div className="col-md-5" >
                                        <label>Özellik Değeri: </label>
                                        <input
                                            name="value"
                                            type="text"
                                            className="form-control"
                                            onChange={(e) => changeTextInput(e, index)}
                                            value={item.value}
                                        />
                                    </div>
                                    <div className="col-md-1"
                                         style={{display:'flex', justifyContent:'center', alignItems:'flex-end'}} >
                                        <button
                                            onClick={() => removeProperty(index)}
                                            className="btn btn-danger"
                                            type="button"
                                        >X</button>
                                    </div>
                                </div>
                            ))
                        }
                        <button
                            disabled={!isValid || isSubmitting}
                            className="btn btn-lg btn-primary btn-block"
                            type="button"
                            onClick={handleSubmit}
                            onBlur={handleBlur}
                        >Ürünü Ekle
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
