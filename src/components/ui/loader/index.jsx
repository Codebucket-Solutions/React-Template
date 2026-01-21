import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import Typography from "@mui/material/Typography";
import { ScaleLoader } from "react-spinners";

export default function Loader({ active, loadingMessage }) {
    return (
        <Backdrop
            open={active}
            sx={{
                position: "fixed",   // 🔑 KEY FIX
                inset: 0,            // top:0 right:0 bottom:0 left:0
                zIndex: (theme) => theme.zIndex.modal + 999,
                flexDirection: "column",
                gap: 2,
                backgroundColor: "rgba(0,0,0,0.4)",
            }}
        >
            <ScaleLoader color="#613AF5" />
            {loadingMessage && (
                <Typography variant="body2" color="#fff">
                    {loadingMessage}
                </Typography>
            )}
        </Backdrop>
    );
}

Loader.propTypes = {
    active: PropTypes.bool,
    loadingMessage: PropTypes.string,
};
