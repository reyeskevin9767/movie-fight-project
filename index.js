//* Fetch from the api, basic info of movie
const fetchData = async () => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: 'e2e8e539',
      s: 'avengers',
    },
  });

  console.log(response.data);
};

fetchData();
