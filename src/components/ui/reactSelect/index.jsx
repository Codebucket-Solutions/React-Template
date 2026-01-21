import React from "react";
import PropTypes from "prop-types";
import Select from 'react-select';
const MySelect = React.forwardRef((props, ref) => {
    const customStyles = {
        control: base => ({
            ...base,
            maxHeight: '65px',
            overflow: 'auto'
        }),
        placeholder: (base) => ({
            ...base,
            color: "black",
            fontWeight: "600",
            fontSize: "14px"
        }),
        option: (base) => ({
            ...base,
            color: "black",
            fontWeight: "600",
            fontSize: "14px",
            textAlign: "left"
        }),
        multiValue: (base) => ({
            ...base,
            color: "black",
            fontWeight: "600",
            fontSize: "14px"
        }),
    };

    const customStylesDark = {
        control: (provided, state) => ({
            ...provided,
            backgroundColor: "#1e1e1e",
            borderColor: state.isFocused ? "#777" : "#333",
            color: "#fff",
            boxShadow: state.isFocused ? "0 0 5px rgba(255, 255, 255, 0.2)" : "none",
            "&:hover": { borderColor: "#777" },
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: "#222",
        }),
        option: (provided, { isFocused, isSelected }) => {
            let bgColor;
            if (isSelected) {
                bgColor = "#555";
            } else if (isFocused) {
                bgColor = "#444";
            } else {
                bgColor = "#222";
            }
            return {
                ...provided,
                backgroundColor: bgColor,
                color: isSelected ? "#fff" : "#ccc",
                cursor: "pointer",
                textAlign: "left",
                "&:hover": { backgroundColor: "#444", color: "#fff" },
            }
        },
        singleValue: (provided) => ({
            ...provided,
            color: "#fff",
        }),
        multiValue: (provided) => ({
            ...provided,
            backgroundColor: "#000",
            borderRadius: "4px",
        }),
        multiValueLabel: (provided) => ({
            ...provided,
            color: "#fff",
        }),
        multiValueRemove: (provided) => ({
            ...provided,
            color: "#aaa",
            "&:hover": {
                backgroundColor: "#333",
                color: "#fff",
            },
        }),
        placeholder: (provided) => ({
            ...provided,
            color: "#",
        }),
        dropdownIndicator: (provided) => ({
            ...provided,
            color: "#aaa",
            "&:hover": { color: "#fff" },
        }),
        indicatorSeparator: () => ({ display: "none" }),
    };


    if (props.allowSelectAll) {
        return (

            <Select
                {...props}
                ref={ref}
                isMulti={true}
                styles={props.isDark ? customStylesDark : customStyles}
                options={[...props.options]}
                onKeyDown={props.handleKeyDown}
                handleKeyUp={props.handleKeyUp}
                required={props.required}
                placeholder={props.placeholder}
                menuPlacement={"auto"}
                isDisabled={props.isDisabled}
                onChange={props.onChange}
                className={props.className}
            />

        );
    }

    return <Select {...props} styles={props.isDark ? customStylesDark : customStyles} ref={ref} />;
});

MySelect.propTypes = {
    isDisabled: PropTypes.bool,
    options: PropTypes.array,
    value: PropTypes.any,
    onChange: PropTypes.func,
    allowSelectAll: PropTypes.bool,
    allOption: PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string
    }),
    required: PropTypes.bool,
    isMulti: PropTypes.bool,
    isDark: PropTypes.bool,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    handleKeyDown: PropTypes.func,
    handleKeyUp: PropTypes.func
};


MySelect.defaultProps = {
    allOption: {
        label: "Select all",
        value: "*"
    },
    isMulti: true,
    isDark: false,
    isDisabled: false,
    placeholder: "Select...",
};

export default MySelect;
