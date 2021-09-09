import "regenerator-runtime";
import moviedbServices from "../services/moviedbServices.js";

class MovieList extends HTMLElement {
  async connectedCallback() {
    this._isLoading = true;
    this.page = this.getAttribute("page") || null;

    if (this.page === "Discover") {
      this._title = "Discover Movies";

      try {
        this._returnedData = await moviedbServices.getMovieDiscover();
        this._movies = this._returnedData.results;
        this.render();
      } catch (error) {
        this.renderError(error.response.data.status_message);
      }

      this._isLoading = false;
    } else if (this.page === "Trending") {
      this._title = "Daily Trending";

      try {
        this._returnedData = await moviedbServices.getMovieTrending();
        this._movies = this._returnedData.results;
        this.render();
      } catch (error) {
        this.renderError(error.response.data.status_message);
      }

      this._isLoading = false;
    } else if (this.page === "NowPlaying") {
      this._title = "Now Playing in Cinema";

      try {
        this._returnedData = await moviedbServices.getMovieNowPlaying();
        this._movies = this._returnedData.results;
        this.render();
      } catch (error) {
        this.renderError(error.response.data.status_message);
      }

      this._isLoading = false;
    } else if (this.page === "SearchResult") {
      const url_string = window.location.href;
      const url = new URL(url_string);

      this._keyword = encodeURIComponent(url.searchParams.get("keyword"));
      this._decodedKeyword = decodeURIComponent(
        url.searchParams.get("keyword")
      );
      this._page = url.searchParams.get("page");

      this._title = `Search Result for: <em>${decodeURIComponent(
        this._keyword
      )}</em>`;

      if (url.search === "") {
        window.location.href = "/";
      } else if (
        this._keyword === null ||
        this._keyword === "" ||
        this._keyword === undefined
      ) {
        this.renderError(`we couldn't find the movie you're looking for.`);
      } else {
        try {
          this._returnedData = await moviedbServices.getMovieByKeyword(
            this._keyword,
            this._page
          );
          this._movies = this._returnedData.results;

          //prev and forw page buttons
          if (
            this._returnedData.total_pages > 1 &&
            this._returnedData.page === 1
          ) {
            this._forwBtn = true;
          } else if (
            this._returnedData.total_pages === this._returnedData.page
          ) {
            this._forwBtn = false;
          }

          if (this._returnedData.page > 1) {
            this._prevBtn = true;
          } else {
            this._prevBtn = false;
          }

          //first and last page buttons
          if (this._returnedData.page === 1) {
            this._firstPageBtn = false;
          }

          if (
            this._returnedData.page === this._returnedData.total_pages &&
            this._returnedData.page > 1
          ) {
            this._lastPageBtn = false;
            this._firstPageBtn = true;
          } else {
            this._lastPageBtn = true;
          }

          this.render();
        } catch (error) {
          this.renderError(error);
        }
        this._isLoading = false;
      }
    }
  }

  render() {
    this.innerHTML = `
    <div class="content-container">
      <div class="content-header">
        <h1>${this._title}</h1>
        ${
          this.page === "SearchResult"
            ? `<span>result: ${this._returnedData.total_results}</span>`
            : ""
        }
      </div>
      <div class="content-main">
        <div class="inner-content-main">
            ${this._movies
              .map(
                (item) =>
                  `
                <a class="mov-card ${
                  this._isLoading ? "mov-card-skeleton" : ""
                }" href="/movie-detail.html?movieid=${item.id}">
                  <img class="mov-card-img"  src="https://image.tmdb.org/t/p/original/${
                    item.poster_path
                  }" />
                  <div class="mov-card-inner-shadow">
                    <div class="mov-card-rating">
                    <svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="#ecec00" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><path d="M239.166,97.41117A16.37036,16.37036,0,0,0,224.63477,86.044l-59.39063-4.15625L143.21289,26.41117A16.33117,16.33117,0,0,0,127.99414,15.9971h-.01562A16.324,16.324,0,0,0,112.791,26.41117L90.43164,82.208,31.36914,86.044A16.37036,16.37036,0,0,0,16.83789,97.41117a16.68222,16.68222,0,0,0,5.15625,18.0625l45.4375,38.40625L53.916,207.044a18.37492,18.37492,0,0,0,7.01562,19.51562,17.83088,17.83088,0,0,0,20.0625.625l46.875-29.69531c.0625-.04687.125-.07812.26563,0l50.4375,31.95313a16.14026,16.14026,0,0,0,18.20312-.5625,16.64744,16.64744,0,0,0,6.35938-17.67969L188.77539,153.1221l45.23438-37.64843A16.68222,16.68222,0,0,0,239.166,97.41117Z"></path></svg>
                    <span>${item.vote_average}</span> 
                    </div>
                    <span class="mov-card-title">${item.original_title}</span>
                  </div>
                </a>
                `
              )
              .join("")}  
          </div>
          <div class="pagination-container" ${
            this._returnedData.total_pages === 1 || this.page === "SearchResult"
              ? ""
              : 'style="display:none;"'
          }>
            
            <button id="first-page-btn" onclick="firstPageHandler(this)" ${
              this._firstPageBtn === false ? 'class="disabled-btn"' : ""
            }>first</button>
                
            
            
            <button id="pagination-prev-btn" onclick="prevPageHandler(this)" ${
              this._prevBtn === false ? 'class="disabled-btn"' : ""
            }>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><rect width="24" height="24" fill="none"></rect><path d="M128,24A104,104,0,1,0,232,128,104.12041,104.12041,0,0,0,128,24Zm36,136a7.99975,7.99975,0,0,1-12.4375,6.65625L108,137.61426V160a8,8,0,0,1-16,0V96a8,8,0,0,1,16,0v22.38574l43.5625-29.042A7.99612,7.99612,0,0,1,164,96Z"></path></svg>
            </button>
                
               
            <span id="total-pages" style="display: none;">${
              this._returnedData.total_pages
            }</span>
            <span id="pagination-page">Page <b>${this._page}</b> of <b>${
      this._returnedData.total_pages
    }</b></span>
            <span id="current-page" style="display:none;">${this._page}</span>
            <span id="search-keyword" style="display: none;">${
              this._decodedKeyword
            }</span>
            
            <button id="pagination-next-btn" onclick="nextPageHandler(this)" ${
              this._forwBtn === false ? 'class="disabled-btn"' : ""
            }>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><path d="M128,24A104,104,0,1,0,232,128,104.12041,104.12041,0,0,0,128,24Zm36,136a8,8,0,0,1-16,0V137.61426l-43.5625,29.042A7.99612,7.99612,0,0,1,92,160V96a7.99612,7.99612,0,0,1,12.4375-6.65625L148,118.38574V96a8,8,0,0,1,16,0Z"></path></svg>
            </button>
                  
            
            <button id="last-page-btn" onclick="lastPageHandler(this)" ${
              this._lastPageBtn === false ? 'class="disabled-btn"' : ""
            }>last</button>
                
            
           </div>
      </div>
    </div>`;
  }

  renderError(errorMessage) {
    this.innerHTML = `
    <div class="content-container">
      <div class="content-header">
        <h1>Welcome movie enthusiast!</h1>
      </div>
      <div class="content-main">
        <div class="error-msg-container">
          <h2 class="error-msg-heading">Sorry, there seems to be an error</h2>
          <h4 class="error-msg">${errorMessage}</h4>
        </div>
      </div>
    </div>
    `;
  }
}

customElements.define("movie-list", MovieList);
