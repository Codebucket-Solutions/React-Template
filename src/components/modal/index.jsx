import React from "react";
import PropTypes from "prop-types";
import Modal from "@mui/material/Modal";
import classes from "./styles.module.scss";

const CustomModal = ({
    open,
    onClose,
    children,
    title,
    showCloseIcon = true,
    width = "640px",
    minWidth,
    maxWidth = "90%",
    height,
    minHeight,
    maxHeight = "none",
    className = "",
    headerClassName = "",
    bodyClassName = "",
    footerClassName = "",
    footer,
    showHeader = true,
    closeOnBackdropClick = true,
    padding,
    borderRadius = "12px",
    backgroundColor = "#ffffff"
}) => {
    const handleClose = (event, reason) => {
        if (!closeOnBackdropClick && reason === "backdropClick") return;
        onClose(event, reason);
    };

    const contentStyle = {
        width,
        maxWidth,
        ...(minWidth && { minWidth }),
        ...(height && { height }),
        ...(minHeight && { minHeight }),
        ...(maxHeight && { maxHeight }),
        borderRadius,
        backgroundColor,
        overflow: "visible"
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            disablePortal={true}
        >
            <div className={classes.modal_container}>
                <div
                    className={`${classes.modal_content} ${className}`}
                    style={contentStyle}
                >
                    {showCloseIcon && (
                        <button
                            className={classes.close_button}
                            onClick={onClose}
                        >
                            <span className={classes.close_icon}>×</span>
                        </button>
                    )}

                    {showHeader && title && (
                        <div className={`${classes.modal_header} ${headerClassName}`}>
                            <h2 className={classes.modal_title}>{title}</h2>
                        </div>
                    )}

                    <div
                        className={`${classes.modal_body} ${bodyClassName}`}
                        style={padding ? { padding } : undefined}
                    >
                        {children}
                    </div>

                    {footer && (
                        <div className={`${classes.modal_footer} ${footerClassName}`}>
                            {footer}
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    );
};

CustomModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node,
    title: PropTypes.string,
    showCloseIcon: PropTypes.bool,
    width: PropTypes.string,
    minWidth: PropTypes.string,
    maxWidth: PropTypes.string,
    height: PropTypes.string,
    minHeight: PropTypes.string,
    maxHeight: PropTypes.string,
    className: PropTypes.string,
    headerClassName: PropTypes.string,
    bodyClassName: PropTypes.string,
    footerClassName: PropTypes.string,
    footer: PropTypes.node,
    showHeader: PropTypes.bool,
    closeOnBackdropClick: PropTypes.bool,
    padding: PropTypes.string,
    borderRadius: PropTypes.string,
    backgroundColor: PropTypes.string,
};

export default CustomModal;
