import PropTypes from 'prop-types';

function Button({ onClick }) {
  return (
    <button onClick={onClick} className="Button">
      Load more
    </button>
  );
}
Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
