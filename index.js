//* Fetch from the api, basic info of movie
const fetchData = async (searchTerm) => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: 'e2e8e539',
      s: searchTerm,
    },
  });

  if (response.data.Error) {
    return [];
  }

  return response.data.Search;
};

//* Generating HTML for dropdown menu
const root = document.querySelector('.autocomplete');
root.innerHTML = `
<label><b>Search For a Movie</b></label>
<input class = "input" />
<div class="dropdown">
  <div class="dropdown-menu">
    <div class="dropdown-content results"></div>
  </div>
</div>
`;

//* Query Selectors
const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results');

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
    const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;

    option.classList.add('dropdown-item');

    option.innerHTML = `
    <img src="${imgSrc}" />
    ${movie.Title}
    `;

    option.addEventListener('click', () => {
      dropdown.classList.remove('is-active');
      input.value = movie.Title;
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
