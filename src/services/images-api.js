import axios from 'axios';

const API_KEY = '25677336-52df653f6807abbcb11bbd90f';

export default class imagesApi {
  constructor() {
    this.page = 1;
    this.searchQuery = '';
  }

  async fetchImages() {
    try {
      const response = await axios('https://pixabay.com/api/', {
        params: {
          key: API_KEY,
          q: this.searchQuery,
          page: this.page,
          per_page: 12,
          image_type: 'photo',
          orientation: 'horizontal',
        },
      });

      return response.data.hits;
    } catch (error) {
      console.log(error.message);
    }
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}
