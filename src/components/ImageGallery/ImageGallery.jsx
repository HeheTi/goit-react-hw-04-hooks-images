import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem';

const ImageGallery = ({ pictures, onClickImage }) => {
  return (
    <ul className="ImageGallery">
      {pictures.map(({ webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={webformatURL}
          onClick={() => onClickImage(largeImageURL, tags)}
          srcImg={webformatURL}
          tags={tags}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  pictures: PropTypes.array,
  onClickImage: PropTypes.func,
};

export default ImageGallery;
