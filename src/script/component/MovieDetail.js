import "regenerator-runtime";
import moviedbServices from "../services/moviedbServices.js";

class MovieDetail extends HTMLElement {
  async connectedCallback() {
    try {
      const url_string = window.location.href.toLowerCase();
      let url = new URL(url_string);
      let movieId = url.searchParams.get("movieid");
      if (movieId === null || movieId === "") {
        this.renderError();
      } else {
        this._returnedData = await moviedbServices.getMovieById(movieId);
        this._movie = this._returnedData;
        if (this._returnedData.production_countries.length === 0) {
          this._productionCountry = "n/a";
        } else {
          this._productionCountry = this._movie.production_countries[0].name;
        }
      }
    } catch (error) {
      this.renderError(error.response.data.message);
    }
    this.render();
  }

  render() {
    this.innerHTML = `
      <a class="movdtl-back-btn" href="javascript:history.back()">
        <svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="#000000" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><path d="M10.1416,114.541,99.34766,57.19434A16.00057,16.00057,0,0,1,124,70.65332v42.69287l87.34766-56.15185A16.00057,16.00057,0,0,1,236,70.65332V185.34668a15.99914,15.99914,0,0,1-24.65234,13.459L124,142.65381v42.69287a15.99914,15.99914,0,0,1-24.65234,13.459L10.1416,141.459a16.0005,16.0005,0,0,1,0-26.918Z"></path></svg>
        <span >Back</span>
      </a>
      <div class="content-main-detail mov-detail">
        <div class="movdtl-backdrop-container">
          <img src="https://image.tmdb.org/t/p/original/${
            this._movie.backdrop_path
          }" />
          <img class="movdtl-poster" src="https://image.tmdb.org/t/p/original/${
            this._movie.poster_path
          }"/>
        </div>
        <div class="movdtl-content">
          <div class="movdtl-heading">
            <h1 class="movdtl-title">${this._movie.original_title}</h1>
            <p class="movdtl-genres">${this._movie.genres
              .map((genre) => `${genre.name}`)
              .join(", ")} 
            </p>
            <p class="movdtl-rating">
              ${this._movie.vote_average}
              <svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="#ecec00" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><path d="M239.166,97.41117A16.37036,16.37036,0,0,0,224.63477,86.044l-59.39063-4.15625L143.21289,26.41117A16.33117,16.33117,0,0,0,127.99414,15.9971h-.01562A16.324,16.324,0,0,0,112.791,26.41117L90.43164,82.208,31.36914,86.044A16.37036,16.37036,0,0,0,16.83789,97.41117a16.68222,16.68222,0,0,0,5.15625,18.0625l45.4375,38.40625L53.916,207.044a18.37492,18.37492,0,0,0,7.01562,19.51562,17.83088,17.83088,0,0,0,20.0625.625l46.875-29.69531c.0625-.04687.125-.07812.26563,0l50.4375,31.95313a16.14026,16.14026,0,0,0,18.20312-.5625,16.64744,16.64744,0,0,0,6.35938-17.67969L188.77539,153.1221l45.23438-37.64843A16.68222,16.68222,0,0,0,239.166,97.41117Z"></path></svg>
            </p>
          </div>
          <div class="movdtl-overview-container">
            <p class="movdtl-overview">
              ${this._movie.overview}
            </p>
            <div class="movdtl-date-release" >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 6.5C11 6.36739 11.0527 6.24021 11.1464 6.14645C11.2402 6.05268 11.3674 6 11.5 6H12.5C12.6326 6 12.7598 6.05268 12.8536 6.14645C12.9473 6.24021 13 6.36739 13 6.5V7.5C13 7.63261 12.9473 7.75979 12.8536 7.85355C12.7598 7.94732 12.6326 8 12.5 8H11.5C11.3674 8 11.2402 7.94732 11.1464 7.85355C11.0527 7.75979 11 7.63261 11 7.5V6.5ZM8 6.5C8 6.36739 8.05268 6.24021 8.14645 6.14645C8.24021 6.05268 8.36739 6 8.5 6H9.5C9.63261 6 9.75979 6.05268 9.85355 6.14645C9.94732 6.24021 10 6.36739 10 6.5V7.5C10 7.63261 9.94732 7.75979 9.85355 7.85355C9.75979 7.94732 9.63261 8 9.5 8H8.5C8.36739 8 8.24021 7.94732 8.14645 7.85355C8.05268 7.75979 8 7.63261 8 7.5V6.5ZM3 9.5C3 9.36739 3.05268 9.24021 3.14645 9.14645C3.24021 9.05268 3.36739 9 3.5 9H4.5C4.63261 9 4.75979 9.05268 4.85355 9.14645C4.94732 9.24021 5 9.36739 5 9.5V10.5C5 10.6326 4.94732 10.7598 4.85355 10.8536C4.75979 10.9473 4.63261 11 4.5 11H3.5C3.36739 11 3.24021 10.9473 3.14645 10.8536C3.05268 10.7598 3 10.6326 3 10.5V9.5ZM6 9.5C6 9.36739 6.05268 9.24021 6.14645 9.14645C6.24021 9.05268 6.36739 9 6.5 9H7.5C7.63261 9 7.75979 9.05268 7.85355 9.14645C7.94732 9.24021 8 9.36739 8 9.5V10.5C8 10.6326 7.94732 10.7598 7.85355 10.8536C7.75979 10.9473 7.63261 11 7.5 11H6.5C6.36739 11 6.24021 10.9473 6.14645 10.8536C6.05268 10.7598 6 10.6326 6 10.5V9.5Z" fill="#222222"/>
                <path d="M3.5 0C3.63261 0 3.75979 0.0526784 3.85355 0.146447C3.94732 0.240215 4 0.367392 4 0.5V1H12V0.5C12 0.367392 12.0527 0.240215 12.1464 0.146447C12.2402 0.0526784 12.3674 0 12.5 0C12.6326 0 12.7598 0.0526784 12.8536 0.146447C12.9473 0.240215 13 0.367392 13 0.5V1H14C14.5304 1 15.0391 1.21071 15.4142 1.58579C15.7893 1.96086 16 2.46957 16 3V14C16 14.5304 15.7893 15.0391 15.4142 15.4142C15.0391 15.7893 14.5304 16 14 16H2C1.46957 16 0.960859 15.7893 0.585786 15.4142C0.210714 15.0391 0 14.5304 0 14V3C0 2.46957 0.210714 1.96086 0.585786 1.58579C0.960859 1.21071 1.46957 1 2 1H3V0.5C3 0.367392 3.05268 0.240215 3.14645 0.146447C3.24021 0.0526784 3.36739 0 3.5 0V0ZM1 4V14C1 14.2652 1.10536 14.5196 1.29289 14.7071C1.48043 14.8946 1.73478 15 2 15H14C14.2652 15 14.5196 14.8946 14.7071 14.7071C14.8946 14.5196 15 14.2652 15 14V4H1Z" fill="#222222"/>
              </svg>
              <span>${this._movie.release_date}</span>
            </div>
            <div class="movdtl-country-org">
              <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 16C8.689 16 9.357 15.913 9.995 15.75C9.64816 15.3641 9.33626 14.9481 9.063 14.507C8.705 14.842 8.34 15 8 15C7.343 15 6.593 14.41 5.978 13.092C5.74392 12.5794 5.55715 12.0466 5.42 11.5H8.264C8.288 11.156 8.348 10.821 8.44 10.5H5.206C5.06705 9.67396 4.99813 8.83765 5 8C5 7.117 5.073 6.275 5.206 5.5H10.794C10.899 6.113 10.967 6.769 10.991 7.454C11.3058 7.30355 11.6365 7.18916 11.977 7.113C11.9484 6.57275 11.8916 6.03435 11.807 5.5H14.54C14.774 6.11 14.924 6.76 14.978 7.439C15.347 7.612 15.69 7.831 15.999 8.09L16 8C16 6.41775 15.5308 4.87103 14.6518 3.55544C13.7727 2.23985 12.5233 1.21447 11.0615 0.608967C9.59966 0.00346625 7.99113 -0.15496 6.43928 0.153721C4.88743 0.462403 3.46197 1.22433 2.34315 2.34315C1.22433 3.46197 0.462403 4.88743 0.153721 6.43928C-0.15496 7.99113 0.00346625 9.59966 0.608967 11.0615C1.21447 12.5233 2.23985 13.7727 3.55544 14.6518C4.87103 15.5308 6.41775 16 8 16V16ZM8 1C8.657 1 9.407 1.59 10.022 2.908C10.239 3.374 10.428 3.91 10.581 4.5H5.419C5.572 3.91 5.761 3.374 5.979 2.908C6.592 1.59 7.342 1 8 1ZM5.072 2.485C4.77671 3.13182 4.54787 3.80695 4.389 4.5H1.936C2.78024 3.04087 4.12123 1.93415 5.714 1.382C5.473 1.712 5.258 2.086 5.072 2.485ZM4.192 5.5C4.06258 6.32702 3.99839 7.16293 4 8C4 8.87 4.067 9.712 4.193 10.5H1.46C1.15503 9.70183 0.999115 8.85446 1 8C1 7.12 1.163 6.276 1.46 5.5H4.193H4.192ZM4.389 11.5C4.565 12.243 4.796 12.922 5.072 13.515C5.258 13.914 5.473 14.288 5.714 14.618C4.12123 14.0659 2.78024 12.9591 1.936 11.5H4.39H4.389ZM10.286 1.382C11.8788 1.93407 13.2198 3.04082 14.064 4.5H11.61C11.4511 3.80695 11.2223 3.13182 10.927 2.485C10.7489 2.09756 10.5339 1.72819 10.285 1.382H10.286ZM13 8C15.071 8 16.75 9.727 16.75 11.857C16.75 13.454 15.567 15.127 13.25 16.914C13.1785 16.9696 13.0906 16.9998 13 16.9998C12.9094 16.9998 12.8215 16.9696 12.75 16.914C10.433 15.127 9.25 13.454 9.25 11.857C9.25 9.727 10.929 8 13 8ZM13 10.571C12.31 10.571 11.75 11.147 11.75 11.857C11.75 12.567 12.31 13.143 13 13.143C13.69 13.143 14.25 12.567 14.25 11.857C14.25 11.147 13.69 10.571 13 10.571Z" fill="#222222"/>
              </svg>
              <span>${this._productionCountry}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderError() {
    this.innerHTML = `
      <h1>Terjadi kesalahan</h1>
    `;
  }
}

customElements.define("movie-detail", MovieDetail);
