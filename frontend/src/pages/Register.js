import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import './styles.css';

const Register = ({ user, setUser }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        axios.post('https://quickreads.onrender.com/v1/auth/register', {
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
                                Sign Up
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
                                Sign Up
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

export default Register;