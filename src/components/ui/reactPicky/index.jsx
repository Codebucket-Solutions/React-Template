import { useEffect, useState } from 'react';
import './picky.css';
import { Picky } from 'react-picky';
import PropTypes from 'prop-types';
const ReactPicky = (props) => {
    const [isRightSide, setIsRightSide] = useState(false);

    useEffect(() => {
        const checkScreenSide = () => {
            const screenWidth = window.innerWidth;
            const element = document.getElementById(props.name);
            if (element) {
                const rect = element.getBoundingClientRect();
                setIsRightSide(rect.right > screenWidth / 2);
            }
        };

        checkScreenSide();
        window.addEventListener('resize', checkScreenSide);

        return () => {
            window.removeEventListener('resize', checkScreenSide);
        };
    }, [props.name]);

    return (
        <Picky
            value={props.value}
            onChange={props.onChange}
            options={props.options}
            numberDisplayed={0}
            valueKey="id"
            labelKey="name"
            multiple={true}
            includeSelectAll={true}
            includeFilter={true}
            className={`multiSelectControl ${isRightSide ? 'left-side' : 'right-side'}`}
            name={props.name}
        />
    );
};
ReactPicky.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
        PropTypes.string,
        PropTypes.number
    ]),
    options: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            name: PropTypes.string.isRequired
        })
    ).isRequired,
};
export default ReactPicky;
