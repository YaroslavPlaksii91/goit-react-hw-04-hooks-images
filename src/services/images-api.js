import axios from 'axios';

const API_KEY = '25677336-52df653f6807abbcb11bbd90f';

export const fetchImagesAPI = async (searchQuery = '', currentPage = 1) => {
  try {
    const response = await axios('https://pixabay.com/api/', {
      params: {
        key: API_KEY,
        q: searchQuery,
        page: currentPage,
        per_page: 12,
        image_type: 'photo',
        orientation: 'horizontal',
      },
    });

    return response.data.hits;
  } catch (error) {
    console.log(error.message);
  }
};
