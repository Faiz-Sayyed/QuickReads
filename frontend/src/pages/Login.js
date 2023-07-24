import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import './styles.css'

const Login = ({ user, setUser }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()

        setError(null);
        setLoading(true)
        axios.post('https://quickreads.onrender.com/api/v1/auth/login', {
            email,
            password
        })
            .then((response) => {
                localStorage.setItem('user', JSON.stringify(response));
                setUser(JSON.parse(localStorage.getItem('user')));
                setLoading(false);
                navigate('/');
            })
            .catch((error) => {
                setLoading(false);
                if (!error.response) {
                    setError('Network Error');
                    return;
                }
                setError(error.response.data.error);
            })
    }

    return (
        <div>
            {
                loading ?
                    <div className="loading-text">
                        Loading
                    </div>
                    :
                    <div className='form-container'>
                        <form className='form' onSubmit={handleSubmit}>
                            <div className='form-title'>
                                Log In
                            </div>

                            <label className='label'>
                                Email address:
                            </label>
                            <input
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                className='form-input'
                            />

                            <label className='label'>
                                Password:
                            </label>
                            <input
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                className='form-input'
                            />


                            <button disabled={loading} className='form-submit'>
                                Login
                            </button>
                            {
                                error &&
                                <div className='error'>
                                    {error}
                                </div>
                            }
                        </form>
                    </div>
            }
        </div>
    )
}

export default Login;