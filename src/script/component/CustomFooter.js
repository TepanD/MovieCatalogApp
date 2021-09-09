class CustomFooter extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
          <footer class="footer-container">
            <div class="footer-inner-container">
            
              <span class="copyright-footer">Created By Stefan Dharmawan</span>
              <ul class="nav-footer-container">
                <li class="nav-btn-footer"><a href="/" class="nav-btn-footer-inner">Discover</a></li>
                <li class="nav-btn-footer"><a href="/now-playing.html" class="nav-btn-footer-inner">Now Playing</a></li>
                <li class="nav-btn-footer"><a href="/trending.html" class="nav-btn-footer-inner">Trending</a></li>
              </ul>
            </div>
          </footer>
      `;
  }
}

customElements.define("custom-footer", CustomFooter);
