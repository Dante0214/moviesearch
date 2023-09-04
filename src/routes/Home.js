import React, { useState, useEffect } from "react";
import Movie from "../components/Movie";
import style from "../routes/Home.module.css";

// import { Link } from "react-router-dom";

const apikey = process.env.REACT_APP_API_KEY;

function Home() {
  const [data, setData] = useState([]); //기본 화면을 위한 상태
  const [searchData, setSearchData] = useState([]); // 검색을 위한 상태
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTrigger, setSearchTrigger] = useState(false); // 검색 트리거 상태 추가

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: apikey,
      },
    };

    const apiUrl =
      "https://api.themoviedb.org/3/trending/all/week?language=ko-KR";
    fetch(apiUrl, options)
      .then((response) => response.json())
      .then((data) => {
        setData(data.results);
        console.log(data);
      })
      .catch((err) => console.error(err));
  }, []); // 기본 주간 트랜딩 화면

  const fetchSearchResults = async () => {
    try {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: apikey,
        },
      };

      const apiUrl = `https://api.themoviedb.org/3/search/multi?language=ko-KR&query=${searchTerm}`;

      const response = await fetch(apiUrl, options);
      const search = await response.json();
      setSearchData(search.results);
      console.log(searchData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = () => {
    fetchSearchResults();
    setSearchTrigger(true); // 검색 실행
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      fetchSearchResults();
      setSearchTrigger(true);
    }
  };
  const handleState = () => {
    setSearchTrigger(false);
    setSearchTerm("");
  };

  return (
    <div>
      <div className={style.search}>
        <input
          className={style.input}
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSearch}>Search</button>

        {searchTrigger ? <button onClick={handleState}>돌아가기</button> : ""}
      </div>

      {searchTrigger ? "" : <h1 className={style.trend}>Weekly Trends</h1>}

      <div className={style.movie}>
        {(searchTrigger ? searchData : data).map((mov) => (
          <Movie
            id={mov.id}
            key={mov.id}
            img={`https://image.tmdb.org/t/p/w154${mov.poster_path}`}
            title={mov.title || mov.name}
            summary={mov.overview}
            rating={mov.vote_average}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
