import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ webformatURL, tags, onClick }) => (
  <li className={s.galleryItem} onClick={onClick}>
    <img src={webformatURL} alt={tags} className={s.image} />
  </li>
);

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
