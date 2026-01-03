import LoadingOverlay from 'react-loading-overlay-ts';
import ScaleLoader from 'react-spinners/ScaleLoader';
import PropTypes from "prop-types";
export default function Loader({ active, children, loadingMessage }) {
  return (
    <LoadingOverlay
      active={active}
      spinner={<ScaleLoader color="#613AF5" />}
      text={loadingMessage}
      styles={{
        position: 'absolute',
        width: '100%',
        height: '100%'
      }}
    >
      {children}
    </LoadingOverlay>
  )
}
Loader.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node.isRequired,
  loadingMessage: PropTypes.string
};