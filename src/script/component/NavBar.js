import websiteLogo from "../../assets/website-logo.png";

class NavBar extends HTMLElement {
  connectedCallback() {
    const url_string = window.location.href.toLowerCase();
    const url = new URL(url_string);
    const keyword = decodeURIComponent(url.searchParams.get("keyword"));

    if (window.location.pathname === "/search-result.html") {
      if (keyword !== null || keyword !== "" || keyword !== undefined) {
        this._searchValue = keyword;
      } else if (keyword === null) {
        this._searchValue = "";
      }
    } else {
      this._searchValue = "";
    }

    this.render();
  }

  render() {
    this.innerHTML = `
    <a href="/" class="nav-logo-mobile">
      <img src="${websiteLogo}" alt="movie catalog logo">
    </a>
    <header class="navbar-container">
        <nav class="nav-section">
            <a href="/" class="nav-logo">
              <img src="${websiteLogo}" alt="movie catalog logo">
            </a>
            <ul class="nav-btn-container">
              <li class="nav-btn"><a href="/" class="nav-btn-inner">Discover</a></li>
              <li class="nav-btn"><a href="/now-playing.html" class="nav-btn-inner">Now Playing</a></li>
              <li class="nav-btn"><a href="/trending.html" class="nav-btn-inner">Trending</a></li>
            </ul>
            <div class="searchbar-container">
            <svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="#000000" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><circle cx="115.99707" cy="116" r="84" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></circle><line x1="175.39063" y1="175.40039" x2="223.99121" y2="224.00098" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line></svg>
                <input placeholder="Search" class="search-bar" id="searchElementOne" type="search" value="${
                  this._searchValue !== "" ||
                  this._searchValue !== null ||
                  this._searchValue !== undefined
                    ? `${this._searchValue}`
                    : ""
                }" />
            </div>
            
        </nav>
    </header>

    <div class="searchbar-mobile-container">
    <svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="#000000" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><circle cx="115.99707" cy="116" r="84" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></circle><line x1="175.39063" y1="175.40039" x2="223.99121" y2="224.00098" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line></svg>
      <input placeholder="Search" class="search-bar" id="searchElementTwo" type="search" value="${
        this._searchValue !== "" ||
        this._searchValue !== null ||
        this._searchValue !== undefined
          ? `${this._searchValue}`
          : ""
      }"/>
    </div>
    `;
  }
}

customElements.define("nav-bar", NavBar);
