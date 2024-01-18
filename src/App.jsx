// App.js
import { useState } from "react";
import axios from "axios";
import Layout from "./Components/Layout";

function SearchBox({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
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
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  );
}

function Results({ results }) {
  return (
    <ul>
      {results.map((result) => (
        <li key={result.pageid}>
          <a href={`https://en.wikipedia.org/?curid=${result.pageid}`}>
            {result.title}
          </a>
          <p>{result.snippet}</p>
        </li>
      ))}
    </ul>
  );
}

function RandomButton() {
  const handleClick = () => {
    window.open("https://en.wikipedia.org/wiki/Special:Random");
  };

  return (
    <button
      onClick={handleClick}
      className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
    >
      Random Article
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
        <div className="rounded-lg bg-black p-4">
          <h1 className="text-3xl font-extrabold text-[#FFD23F] sm:text-3xl md:text-4xl lg:text-5xl">
            Wikipedia Viewer
          </h1>
        </div>
        <div className="flex w-6/12 items-center justify-around gap-2 sm:gap-3 md:gap-4 lg:gap-6">
          <div className="App">
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
