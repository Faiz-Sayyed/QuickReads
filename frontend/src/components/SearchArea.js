import React from "react";

const SearchArea = ({ setLink, getSummary }) => {
  return (
    <div className="flex flex-col justify-center items-center pb-8 bg-blue-600 text-white">
      <div className="text-5xl my-10">QuickReads</div>
      <p className="text-2xl mb-3">Paste the link to summarize the article</p>
      <div className="flex flex-col justify-center items-center w-full">
        <input
          type="text"
          onChange={(e) => setLink(e.target.value)}
          className="input-tex w-1/2 h-10 px-3 rounded-lg border-none focus:outline-none text-black"
        />
        <button
          type="submit"
          className="bg-blue-400 w-1/5 h-10 my-5 text-xl rounded-lg mx-1 py-1 px-3 cursor-pointer hover:bg-blue-500"
          onClick={getSummary}
        >
          Summarize!!!
        </button>
      </div>
    </div>
  );
};

export default SearchArea;
