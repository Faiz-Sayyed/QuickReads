import React, { useState, useEffect } from 'react';
import axios from 'axios';

import SearchArea from '../components/SearchArea/SearchArea';
import DisplayArea from '../components/DisplayArea/DisplayArea';

import './styles.css';

function Home() {
    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(false);
    const [articles, setArticles] = useState([]);
    const [activeArticle, setActiveArticle] = useState(false);
    const [link, setLink] = useState('');
    const [error, setError] = useState();

    const getArticles = (user) => {
        setError('');
        if (user) {
            const token = user.data.token;
            axios.get('http://localhost:5000/api/v1/articles', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then((response) => {
                    setArticles(response.data);
                })
                .catch((error) => {
                    if (!error.response) {
                        setError('Network Error');
                        return;
                    }
                    setError(error.response.data.error);
                })
        }
    }

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('user'));
        setUser(data);

        getArticles(data);
    }, []);

    const getSummary = () => {
        setError('');
        if (!link) {
            setError('Please enter a link');
            return;
        }

        setLoading(true)
        if (user) {
            const token = user.data.token;
            axios.post('http://localhost:5000/api/v1/summary', {
                link: link,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(async (response) => {
                    getArticles(user);
                    setLoading(false);
                    setActiveArticle(true);
                })
                .catch((error) => {
                    setLoading(false);
                    if (!error.response) {
                        setError('Network Error');
                        return;
                    }
                    setError(error.response.data.error);
                });
        }
    }

    return (
        <div>
            {
                user ?
                    <div>
                        <SearchArea setLink={setLink} getSummary={getSummary} />
                        {
                            loading ?
                                <div className="loading-text">Loading</div>
                                :
                                <div>
                                    {
                                        error ?
                                            <div className="error-text">
                                                {error}
                                            </div>
                                            :
                                            <DisplayArea articles={articles} activeArticle={activeArticle} />
                                    }
                                </div>
                        }
                    </div>
                    :
                    <div className="login-note">Please Login In or Sign Up</div>
            }
        </div>
    );
}

export default Home;