//* Fetch from the api, basic info of movie
const fetchData = async (searchTerm) => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: 'e2e8e539',
      s: searchTerm,
    },
  });

  console.log(response.data);
};

//* Query Selectors
const input = document.querySelector('input');

//* Call fetchData
const onInput = (event) => {
  fetchData(event.target.value);
};

//* Event Listener
input.addEventListener('input', debounce(onInput, 500));
