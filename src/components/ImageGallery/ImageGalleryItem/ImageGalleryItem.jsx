import PropTypes from 'prop-types';

const ImageGalleryItem = ({ srcImg, tags, onClick }) => {
  return (
    <li onClick={onClick} className="ImageGalleryItem">
      <img className="ImageGalleryItem-image" src={srcImg} alt={tags} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  srcImg: PropTypes.string,
  tags: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
