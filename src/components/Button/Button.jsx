import PropTypes from 'prop-types';
import s from './Button.module.css';

const Button = ({ onClick, children }) => (
  <button type="button" className={s.button} onClick={onClick}>
    {children}
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
