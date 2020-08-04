//* Created createAutoComplete to make code more useable
const createAutoComplete = ({ root, renderOption }) => {
  //* Generate HTML for dropdown menu
  root.innerHTML = `
    <label><b>Search For a Movie</b></label>
      <input class = "input" />
        <div class="dropdown">
          <div class="dropdown-menu">
            <div class="dropdown-content results">
            </div>
          </div>
        </div>
`;

  //* Query Selectors
  const input = root.querySelector('input');
  const dropdown = root.querySelector('.dropdown');
  const resultsWrapper = root.querySelector('.results');

  //* Use data from fetchData to create dropdown menu
  const onInput = async (event) => {
    const movies = await fetchData(event.target.value);

    if (!movies.length) {
      dropdown.classList.remove('is-active');
      return;
    }

    resultsWrapper.innerHTML = '';
    dropdown.classList.add('is-active');

    for (let movie of movies) {
      const option = document.createElement('a');

      option.classList.add('dropdown-item');

      option.innerHTML = renderOption(movie);

      option.addEventListener('click', () => {
        dropdown.classList.remove('is-active');
        input.value = movie.Title;

        //* Send another request to api
        onMovieSelect(movie);
      });

      resultsWrapper.appendChild(option);
    }
  };

  //* Event Listeners
  input.addEventListener('input', debounce(onInput, 500));

  //* Closes dropdown menu
  document.addEventListener('click', (event) => {
    if (!root.contains(event.target)) {
      dropdown.classList.remove('is-active');
    }
  });
};
