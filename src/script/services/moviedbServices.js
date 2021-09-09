import "regenerator-runtime";
import axios from "axios";

const baseUrl = process.env.BASE_URL;
const API_KEY = process.env.API_KEY;

const getMovieDiscover = async () => {
  const request = await axios.get(
    `${baseUrl}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_video=false&page=1`
  );

  return request.data;
};

const getMovieById = async (movieId) => {
  const request = await axios.get(
    `${baseUrl}/movie/${movieId}?api_key=${API_KEY}&language=en-US`
  );
  return request.data;
};

const getMovieTrending = async () => {
  const request = await axios.get(
    `${baseUrl}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
  );
  return request.data;
};

const getMovieNowPlaying = async () => {
  const request = await axios.get(
    `${baseUrl}/movie/now_playing?api_key=${API_KEY}&languange=en-US&page=1`
  );
  return request.data;
};

const getMovieByKeyword = async (keyword, page) => {
  const request = await axios.get(
    `${baseUrl}/search/movie?api_key=${API_KEY}&language=en-US&query=${keyword}&page=${page}`
  );
  return request.data;
};

export default {
  getMovieDiscover,
  getMovieById,
  getMovieTrending,
  getMovieNowPlaying,
  getMovieByKeyword,
};
