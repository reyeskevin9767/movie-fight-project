//* Functions that don't change
const autoCompleteConfig = {
  //* Render the movie's basic info
  renderOption(movie) {
    const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
    return `<img src="${imgSrc}" /> ${movie.Title} (${movie.Year})`;
  },
  inputValue(movie) {
    return movie.Title;
  },

  //* Fetch from the api, basic info of movie
  async fetchData(searchTerm) {
    const response = await axios.get('https://www.omdbapi.com/', {
      params: {
        apikey: 'e2e8e539',
        s: searchTerm,
      },
    });

    if (response.data.Error) {
      return [];
    }

    return response.data.Search;
  },
};

//* Customize left createAutoComplete
createAutoComplete({
  ...autoCompleteConfig,

  //* Assign div with class to root
  root: document.querySelector('#left-autocomplete'),

  onOptionSelect(movie) {
    document.querySelector('.tutorial').classList.add('is-hidden');

    //* Send another request to api
    onMovieSelect(movie, document.querySelector('#left-summary'), 'left');
  },
});

//* Customize right createAutoComplete
createAutoComplete({
  ...autoCompleteConfig,

  //* Assign div with class to root
  root: document.querySelector('#right-autocomplete'),

  onOptionSelect(movie) {
    document.querySelector('.tutorial').classList.add('is-hidden');

    //* Send another request to api
    onMovieSelect(movie, document.querySelector('#right-summary'), 'right');
  },
});

let leftMovie;
let rightMovie;
//* Fetch from the api, more details about the movie
const onMovieSelect = async (movie, summaryElement, side) => {
  const response = await axios.get('https://www.omdbapi.com/', {
    params: {
      apikey: 'e2e8e539',
      i: movie.imdbID,
    },
  });

  summaryElement.innerHTML = movieTemplate(response.data);

  if (side === 'left') {
    leftMovie = response.data;
  } else {
    rightMovie = response.data;
  }

  if (leftMovie && rightMovie) {
    runComparison();
  }
};

let leftScore = 0;
let rightScore = 0;
//* Compare movies
const runComparison = () => {
  const leftSideStats = document.querySelectorAll(
    '#left-summary .notification'
  );
  const rightSideStats = document.querySelectorAll(
    '#right-summary .notification'
  );

  leftSideStats.forEach((leftStat, index) => {
    const rightStat = rightSideStats[index];

    let leftSideValue = parseFloat(leftStat.dataset.value);
    let rightSideValue = parseFloat(rightStat.dataset.value);

    if (isNaN(leftSideValue)) {
      leftSideValue = 0;
    }

    if (isNaN(rightSideValue)) {
      rightSideValue = 0;
    }

    console.log(leftSideValue);
    console.log(rightSideValue);

    const removeWarningSuccess = ['is-warning', 'is-success'];
    const removeWarningDanger = ['is-warning', 'is-danger'];
    const removeSuccessWarning = ['is-success', 'is-danger'];

    if (rightSideValue > leftSideValue) {
      leftStat.classList.remove(...removeWarningSuccess);
      leftStat.classList.add('is-danger');
      rightStat.classList.remove(...removeWarningDanger);
      rightStat.classList.add('is-success');
      rightScore += 1;
    } else if (rightSideValue < leftSideValue) {
      rightStat.classList.remove(...removeWarningSuccess);
      rightStat.classList.add('is-danger');
      leftStat.classList.remove(...removeWarningDanger);
      leftStat.classList.add('is-success');
      leftScore += 1;
    } else {
      leftStat.classList.remove(...removeSuccessWarning);
      leftStat.classList.add('is-warning');
      rightStat.classList.remove(...removeSuccessWarning);
      rightStat.classList.add('is-warning');
    }
  });

  winner();
  leftScore = 0;
  rightScore = 0;
};

//* Determine the Winner
function winner() {
  const scoreTable = document.querySelector('.scoretable');
  const winner = document.querySelector('.winner');

  scoreTable.innerHTML = `${leftScore} - ${rightScore}`;
  if (leftScore > rightScore) {
    winner.innerHTML = `Winner: ${leftMovie.Title}`;
  }
  else if (leftScore < rightScore) {
    winner.innerHTML = `Winner: ${rightMovie.Title}`;
  }
  else {
    winner.innerHTML = `This is a Draw`;
  }
}

//* Generate HTML for movie's details
const movieTemplate = (movieDetail) => {
  if (!movieDetail.BoxOffice) {
    movieDetail.BoxOffice = 'N/A';
  }

  const dollars = parseInt(
    movieDetail.BoxOffice.replace(/\$/g, '').replace(/,/g, '')
  );
  const metascore = parseInt(movieDetail.Metascore);
  const imdbRating = parseFloat(movieDetail.imdbRating);
  const imdbVotes = parseInt(movieDetail.imdbVotes.replace(/,/g, ''));

  const awards = movieDetail.Awards.split(' ').reduce((prev, word) => {
    const value = parseInt(word);

    if (isNaN(value)) {
      return prev;
    } else {
      return prev + value;
    }
  }, 0);

  return `
    <article class="media">
      <figure class="media-left">
        <p class="image">
          <img src="${movieDetail.Poster}" />
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <h1>${movieDetail.Title}</h1>
          <h4>${movieDetail.Genre}</h4>
          <p>${movieDetail.Plot}</p>
        </div>
      </div>
    </article>

    <article data-value=${awards} class="notification is-primary">
      <p class="title">${movieDetail.Awards}</p>
      <p class="subtitle">Awards</p>
    </article>

    <article data-value=${dollars} class="notification is-primary">
      <p class="title">${movieDetail.BoxOffice}</p>
      <p class="subtitle">Box Office</p>
    </article>

    <article data-value=${metascore} class="notification is-primary">
      <p class="title">${movieDetail.Metascore}</p>
      <p class="subtitle">Metascore</p>
    </article>

    <article data-value=${imdbRating} class="notification is-primary">
      <p class="title">${movieDetail.imdbRating}</p>
      <p class="subtitle">IMDB Rating</p>
    </article>

    <article data-value=${imdbVotes} class="notification is-primary">
      <p class="title">${movieDetail.imdbVotes}</p>
      <p class="subtitle">IMDB Votes</p>
    </article>
  `;
};
