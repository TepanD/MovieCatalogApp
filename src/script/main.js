const main = () => {
  const searchFunction = (e) => {
    if (e.key === "Enter" && e.target.value === "") {
      return;
    } else if (e.key === "Enter" && e.target.value !== "") {
      const searchKeyword = encodeURIComponent(e.target.value);
      const page = "1";
      window.location.href = `/search-result.html?keyword=${searchKeyword}&page=${page}`;
    }
  };

  document
    .getElementById("searchElementOne")
    .addEventListener("keyup", (e) => searchFunction(e));

  document
    .getElementById("searchElementTwo")
    .addEventListener("keyup", (e) => searchFunction(e));

  window.prevPageHandler = (element) => {
    const currPage = parseInt(
      document.getElementById("current-page").innerText
    );
    const nextPage = (currPage - 1).toString();
    const keyword = encodeURIComponent(
      element.parentElement.children["search-keyword"].innerText
    );
    window.location.href = `/search-result.html?keyword=${keyword}&page=${nextPage}`;
  };

  window.nextPageHandler = (element) => {
    const currPage = parseInt(
      document.getElementById("current-page").innerText
    );
    const nextPage = (currPage + 1).toString();
    const keyword = encodeURIComponent(
      element.parentElement.children["search-keyword"].innerText
    );
    window.location.href = `/search-result.html?keyword=${keyword}&page=${nextPage}`;
  };

  window.firstPageHandler = (element) => {
    const keyword = encodeURIComponent(
      element.parentElement.children["search-keyword"].innerText
    );
    window.location.href = `/search-result.html?keyword=${keyword}&page=1`;
  };

  window.lastPageHandler = (element) => {
    const keyword = encodeURIComponent(
      element.parentElement.children["search-keyword"].innerText
    );
    const lastPage = element.parentElement.children["total-pages"].innerText;
    window.location.href = `/search-result.html?keyword=${keyword}&page=${lastPage}`;
  };
};

export default main;
