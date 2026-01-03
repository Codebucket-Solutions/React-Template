import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./style.scss";

const AutoSuggest = ({
    options = [],
    labelKey = "label",
    valueKey = "value",
    value = "",
    placeholder = "Search...",
    onChange,
    onSelect,
    disabled = false,
    className = "",
    containerClass = "",
    style = {},
    required = false,
    showLoader = false,
    filterDelay = 300
}) => {
    const [inputValue, setInputValue] = useState(value);
    const [filtered, setFiltered] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [loading, setLoading] = useState(false);
    const containerRef = useRef(null);
    const timerRef = useRef(null);

    // Sync value when controlled externally
    useEffect(() => {
        setInputValue(value);
    }, [value]);

    // Handle input change with debounce for loader
    const handleInputChange = (e) => {
        const newVal = e.target.value;
        setInputValue(newVal);
        onChange?.(newVal);

        // Clear previous timer
        if (timerRef.current) clearTimeout(timerRef.current);

        if (newVal.trim() === "") {
            setFiltered([]);
            setShowSuggestions(false);
            setLoading(false);
            return;
        }

        if (showLoader) setLoading(true);

        // Delay filtering to simulate async loading
        timerRef.current = setTimeout(() => {
            const filteredOptions = options.filter((opt) =>
                opt[labelKey].toLowerCase().includes(newVal.toLowerCase())
            );
            setFiltered(filteredOptions);
            setShowSuggestions(true);
            setLoading(false);
        }, filterDelay);
    };

    // Handle suggestion selection
    const handleSelect = (option) => {
        setInputValue(option[labelKey]);
        setShowSuggestions(false);
        onSelect?.(option[valueKey], option[labelKey]);
    };

    // Hide suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div
            className={`auto-suggest-container ${containerClass}`}
            ref={containerRef}
            style={style}
        >
            <input
                type="text"
                placeholder={placeholder}
                value={inputValue}
                onChange={handleInputChange}
                onFocus={() => setShowSuggestions(true)}
                disabled={disabled}
                className={`auto-suggest-input ${className}`}
                required={required}
            />

            {showLoader && loading && (
                <div className="auto-suggest-loader">
                </div>
            )}

            {showSuggestions && filtered.length > 0 && (
                <div className="auto-suggest-dropdown">
                    {filtered.map((opt, index) => (
                        <button
                            key={index + "autoSuggest"}
                            type="button"
                            className="auto-suggest-option"
                            onClick={() => handleSelect(opt)}
                        >
                            {opt[labelKey]}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

AutoSuggest.propTypes = {
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    labelKey: PropTypes.string,
    valueKey: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    onSelect: PropTypes.func,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    containerClass: PropTypes.string,
    style: PropTypes.object,
    required: PropTypes.bool,
    showLoader: PropTypes.bool,
    filterDelay: PropTypes.number,
};

export default AutoSuggest;
