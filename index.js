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

  for (let movie of movies) {
    const div = document.createElement('div');

    div.innerHTML = `
    <img src="${movie.Poster}" />
    <h1>${movie.Title}</h1>
    `;

    document.querySelector('#target').appendChild(div);
  }
};

//* Event Listener
input.addEventListener('input', debounce(onInput, 500));
