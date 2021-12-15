const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = process.env.REACT_APP_API_KEY;

function fetchImagesApi(serchName, page = 1) {
  const url = `${BASE_URL}?q=${serchName}&key=${API_KEY}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`;
  return fetch(url).then(response => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(new Error(`Something went wrong`));
  });
}

export { fetchImagesApi };
