import React from "react";
import { useCollapse } from "react-collapsed";

function CollapseCard(props) {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
  return (
    <div
      className="collapsible mb-5 p-3 px-5 w-4/5 bg-yellow-200 rounded-xl"
      key={props.article.url}
    >
      <div className="collapsed-article flex justify-center items-center my-1">
        <div className="w-11/12 break-words p-3 text-lg rounded-xl bg-yellow-100">
          {props.article.url}
        </div>
        <div
          className="header ml-3 p-1 pl-3 rounded-lg bg-yellow-200 hover:font-semibold"
          {...getToggleProps()}
        >
          {isExpanded ? "Collapse" : "Expand"}
        </div>
      </div>

      <div {...getCollapseProps()}>
        <p className="flex justify-end w-full pr-3 py-3">
          {new Date(props.article.createdAt).toLocaleString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
        <p className="p-3 mb-3 bg-yellow-100 rounded-xl whitespace-pre-wrap">
          {props.article.content}
        </p>
      </div>
    </div>
  );
}

const DisplayArea = ({ articles, activeArticle }) => {
  return (
    <div className="flex flex-col justify-center items-center pt-3 bg-gray-200">
      {activeArticle && (
        <div className="flex flex-col justify-center items-center m-20 mt-10 bg-yellow-200 rounded-xl">
          <div className="mt-5 text-3xl">Summary</div>
          <div className="p-5 px-10 whitespace-pre-wrap">
            <p>{articles[0].content}</p>
          </div>
        </div>
      )}

      <div className="text-3xl mt-10">Previous Summaries</div>
      <div className="flex flex-col justify-center items-center mt-10 w-full">
        {articles.length ? (
          articles
            .slice(activeArticle)
            .map((article) => (
              <CollapseCard key={article.createdAt} article={article} />
            ))
        ) : (
          <div className="flex justify-center w-1/2 p-3 mt-3 text-2xl bg-red-500 border border-black rounded-lg text-white">
            No articles to display!!!
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayArea;
