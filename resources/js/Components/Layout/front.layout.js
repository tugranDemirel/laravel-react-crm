import React, { useState, useEffect } from "react";
import axios from "axios";
import {inject, observer} from 'mobx-react'
import {useHistory} from "react-router-dom";
import {
    NavDropdown,
    Container,
    Nav,
    Navbar} from 'react-bootstrap';
const Layout = (props) => {
    props.AuthStore.getToken();
    const history = useHistory()

    const [user, setUser] =useState({})
    const [isLoggedIn, setIsLoggedIn] =useState(false)
    useEffect(async () => {
        const token = (props.AuthStore.appState !== null) ? props.AuthStore.appState.user.access_token : null
        await axios.post(`/api/authenticate`, {}, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then((res) => {
            if(!res.data.isLoggedIn){
                history.push('/login')
            }
            setUser(res.data.user)
            setIsLoggedIn(res.data.isLoggedIn)
        }).catch(e => {
            history.push('/login')
        })
    }, [])
    const logout = () => {
         axios.post(`/api/logout`, {}, {
            headers: {
                Authorization: 'Bearer ' + props.AuthStore.appState.user.access_token
            }
        }).then((res) => {
             console.log(res)
        }).catch(e => {console.log(e)})
        props.AuthStore.removeToken()
        history.push('/login')
    }
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container >
                    <Navbar.Brand href="#">tStock</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link href="/">Yönetim Paneli</Nav.Link>
                            <Nav.Link href="/kategoriler">Kategoriler</Nav.Link>
                            <Nav.Link href="/urunler">Ürünler</Nav.Link>

                            <Nav.Link href="#" disabled>
                                Link
                            </Nav.Link>
                        </Nav>
                            <NavDropdown title={user.name} id="navbarScrollingDropdown">
                                <NavDropdown.Item href="#action3">Profil Düzenle</NavDropdown.Item>
                                <NavDropdown.Item href="#action4">
                                    Şifre Değiştir
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={logout} >Çıkış</NavDropdown.Item>
                            </NavDropdown>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div>{props.children}</div>
        </>
    )
}

export default inject("AuthStore")(observer(Layout))
