// import { Link, useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import style from "../routes/Info.module.css";

const apikey = process.env.REACT_APP_API_KEY;

function Info() {
  const { id } = useParams();
  const [data, setData] = useState("");
  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: apikey,
      },
    };

    fetch(`https://api.themoviedb.org/3/movie/${id}?language=ko-KR`, options)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <div className={style.total}>
      <div className={style.element}>
        <img
          src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${data.poster_path}`}
          alt={data.title}
        />
      </div>

      <div className={style.element}>
        <div>
          <div className={style.backhome}>
            <h1>{data.title}</h1>
            <Link to="/moviesearch">돌아가기</Link>
          </div>
          <h2>개요</h2>
          <h3>{data.overview}</h3>
        </div>
        <div>
          {data.genres ? (
            <>
              <h3>장르</h3>
              <ul>
                {data.genres.map((genre, index) => (
                  <span key={genre.id}>
                    {genre.name}{" "}
                    {/* {index < data.genre.index - 1 ? ", " : ""} */}
                  </span>
                ))}
              </ul>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Info;
