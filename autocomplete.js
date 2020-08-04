//* Created createAutoComplete for useable
const createAutoComplete = ({
  root,
  renderOption,
  onOptionSelect,
  inputValue,
  fetchData
}) => {
  //* Generate HTML for dropdown menu
  root.innerHTML = `
    <label><b>Search</b></label>
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
    const items = await fetchData(event.target.value);

    if (!items.length) {
      dropdown.classList.remove('is-active');
      return;
    }

    resultsWrapper.innerHTML = '';
    dropdown.classList.add('is-active');

    for (let item of items) {
      const option = document.createElement('a');

      option.classList.add('dropdown-item');

      option.innerHTML = renderOption(item);

      option.addEventListener('click', () => {
        dropdown.classList.remove('is-active');
        input.value = inputValue(item);
        onOptionSelect(item);
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
