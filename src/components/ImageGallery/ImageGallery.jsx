import ImageGalleryItem from 'components/ImageGalleryItem';
import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';

const ImageGallery = ({ images, showModal }) => (
  <ul className={s.gallery} id="gallery">
    {images.map(({ id, webformatURL, largeImageURL, tags }) => (
      <ImageGalleryItem
        key={id}
        webformatURL={webformatURL}
        tags={tags}
        onClick={() => showModal(largeImageURL)}
      />
    ))}
  </ul>
);

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
  showModal: PropTypes.func.isRequired,
};

export default ImageGallery;
