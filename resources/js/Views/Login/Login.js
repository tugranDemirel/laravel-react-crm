import React from 'react'
import {Link} from 'react-router-dom'
const Login = () => {
    return (
        <div style={{ width: '100%', height:'100vh'}} className="d-flex align-items-center justify-content-center">
            <form className="form-signin">
                <img className="mb-4" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72"/>
                    <h1 className="h3 mb-3 font-weight-normal">Lütfen Giriş Yapınız</h1>
                <div className="form-group">
                    <label htmlFor="inputEmail" className="sr-only">Email</label>
                    <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required="" autoFocus="" />
                </div>
                <div className="form-group">
                    <label htmlFor="inputPassword" className="sr-only">Şifre</label>
                    <input type="password" id="inputPassword" className="form-control" placeholder="Password" required="" />
                </div>
                <div className="checkbox mb-3">
                    <label>
                        <input type="checkbox" value="remember-me"/> Beni hatırla
                    </label>
                </div>
                <button className="btn btn-lg btn-primary btn-block" type="submit">Giriş Yap</button>
                <Link className="mt-3" style={{display: 'block'}} to="/register">Kayıt Ol</Link>
                            <p className="mt-5 mb-3 text-muted">© 2017-2018</p>
            </form>
        </div>
    )
}
export default Login
