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

//* Use data from fetchData
const onInput = async (event) => {
  const movies = await fetchData(event.target.value);

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

    resultsWrapper.appendChild(option);
  }
};

//* Event Listener
input.addEventListener('input', debounce(onInput, 500));
