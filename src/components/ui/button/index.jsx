import PropTypes from 'prop-types';
import classes from "./styles.module.scss";

const Button = ({
    icon,
    button_text,
    icon_two,
    second_class,
    onClick,
    variant,
    type,
    disabled
}) => {
    return (
        <button 
            type={type} 
            disabled={disabled}
            onClick={onClick}
            className={`
                ${classes.button_primary} 
                ${classes[variant]} 
                ${second_class}
            `}
        >
            {icon}
            {button_text}
            {icon_two}
        </button>
    );
};

Button.propTypes = {
    icon: PropTypes.node,
    disabled: PropTypes.bool,
    button_text: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ]),
    icon_two: PropTypes.node,
    second_class: PropTypes.string,
    onClick: PropTypes.func,
    variant: PropTypes.string,
    type: PropTypes.oneOf(["button", "submit", "reset"])
};

export default Button;