import React, { useState, useEffect } from "react";
import Movie from "../components/Movie";
import "../routes/Home.css";
// import { Link } from "react-router-dom";

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
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzODJiNTU4ZGFkMDIxZjcwNzdiNjM1OWZkZTY5NWI2ZSIsInN1YiI6IjY0ZjAzOTRhM2E5OTM3MDBjNWMzZGNmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dJzN3Vy9PLwLFig4rNqofJnb6p5i07nCdSteQG22Roc",
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
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzODJiNTU4ZGFkMDIxZjcwNzdiNjM1OWZkZTY5NWI2ZSIsInN1YiI6IjY0ZjAzOTRhM2E5OTM3MDBjNWMzZGNmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dJzN3Vy9PLwLFig4rNqofJnb6p5i07nCdSteQG22Roc",
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
      <h1>Trending Titles and Images</h1>
      <div>
        <label>
          검색
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </label>

        <button onClick={handleSearch}>Search</button>
      </div>
      {searchTrigger ? <button onClick={handleState}>돌아가기</button> : ""}

      <div className="movie">
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

// import React, { useState, useEffect } from "react";

// function App() {
//   const [data, setData] = useState([]); // 빈 배열로 초기화합니다.
//   const [search, setSerch] = useState("");
//   const onChange = (e) => setSerch(e.target.value);

//   useEffect(() => {
//     const options = {
//       method: "GET",
//       headers: {
//         accept: "application/json",
//         Authorization:
//           "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzODJiNTU4ZGFkMDIxZjcwNzdiNjM1OWZkZTY5NWI2ZSIsInN1YiI6IjY0ZjAzOTRhM2E5OTM3MDBjNWMzZGNmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dJzN3Vy9PLwLFig4rNqofJnb6p5i07nCdSteQG22Roc",
//       },
//     };

//     fetch(
//       "https://api.themoviedb.org/3/trending/all/week?language=en-US",
//       options
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         setData(data.results); // 받아온 제목 데이터를 상태로 설정합니다.
//         console.log(data);
//       })
//       .catch((err) => console.error(err));
//   }, []); // 빈 배열을 넣어 처음 렌더링 시에만 실행되도록 설정합니다.

//   return (
//     <div>
//       <h1>Trending Titles</h1>
//       <hr />
//       <div>
//         <input onChange={onChange} type="text" value={search} />
//         <button>search</button>
//       </div>
//       <ul>
//         {data.map((item, index) => (
//           <div key={index}>
//             <h2>{item.title || item.name}</h2>
//             <img
//               src={`https://image.tmdb.org/t/p/w154${item.poster_path}`}
//               alt={item.title}
//             />
//           </div>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;
