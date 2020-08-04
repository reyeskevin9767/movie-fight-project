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

//* Event Listeners
const input = document.querySelector('input');

//* Every input will call fetchData
input.addEventListener('input', (event) => {
  fetchData(event.target.value);
});
