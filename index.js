//* Fetch from the api, basic info of movie
const fetchData = async (searchTerm) => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: 'e2e8e539',
      s: searchTerm,
    },
  });

  return response.data.Search;
};

//* Query Selectors
const input = document.querySelector('input');

//* Call fetchData
const onInput = async (event) => {
  const movies = await fetchData(event.target.value);
  console.log(movies);
};

//* Event Listener
input.addEventListener('input', debounce(onInput, 500));
