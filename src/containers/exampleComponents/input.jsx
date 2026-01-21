import  { useState } from 'react';
import InputField from '../../components/ui/input';
import Button from '../../components/ui/button';
import styles from './styles.module.scss';
import {
    roleOptions,
    statusOptions,
    categoryOptions,
    countryOptions,
    tagOptions,
    skillOptions,
    priorityOptions,
    notificationOptions,
    cityOptions,
    productSearchOptions
} from './data';
import { Search } from '@mui/icons-material';

const InputExamples = () => {
    // Text inputs state
    const [textValue, setTextValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [numberValue, setNumberValue] = useState('');
    const [dateValue, setDateValue] = useState('');
    const [textareaValue, setTextareaValue] = useState('');

    // Select inputs state
    const [selectValue, setSelectValue] = useState('');
    const [multiSelectValue, setMultiSelectValue] = useState([]);
    const [pickyValue, setPickyValue] = useState([]);
    const [tagsPickyValue, setTagsPickyValue] = useState([]);

    // Radio/Checkbox state
    const [radioValue, setRadioValue] = useState('');
    const [checkboxValues, setCheckboxValues] = useState([]);
    const [singleCheckboxValue, setSingleCheckboxValue] = useState(false);

    // Search/AutoSuggest state
    const [searchValue, setSearchValue] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    // Range state
    const [rangeFrom, setRangeFrom] = useState('');
    const [rangeTo, setRangeTo] = useState('');
    const [numericRangeFrom, setNumericRangeFrom] = useState('');
    const [numericRangeTo, setNumericRangeTo] = useState('');

    // Error example
    const [errorInputValue, setErrorInputValue] = useState('');

    return (
        <div className={styles.exampleContainer}>
            {/* Basic Text Inputs */}
            <section className={styles.exampleSection}>
                <h2 className={styles.sectionTitle}>Basic Text Inputs</h2>
                <p className={styles.description}>
                    Standard text inputs with various types including text, email, password, number, and date.
                </p>

                <div className={styles.inputGroup}>
                    <InputField
                        type="text"
                        name="textInput"
                        title="Text Input"
                        placeholder="Enter text..."
                        value={textValue}
                        onChange={(e) => setTextValue(e.target.value)}
                    />

                    <InputField
                        type="email"
                        name="emailInput"
                        title="Email Input"
                        placeholder="Enter email..."
                        value={emailValue}
                        onChange={(e) => setEmailValue(e.target.value)}
                    />

                    <InputField
                        type="password"
                        name="passwordInput"
                        title="Password Input"
                        placeholder="Enter password..."
                        value={passwordValue}
                        onChange={(e) => setPasswordValue(e.target.value)}
                        showEye
                    />

                    <InputField
                        type="number"
                        name="numberInput"
                        title="Number Input"
                        placeholder="Enter number..."
                        value={numberValue}
                        onChange={(e) => setNumberValue(e.target.value)}
                        min={0}
                        max={100}
                        step={1}
                    />

                    <InputField
                        type="date"
                        name="dateInput"
                        title="Date Input"
                        value={dateValue}
                        onChange={(e) => setDateValue(e.target.value)}
                    />

                    <InputField
                        type="text"
                        name="disabledInput"
                        title="Disabled Input"
                        placeholder="This is disabled..."
                        value="Disabled value"
                        disabled
                    />
                </div>
            </section>

            {/* Input with Validation */}
            <section className={styles.exampleSection}>
                <h2 className={styles.sectionTitle}>Input with Validation</h2>
                <p className={styles.description}>
                    Inputs can display error messages and hints for validation feedback.
                </p>

                <div className={styles.inputGroup}>
                    <InputField
                        type="text"
                        name="requiredInput"
                        title="Required Input *"
                        placeholder="This field is required"
                        value={errorInputValue}
                        onChange={(e) => setErrorInputValue(e.target.value)}
                        required
                        error={errorInputValue.length === 0 ? "" : errorInputValue.length < 3 ? "Input must be at least 3 characters" : ""}
                    />

                    <InputField
                        type="email"
                        name="emailValidation"
                        title="Email with Hint"
                        placeholder="Enter your email..."
                        value={emailValue}
                        onChange={(e) => setEmailValue(e.target.value)}
                        hint="We'll never share your email with anyone else."
                    />
                </div>
            </section>

            {/* Textarea */}
            <section className={styles.exampleSection}>
                <h2 className={styles.sectionTitle}>Textarea</h2>
                <p className={styles.description}>
                    Textarea for multi-line text input with character counter.
                </p>

                <div className={styles.inputGroup}>
                    <InputField
                        type="textarea"
                        name="textareaInput"
                        title="Description"
                        placeholder="Enter description..."
                        value={textareaValue}
                        onChange={(e) => setTextareaValue(e.target.value)}
                        rows={4}
                        maxLength={500}
                    />

                    <InputField
                        type="textarea"
                        name="textareaNoCounter"
                        title="Textarea without Counter"
                        placeholder="Enter notes..."
                        value=""
                        onChange={() => { }}
                        rows={3}
                        hideCharCount
                    />
                </div>
            </section>

            {/* Select Inputs */}
            <section className={styles.exampleSection}>
                <h2 className={styles.sectionTitle}>Select Inputs</h2>
                <p className={styles.description}>
                    Different types of select inputs: single select, multi-select (React Select), and Picky multi-select.
                </p>

                <h3 className={styles.sectionSubtitle}>Single Select</h3>
                <div className={styles.inputGroup}>
                    <InputField
                        type="select"
                        name="roleSelect"
                        title="Select Role"
                        placeholder="Choose a role..."
                        value={selectValue}
                        onChange={(e) => setSelectValue(e.target.value)}
                        options={roleOptions}
                        optionValue="value"
                        optionLabel="label"
                    />

                    <InputField
                        type="select"
                        name="statusSelect"
                        title="Select Status"
                        placeholder="Choose a status..."
                        options={statusOptions}
                        optionValue="value"
                        optionLabel="label"
                    />

                    <InputField
                        type="select"
                        name="disabledSelect"
                        title="Disabled Select"
                        placeholder="Choose..."
                        options={categoryOptions}
                        optionValue="value"
                        optionLabel="label"
                        disabled
                    />
                </div>

                <h3 className={styles.sectionSubtitle}>Multi Select (React Select)</h3>
                <div className={styles.inputGroup}>
                    <InputField
                        type="select multiple"
                        name="countryMultiSelect"
                        title="Select Countries"
                        placeholder="Choose countries..."
                        value={multiSelectValue}
                        onChange={(selected) => setMultiSelectValue(selected)}
                        options={countryOptions}
                        optionValue="value"
                        optionLabel="label"
                    />

                    <InputField
                        type="select multiple"
                        name="categoryMultiSelect"
                        title="Select Categories"
                        placeholder="Choose categories..."
                        options={categoryOptions}
                        optionValue="value"
                        optionLabel="label"
                        isDark={false}
                    />
                </div>

                <h3 className={styles.sectionSubtitle}>Picky Multi Select</h3>
                <div className={styles.inputGroup}>
                    <InputField
                        type="select multiple picky"
                        name="skillsPicky"
                        title="Select Skills"
                        value={pickyValue}
                        onChange={(selected) => setPickyValue(selected)}
                        options={skillOptions}
                        optionValue="id"
                        optionLabel="name"
                    />

                    <InputField
                        type="select multiple picky"
                        name="tagsPicky"
                        title="Select Tags"
                        value={tagsPickyValue}
                        onChange={(selected) => setTagsPickyValue(selected)}
                        options={tagOptions}
                        optionValue="id"
                        optionLabel="name"
                    />
                </div>
            </section>

            {/* Radio Buttons */}
            <section className={styles.exampleSection}>
                <h2 className={styles.sectionTitle}>Radio Buttons</h2>
                <p className={styles.description}>
                    Radio buttons for single selection from a group of options.
                </p>

                <div className={styles.inputGroup}>
                    <InputField
                        type="radio"
                        name="priorityRadio"
                        title="Select Priority"
                        value={radioValue}
                        onChange={(e) => setRadioValue(e.target.value)}
                        options={priorityOptions}
                        optionValue="value"
                        optionLabel="label"
                    />
                </div>
            </section>

            {/* Checkboxes */}
            <section className={styles.exampleSection}>
                <h2 className={styles.sectionTitle}>Checkboxes</h2>
                <p className={styles.description}>
                    Checkboxes for multiple selections or single boolean toggles.
                </p>

                <h3 className={styles.sectionSubtitle}>Multiple Checkboxes</h3>
                <div className={styles.inputGroup}>
                    <InputField
                        type="checkbox"
                        name="notificationsCheckbox"
                        title="Notification Preferences"
                        value={checkboxValues}
                        onChange={(e) => {
                            const val = e.target.value;
                            setCheckboxValues(prev =>
                                prev.includes(val)
                                    ? prev.filter(v => v !== val)
                                    : [...prev, val]
                            );
                        }}
                        options={notificationOptions}
                        optionValue="value"
                        optionLabel="label"
                    />
                </div>

                <h3 className={styles.sectionSubtitle}>Single Checkbox</h3>
                <div className={styles.inputGroup}>
                    <InputField
                        type="single-checkbox"
                        name="termsCheckbox"
                        value={singleCheckboxValue}
                        onChange={(e) => setSingleCheckboxValue(e.target.checked)}
                        label="I agree to the Terms and Conditions"
                    />

                </div>
            </section>

            {/* Search / AutoSuggest */}
            <section className={styles.exampleSection}>
                <h2 className={styles.sectionTitle}>Search / AutoSuggest</h2>
                <p className={styles.description}>
                    Auto-complete search inputs with suggestion dropdowns.
                </p>

                <div className={styles.inputGroup}>
                    <InputField
                        type="search"
                        name="citySearch"
                        title="Search City"
                        placeholder="Type to search cities..."
                        value={searchValue}
                        onChange={(val) => setSearchValue(val)}
                        handleSelect={(val, label) => {
                            setSelectedCity(label);
                            setSearchValue(label);
                        }}
                        options={cityOptions}
                        optionValue="value"
                        optionLabel="label"
                        loader
                    />

                    <InputField
                        type="search"
                        name="productSearch"
                        title="Search Products"
                        placeholder="Search for products..."
                        options={productSearchOptions}
                        optionValue="value"
                        optionLabel="label"
                    />
                </div>

                {selectedCity && (
                    <div className={styles.highlight}>
                        <p><strong>Selected City:</strong> {selectedCity}</p>
                    </div>
                )}
            </section>

            {/* Range Inputs */}
            <section className={styles.exampleSection}>
                <h2 className={styles.sectionTitle}>Range Inputs</h2>
                <p className={styles.description}>
                    Range inputs for specifying value ranges (From - To).
                </p>

                <h3 className={styles.sectionSubtitle}>Text Range</h3>
                <div className={styles.rangeContainer}>
                    <InputField
                        type="range"
                        name="textRangeFrom"
                        title="Date Range"
                        placeholder="From"
                        value={rangeFrom}
                        valueRight={rangeTo}
                        nameRight="textRangeTo"
                        onChange={(e, section) => {
                            if (section === 'left') setRangeFrom(e.target.value);
                            else setRangeTo(e.target.value);
                        }}
                    />
                </div>

                <h3 className={styles.sectionSubtitle}>Numeric Range</h3>
                <div className={styles.rangeContainer}>
                    <InputField
                        type="numeric range"
                        name="priceRangeFrom"
                        title="Price Range"
                        placeholder="From"
                        value={numericRangeFrom}
                        valueRight={numericRangeTo}
                        nameRight="priceRangeTo"
                        step={0.01}
                        onChange={(e, section) => {
                            if (section === 'left') setNumericRangeFrom(e.target.value);
                            else setNumericRangeTo(e.target.value);
                        }}
                    />
                </div>
            </section>

            {/* Form Example */}
            <section className={styles.exampleSection}>
                <h2 className={styles.sectionTitle}>Complete Form Example</h2>
                <p className={styles.description}>
                    A complete form using various input types together.
                </p>

                <form onSubmit={(e) => { e.preventDefault(); alert('Form submitted!'); }}>
                    <div className={styles.formGrid}>
                        <InputField
                            type="text"
                            name="firstName"
                            title="First Name *"
                            placeholder="Enter first name..."
                            required
                        />

                        <InputField
                            type="text"
                            name="lastName"
                            title="Last Name *"
                            placeholder="Enter last name..."
                            required
                        />

                        <InputField
                            type="email"
                            name="formEmail"
                            title="Email Address *"
                            placeholder="Enter email..."
                            required
                        />

                        <InputField
                            type="text"
                            name="phone"
                            title="Phone Number"
                            placeholder="Enter phone..."
                        />

                        <InputField
                            type="select"
                            name="formCountry"
                            title="Country"
                            placeholder="Select country..."
                            options={countryOptions}
                            optionValue="value"
                            optionLabel="label"
                        />

                        <InputField
                            type="select"
                            name="formRole"
                            title="Role"
                            placeholder="Select role..."
                            options={roleOptions}
                            optionValue="value"
                            optionLabel="label"
                        />

                        <div className={styles.fullWidth}>
                            <InputField
                                type="textarea"
                                name="formBio"
                                title="Bio"
                                placeholder="Tell us about yourself..."
                                rows={3}
                                maxLength={300}
                            />
                        </div>

                       
                    </div>

                    <div className={styles.buttonGroup} style={{ marginTop: '1.5rem' }}>
                        <Button
                            type="submit"
                            variant="button_purple"
                            button_text="Submit Form"
                        />
                        <Button
                            type="reset"
                            variant="bordered_three"
                            button_text="Reset"
                        />
                    </div>
                </form>
            </section>
        </div>
    );
};

export default InputExamples;