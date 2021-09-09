//Styling
import "./style/global-style.scss";
import "./style/navbar-style.scss";
import "./style/movie-list.scss";
import "./style/movie-detail.scss";

import "regenerator-runtime";
//Components
import "./script/component/NavBar.js";
import "./script/component/MovieList.js";
import "./script/component/MovieDetail.js";
import "./script/component/CustomFooter.js";
import "./script/services/moviedbServices.js";
import main from "./script/main.js";
document.addEventListener("DOMContentLoaded", main);
