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

let timeoutId;

//* Delay between input and fetchData
const onInput = (event) => {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }

  timeoutId = setTimeout(() => {
    fetchData(event.target.value);
  }, 500);
};

//* Event Listener
input.addEventListener('input', onInput);
