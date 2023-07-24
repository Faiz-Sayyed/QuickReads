import React from 'react'
import { Link } from 'react-router-dom';

import './Navbar.css'

const Navbar = ({ user, setUser }) => {
    const logout = () => {
        localStorage.removeItem('user');
        setUser('');
        window.location.reload();
    }

    return (
        <div className='navbar'>
            <div className='navbar-left'>
                <Link to="/">
                    QuickReads
                </Link>
            </div>
            <div className='navbar-right'>
                {
                    user ?
                        <div className='navbar-right-logged-in'>
                            <div className='username'>
                                {user.data.email[0].toUpperCase()}
                            </div>
                            <div onClick={logout} className='logout-button'>
                                Logout
                            </div>
                        </div>
                        :
                        <div className='navbar-right-logged-out'>
                            <div>
                                <Link to="/login" className='login-button'>
                                    Login
                                </Link>
                            </div>
                            <div>
                                <Link to="/register" className='register-button'>
                                    Sign Up
                                </Link>
                            </div>
                        </div>
                }
                <div className='github-button'>
                    <Link to="https://github.com/Faiz-Sayyed/QuickReads" target="_blank">
                        Github
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar