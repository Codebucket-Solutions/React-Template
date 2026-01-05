import { useRef, useEffect, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import ReactSelect from "../reactSelect";
import ReactPicky from "../reactPicky";
import classes from "./styles.module.scss";
import PropTypes from "prop-types";
import AutoSuggest from "../autoSuggest";
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
const InputField = ({
    type = "text",
    title,
    min,
    max,
    step,
    name,
    className = "",
    placeholder,
    value,
    defaultValue,
    required,
    disabled,
    options,
    optionValue = "value",
    optionLabel = "label",
    onChange,
    error,
    forms,
    hint,
    ...props
}) => {
    const inputRef = useRef(null);

    // Prevent scroll on number inputs
    useEffect(() => {
        const preventScroll = (e) => e.preventDefault();
        const current = inputRef.current;
        current?.addEventListener("wheel", preventScroll);
        return () => current?.removeEventListener("wheel", preventScroll);
    }, []);

    const handleChange = (e, section) => {
        if (type === "number" && e.target.value < 0) return;
        onChange?.(e, section);
    };

    const blurOnWheel = (e) => e.currentTarget.blur();

    const getOptions = (idKey, nameKey) =>
        options?.map((opt) => ({
            value: opt[idKey],
            label: opt[nameKey],
        })) || [];

    const getPickyOptions = (idKey, nameKey) =>
        options?.map((opt) => ({
            id: opt[idKey],
            name: opt[nameKey],
        })) || [];

    // === Render Types ===
    const renderTextarea = () => (
        <>
            <textarea
                className={`${classes.formInput} ${classes.textareaDiv} ${className}`}
                placeholder={placeholder}
                value={value ?? undefined}
                defaultValue={value == null ? defaultValue : undefined}
                required={required}
                disabled={disabled}
                name={name}
                rows={props.rows || 4}
                style={{ height: "auto", ...props.style }}
                onChange={handleChange}
                res
                {...forms}
            />
            {!props.hideCharCount && (
                <span className={classes.textCount}>
                    {value?.length}/{props.maxLength ?? 500}
                </span>
            )}
            {error && <span className={classes.errorText}>{error}</span>}
        </>
    );

    const renderSelect = (multiple = false) => (
        <select
            className={`${classes.formInput} ${classes.select} ${className}`}
            value={value ?? undefined}
            defaultValue={value == null ? defaultValue : undefined}
            onChange={handleChange}
            name={name}
            required={required}
            disabled={disabled}
            multiple={multiple}
            {...forms}
            style={props.style}
        >
            {placeholder && !multiple && <option value="">{placeholder}</option>}
            {options?.map((o, i) => (
                <option key={i + "multiple"} value={o[optionValue]}>
                    {o[optionLabel]}
                </option>
            ))}
        </select>

    );

    const renderReactSelect = () => (
        <ReactSelect
            hideTitle
            options={getOptions(optionValue, optionLabel)}
            isMulti
            allowSelectAll
            value={value}
            onChange={handleChange}
            isDisabled={disabled}
            placeholder={placeholder}
            required={required}
            className={className}
            isDark={props.isDark}
        />
    );

    const renderReactPicky = () => (
        <ReactPicky
            hideTitle
            options={getPickyOptions(optionValue, optionLabel)}
            isMulti
            allowSelectAll
            value={value}
            onChange={handleChange}
            isDisabled={disabled}
        />
    );

    const renderRadioOrCheckbox = (isCheckbox = false) => (
        <div className={classes.radio}>
            {options?.map((opt, i) => (
                <label key={i + "radio"} className={classes.check_text}>
                    <input
                        type={isCheckbox ? "checkbox" : "radio"}
                        className={classes.checkbox}
                        name={name}
                        value={opt[optionValue]}
                        required={required}
                        disabled={disabled}
                        checked={
                            isCheckbox
                                ? value?.includes(opt[optionValue])
                                : opt[optionValue] === value
                        }
                        onChange={handleChange}
                        {...forms}
                    />
                    {opt[optionLabel]}
                </label>
            ))}
        </div>
    );

    const renderSingleCheckbox = () => (
        <div className={classes.radio}>
            <label className={classes.check_text}>
                <input
                    type="checkbox"
                    className={classes.checkbox}
                    name={name}
                    checked={!!value}
                    onChange={handleChange}
                    required={required}
                    disabled={disabled}
                    {...forms}
                />
                {props.label && <span className={props.labelClass}>{props.label}</span>}
            </label>
        </div>
    );

    const renderSearchInput = () => (
        <AutoSuggest
            options={options || []}
            value={value || ""}
            onChange={(val) => {
                onChange?.(val);
            }}
            onSelect={(val, label) => {
                props.handleSelect?.(val, label);
            }}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            className={classes.formInput}
            containerClass={classes.inputSection}
            style={props.style}
            showLoader={props.loader}
            labelKey={optionLabel}
            valueKey={optionValue}
        />
    );



    const renderRange = (isNumeric = false) => (
        <>
            <input
                type={isNumeric ? "number" : "text"}
                placeholder="From"
                className={`${classes.formInput} ${className}`}
                onChange={(e) => handleChange(e, "left")}
                value={value ?? ""}
                min={0}
                step={step}
                required={required}
                disabled={disabled}
                name={name}
                style={props.style}
                onWheel={blurOnWheel}
                {...forms}
            />
            <input
                type={isNumeric ? "number" : "text"}
                placeholder="To"
                className={`${classes.formInput} ${className}`}
                onChange={(e) => handleChange(e, "right")}
                value={props?.valueRight ?? ""}
                min={0}
                step={step}
                required={required}
                disabled={disabled}
                name={props?.nameRight}
                style={props.style}
                onWheel={blurOnWheel}
                {...forms}
            />
        </>
    );
    const [eyeState, setEyeState] = useState(false)
    const handleEyeClick = () => {
        setEyeState(!eyeState)
    }
    const renderDefaultInput = () => (
        <>
            <input
                ref={inputRef}
                type={eyeState ? "text" : type}
                className={`${classes.formInput} ${className}`}
                placeholder={placeholder}
                min={min}
                max={max}
                step={step}
                name={name}
                value={value ?? ""}
                defaultValue={value == null ? defaultValue : undefined}
                required={required}
                disabled={disabled}
                style={props.style}
                onChange={handleChange}
                onWheel={blurOnWheel}
                {...forms}
                {...props.extra}
            />
            {error && <span className={classes.errorText}>{error}</span>}
            {props.showEye && (
                <button type="button" className={classes.eye} onClick={handleEyeClick}>
                    {eyeState ? <Visibility /> : <VisibilityOff />}
                </button>
            )}
        </>
    );

    // === Final Render ===
    const renderByType = () => {
        switch (type) {
            case "textarea":
                return renderTextarea();
            case "select":
            case "select single":
                return renderSelect(false);
            case "select multiple":
                return renderReactSelect();
            case "select multiple picky":
                return renderReactPicky();
            case "radio":
                return renderRadioOrCheckbox(false);
            case "checkbox":
                return renderRadioOrCheckbox(true);
            case "single-checkbox":
                return renderSingleCheckbox();
            case "search":
            case "search single":
            case "search multiple":
                return renderSearchInput();
            case "range":
                return renderRange(false);
            case "numeric range":
                return renderRange(true);
            default:
                return renderDefaultInput();
        }
    };

    return (
        <div
            className={`${classes.inputSection} ${props.sectionClass}`}
            style={{
                position: "relative",
                display: type === "radio" ? "flex" : "block",
                ...props.divClass,
            }}
        >
            {title && <label htmlFor={name}>{title}</label>}
            {renderByType()}
            {hint && (
                <p className={classes.hint}>
                    <InfoOutlineIcon />
                    {hint}
                </p>
            )}
        </div>
    );
};
InputField.propTypes = {
    // General props
    label: PropTypes.string,
    type: PropTypes.string,
    title: PropTypes.string,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.any,
    defaultValue: PropTypes.any,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    min: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    max: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    step: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    className: PropTypes.string,
    sectionClass: PropTypes.string,
    divClass: PropTypes.object,
    style: PropTypes.object,
    extra: PropTypes.object,
    error: PropTypes.string,
    showEye: PropTypes.bool,
    handleEyeClick: PropTypes.func,
    hideCharCount: PropTypes.bool,
    maxLength: PropTypes.number,
    valueRight: PropTypes.any,
    nameRight: PropTypes.string,

    // Options for selects, radios, checkboxes, and search
    options: PropTypes.arrayOf(PropTypes.object),
    optionValue: PropTypes.string,
    optionLabel: PropTypes.string,
    handleSelect: PropTypes.func,

    // Event handlers
    onChange: PropTypes.func,

    // Loader & AutoSuggest specific
    loader: PropTypes.bool,
    showLoader: PropTypes.bool,
    filterDelay: PropTypes.number,

    // For ReactSelect / ReactPicky
    isDark: PropTypes.bool,
    rows: PropTypes.number,
    labelClass: PropTypes.string,
    hint: PropTypes.string,
    // Forms props for spreading
    forms: PropTypes.object,
};
export default InputField;
