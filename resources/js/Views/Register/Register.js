import React, {useState} from 'react'
import {Link} from "react-router-dom";
import {Formik} from "formik";
import * as Yup from 'Yup'
import axios from 'axios'
import {inject, observer} from 'mobx-react'
const Register = (props) => {
    const [errors, setErrors] = useState([])
    const [error, setError] = useState('')

    const handleSubmit = async (values) => {
        await axios.post(`api/auth/register`, {...values})
            .then((res) => {

                if (res.data.success){
                    const userData = {
                        id: res.data.id,
                        name: res.data.name,
                        email: res.data.email,
                        access_token: res.data.access_token,

                    }

                    const appState = {
                        isLoggedIn: true,
                        user: userData
                    }
                    props.AuthStore.saveToken(appState)
                    props.history.push('/')
                }else{
                    alert('Giriş yapılmadı')
                }

            })
            .catch(err => {
                if (err.response){
                    let error = err.response.data
                    setErrors(error.errors)
                }
                else if(err.request){
                    let error = err.request.data
                    setError(error)
                }else{
                    setError(err.message)
                }
            })
    }
    let arr = []
    Object.values(errors).forEach(value => {
        arr.push(value)
    })
    return (
        (
            <div style={{ width: '100%', height:'100vh'}} className="d-flex align-items-center justify-content-center">
                <div className="form-signin">
                    <img className="mb-4" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72"/>
                    <h1 className="h3 mb-3 font-weight-normal">Lütfen Kayıt Olunuz</h1>
                    {arr.length != 0 && arr.map((index, item) => (<p key={index}>{item}</p>))}
                    {error.length != 0 && (<p>{error}</p>)}
                    <Formik initialValues={{
                        name: '',
                        email: '',
                        password: '',
                        password_confirmation: ''
                    }}
                    onSubmit={handleSubmit}
                    validationSchema={
                        Yup.object().shape({
                            email: Yup.string().email('Email Formatı Zorunlu').required('Email alanı zorunludur'),
                            name:Yup.string().required('Ad Soyad alanı zorunludur'),
                            password:Yup.string().required('Şifre alanı zorunludur'),
                            password_confirmation:Yup.string().oneOf([Yup.ref('password'), null], 'Şifreler eşleşmiyor').required('Şifre alanı zorunludur'),
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
                            touched
                        }) => (
                            <div>
                                <div className="form-group">
                                    <label htmlFor="inputEmail" className="sr-only">Ad Soyad</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        placeholder="Ad Soyad"
                                        required=""
                                        value={values.name}
                                        onChange={handleChange('name')}
                                        onBlur={handleBlur}
                                    />
                                    {errors.name && touched.name &&<p>{errors.name}</p>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputEmail" className="sr-only">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        placeholder="Email address"
                                        required=""
                                        value={values.email}
                                        onChange={handleChange('email')}
                                        onBlur={handleBlur}
                                    />
                                    {errors.email && touched.email &&<p>{errors.email}</p>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputPassword" className="sr-only">Şifre</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        placeholder="Şifre"
                                        required=""
                                        value={values.password}
                                        onChange={handleChange('password')}
                                        onBlur={handleBlur}
                                    />
                                    {errors.password && touched.password &&<p>{errors.password}</p>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputPassword" className="sr-only">Şifre Tekrarı</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password_confirmation"
                                        placeholder="Şifre Tekrarı"
                                        required=""
                                        value={values.password_confirmation}
                                        onChange={handleChange('password_confirmation')}
                                        onBlur={handleBlur}
                                    />
                                    {errors.password_confirmation && touched.password_confirmation &&<p className=" ">{errors.password_confirmation}</p>}
                                </div>
                                <button
                                    disabled={!isValid || isSubmitting}
                                    className="btn btn-lg btn-primary btn-block"
                                    type="button"
                                    onClick={handleSubmit}
                                    onBlur={handleBlur}
                                >Kayıt Ol
                                </button>
                            </div>
                        )}

                    </Formik>
                    <Link className="mt-3" style={{display: 'block'}} to="/login">Giriş Yap</Link>
                    <p className="mt-5 mb-3 text-muted">© 2017-2018</p>
                </div>
            </div>
        )
    )
}
export default inject("AuthStore")(observer(Register))
