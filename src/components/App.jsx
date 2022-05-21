import { useState, useEffect } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from './Modal';
import { fetchImagesAPI } from 'services/images-api';
import Loader from 'react-js-loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    if (!searchQuery) return;

    const fetchImages = async () => {
      try {
        setIsLoading(true);

        const images = await fetchImagesAPI(searchQuery, currentPage);
        setImages(prevImages => [...prevImages, ...images]);

        if (images.length === 0) return toast.warn('Sorry, no such images.');
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [currentPage, searchQuery]);

  const updatePage = () => setCurrentPage(prevPage => prevPage + 1);

  const onFormSubmit = query => {
    if (query === searchQuery && currentPage === 1) return;

    setSearchQuery(query);
    setCurrentPage(1);
    setImages([]);
    setError(null);
  };

  const toggleModal = (src = '') => setSelectedImage(src);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: '16px',
        paddingBottom: '24px',
      }}
    >
      {error && <p>{error}</p>}

      <Searchbar onSubmit={onFormSubmit} />
      <ImageGallery images={images} showModal={toggleModal} />
      {isLoading && <Loader type="bubble-loop" size={60} bgColor="blue" />}
      {images.length > 0 && !isLoading && (
        <Button onClick={updatePage}>Load more</Button>
      )}

      {selectedImage && <Modal onClose={toggleModal} src={selectedImage} />}
      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default App;
