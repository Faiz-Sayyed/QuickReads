import React from 'react'
import { useCollapse } from 'react-collapsed';
import './DisplayArea.css'

function CollapseCard(props) {
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
    return (
        <div className='article collapsible' key={props.article.url}>
            <div className='collapsed-article'>
                <div className='article-title'>
                    {props.article.url}
                </div>
                <div className="header expand-button" {...getToggleProps()}>
                    {isExpanded ? 'Collapse' : 'Expand'}
                </div>
            </div>

            <div {...getCollapseProps()}>
                <p className='article-timestamp'>
                    {
                        new Date(props.article.createdAt).toLocaleString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
                    }
                </p>
                <p className='article-content'>
                    {props.article.content}
                </p>
            </div>
        </div>
    )
}

const DisplayArea = ({ articles, activeArticle }) => {

    return (
        <div className='display-container'>
            {
                activeArticle &&
                <div className='active-article-container'>
                    <div className='active-article-title'>
                        Summary
                    </div>
                    <div className='article-content'>
                        <p>
                            {articles[0].content}
                        </p>
                    </div>
                </div>
            }

            <div className='display-title'>
                Previous Summaries
            </div>
            <div className='articles-container'>
                {
                    (articles.length) ?
                        articles.slice(activeArticle).map((article) => (
                            <CollapseCard key={article.createdAt} article={article} />
                        ))
                        :
                        <div className='no-articles'>
                            Oops, No articles to display!!!
                        </div>
                }
            </div>
        </div>
    )
}

export default DisplayArea