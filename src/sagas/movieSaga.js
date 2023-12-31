import { call, delay, put, takeLatest } from "redux-saga/effects";
import {
  fetchMovieRequest,
  fetchMovieSuccess,
  fetchMovieFailure,
  fetchMovieGenre,
  fetchAllMoviesSuccess,
} from "../slices/movieSlice";
import axios from "axios";
import { genresApiUrl, generateMoviesApiUrl, apiKey } from "../common/apiURLs";

function* fetchAllMovies() {
  const allMovies = [];
  const totalPagesToFetch = 500;

  try {
    yield delay(500);
    for (let page = 1; page <= totalPagesToFetch; page++) {
      const apiUrl = generateMoviesApiUrl(page, apiKey);
      const response = yield call(axios.get, apiUrl);
      allMovies.push(...response.data.results);
      yield put(fetchMovieSuccess(response.data.results));
    }
    yield put(fetchAllMoviesSuccess(allMovies));
  } catch (error) {
    yield put(fetchMovieFailure("Wystąpił błąd podczas pobierania danych."));
  }
}

function* fetchGenres() {
  try {
    yield delay(500);
    const response = yield call(axios.get, genresApiUrl);
    yield put(fetchMovieGenre(response.data.genres));
    localStorage.setItem("genre_ids", JSON.stringify(response.data.genres));
  } catch (error) {
    yield put(fetchMovieFailure(error));
  }
}

export function* watchFetchMovies() {
  yield takeLatest(fetchMovieRequest.type, fetchAllMovies);
  yield takeLatest(fetchMovieRequest.type, fetchGenres);
}
