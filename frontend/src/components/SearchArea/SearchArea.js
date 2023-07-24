import React from 'react'
import './SearchArea.css'

const SearchArea = ({ setLink, getSummary }) => {
    return (
        <div className='search-container'>
            <div className='title'>
                QuickReads
            </div>
            <p className='info'>Paste the link to summarize the article</p>
            <div className='input-area'>
                <input type='text' onChange={(e) => setLink(e.target.value)} className='input-text' />
                <button type='submit' className='link-submit' onClick={getSummary}>
                    Summarize!!!
                </button>
            </div>
        </div>
    )
}

export default SearchArea