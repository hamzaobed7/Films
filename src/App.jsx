import "./index.css";
import hero_logo from "../public/hero.png";
import Search from "./Search";
import { useState, useEffect } from "react";

// import search from "../public/Search.svg";
import MovieCard from "./MovieCard";
const API = "https://api.themoviedb.org/3";
const Api_Key = import.meta.env.VITE_TMDB_API_KEY;

const Api_option = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${Api_Key}`,
  },
};

function App() {
  const [Searc, setSEarc] = useState("");
  const [MovieList, setMovieList] = useState([]);
  const [isLoad, setLoad] = useState(true);
  const [dots, setDots] = useState("");

  function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      const handler = setTimeout(() => setDebouncedValue(value), delay);

      return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedValue;
  }

  const debouncedSearchTerm = useDebounce(Searc, 500);

  const hundlsearch = (SearchValue) => {
    setSEarc(SearchValue);
  };

  const FetchMovie = async (query = "") => {
    setLoad(true);

    try {
      const endpoint = query
        ? `${API}/search/movie?query=${encodeURIComponent(query)}`
        : `${API}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, Api_option);
      if (!response.ok) {
        throw "error massage 404";
      }

      const data = await response.json();
      if (data.Response == "False") {
        setMovieList([]);
        return;
      }
      setMovieList(data.results || []);
      console.log(data.results);
    } catch (error) {
      console.error(`Error fetching data: ${error}`);
    } finally {
      setLoad(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 4 ? prev + "." : "."));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    FetchMovie(debouncedSearchTerm);
  }, [debouncedSearchTerm]);
  return (
    <main>
      <div className="pattern">
        {" "}
        <div className="wapper">
          <header>
            <img src={hero_logo} alt="" />
            <h1>
              Find <span className="text-gradient font-bold">Movies</span>{" "}
              You`ll Enjoy without the Hassle
            </h1>
            <Search hundle={hundlsearch} ss={Searc} />
          </header>

          <section className="all-movies ml-[12%] w-[80%]">
            <h2 className="mt-[20px]">All Movies</h2>
            {isLoad ? (
              <h1>Loading{dots}</h1>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {MovieList.map((elm) => (
                  <MovieCard key={elm.id} card={elm} />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

export default App;
