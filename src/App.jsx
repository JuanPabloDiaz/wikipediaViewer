// App.js
import { useState } from "react";
import axios from "axios";
import Layout from "./Components/Layout";
import { FiSearch } from "react-icons/fi";
import { FaRandom } from "react-icons/fa";
import PropTypes from "prop-types";

function SearchBox({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  SearchBox.propTypes = {
    onSearch: PropTypes.func.isRequired,
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={searchTerm}
        placeholder="Search Wikipedia..."
        onChange={(event) => setSearchTerm(event.target.value)}
        className="rounded border border-gray-400 px-4 py-2 focus:border-blue-500 focus:outline-none"
      />
      <button
        type="submit"
        className="flex items-center justify-center gap-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      >
        Search
        <FiSearch className="h-4 w-4" />
      </button>
    </form>
  );
}

function Results({ results }) {
  return (
    <section className="p-2">
      {results.map((result) => (
        <div key={result.pageid}>
          <a href={`https://en.wikipedia.org/?curid=${result.pageid}`}>
            {result.title}
          </a>
          <p>{result.snippet}</p>
        </div>
      ))}
    </section>
  );
}
Results.propTypes = {
  results: PropTypes.arrayOf(
    PropTypes.shape({
      pageid: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      snippet: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

function RandomButton() {
  const handleClick = () => {
    window.open("https://en.wikipedia.org/wiki/Special:Random");
  };

  return (
    <button
      onClick={handleClick}
      className="flex w-80 items-center justify-center gap-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
    >
      Random Article
      <FaRandom className="h-4 w-4" />
    </button>
  );
}

function App() {
  const [results, setResults] = useState([]);

  const handleSearch = (searchTerm) => {
    axios
      .get(
        `https://en.wikipedia.org/w/api.php?origin=*&action=query&list=search&srsearch=${searchTerm}&utf8=&format=json`,
      )
      .then((response) => {
        setResults(response.data.query.search);
      });
  };

  return (
    <>
      <Layout>
        <div className="flex h-60 w-6/12 items-center justify-around gap-2 rounded-xl border bg-slate-600 sm:gap-3 md:gap-4 lg:gap-6">
          <div className="App flex flex-col items-center">
            <div className="pb-4">
              <h1 className="text-3xl font-extrabold text-[#FFD23F] sm:text-3xl md:text-4xl lg:text-5xl">
                Wikipedia Viewer
              </h1>
            </div>
            <SearchBox onSearch={handleSearch} />
            <Results results={results} />
            <RandomButton />
          </div>
        </div>
      </Layout>
    </>
  );
}

export default App;
