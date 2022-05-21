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
    if (!searchQuery) {
      return;
    }

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

  const updatePage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const onFormSubmit = query => {
    if (query === searchQuery && currentPage === 1) return;
    setSearchQuery(query);
    setCurrentPage(1);
    setImages([]);
    setError(null);
  };

  const toggleModal = (src = '') => {
    setSelectedImage(src);
  };

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

// class oldApp extends Component {
//   state = {
//     images: [],
//     searchQuery: '',
//     error: null,
//     currentPage: 1,
//     isLoading: false,
//     showModal: false,
//     selectedImage: '',
//   };

//   async componentDidUpdate(prevProps, prevState) {
//     if (prevState.searchQuery !== this.state.searchQuery) {
//       this.fetchImages();
//     }
//   }

//   onFormSubmit = query => {
//     this.setState({
//       searchQuery: query,
//       currentPage: 1,
//       images: [],
//       error: null,
//     });
//   };

//   fetchImages = async () => {
//     try {
//       const { currentPage, searchQuery } = this.state;

//       this.setState({ isLoading: true });

//       const images = await fetchImagesAPI(searchQuery, currentPage);
//       this.setState(prevState => ({
//         images: [...prevState.images, ...images],
//         currentPage: prevState.currentPage + 1,
//       }));

//       if (images.length === 0) return toast.warn('Sorry, no such images.');
//     } catch (error) {
//       this.setState({ error });
//     } finally {
//       this.setState({ isLoading: false });
//     }
//   };

//   toggleModal = (src = '') => {
//     this.setState(({ showModal }) => ({
//       showModal: !showModal,
//       selectedImage: src,
//     }));
//   };

//   render() {
//     const { images, isLoading, error, selectedImage, showModal } = this.state;

//     return (
//       <div
//         style={{
//           display: 'grid',
//           gridTemplateColumns: '1fr',
//           gridGap: '16px',
//           paddingBottom: '24px',
//         }}
//       >
//         {error && <p>{error.message}</p>}

//         <Searchbar onSubmit={this.onFormSubmit} />
//         <ImageGallery images={images} showModal={this.toggleModal} />
//         {isLoading && <Loader type="bubble-loop" size={60} bgColor="blue" />}
//         {images.length > 0 && !isLoading && (
//           <Button onClick={this.fetchImages}>Load more</Button>
//         )}

//         {showModal && <Modal onClose={this.toggleModal} src={selectedImage} />}
//         <ToastContainer autoClose={3000} />
//       </div>
//     );
//   }
// }

export default App;
