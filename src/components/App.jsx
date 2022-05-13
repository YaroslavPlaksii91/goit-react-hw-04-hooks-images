import { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from './Modal';
import imagesApi from 'services/images-api';
import Loader from 'react-js-loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const api = new imagesApi();

class App extends Component {
  state = {
    images: [],
    query: '',
    error: null,
    isLoading: false,
    showModal: false,
    url: '',
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      try {
        this.setState({ isLoading: true });
        api.resetPage();
        api.searchQuery = this.state.query;
        const images = await api.fetchImages();
        this.setState({ images });
        if (images.length === 0) return toast.warn('Sorry, no such images.');
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  onLoadMoreClick = async () => {
    try {
      this.setState({ isLoading: true });
      api.incrementPage();
      const images = await api.fetchImages();
      this.setState(prevState => ({
        images: [...prevState.images, ...images],
      }));
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  onFormSubmit = query => {
    this.setState({ query });
  };

  toggleModal = url => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      url,
    }));
  };

  render() {
    const { images, url, showModal, isLoading, error } = this.state;

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px',
        }}
      >
        {error && <div>{error.message}</div>}
        <Searchbar onSubmit={this.onFormSubmit} />
        <ImageGallery images={images} showModal={this.toggleModal} />
        {isLoading && <Loader type="bubble-loop" size={60} bgColor="blue" />}
        {images.length > 0 && !isLoading && (
          <Button onClick={this.onLoadMoreClick} />
        )}
        {showModal && <Modal onClose={this.toggleModal} url={url} />}
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}

export default App;
