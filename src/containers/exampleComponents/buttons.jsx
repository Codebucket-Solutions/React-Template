import React, { useState } from 'react';
import Button from '../../components/ui/button';
import CustomModal from '../../components/modal';
import styles from './styles.module.scss';
import { Add, Delete, Edit, Save, Search, Send, Download, Upload, ArrowForward, ArrowBack, Check, Close, Refresh, Settings, Visibility, FilterList } from '@mui/icons-material';

const ButtonsExamples = () => {
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const handleLoadingClick = () => {
        setLoading(true);
        setTimeout(() => setLoading(false), 2000);
    };

    return (
        <div className={styles.exampleContainer}>
            {/* Primary Buttons */}
            <section className={styles.exampleSection}>
                <h2 className={styles.sectionTitle}>Primary Buttons</h2>
                <p className={styles.description}>
                    Primary buttons are used for main actions. Use variant props to apply different styles.
                </p>

                <h3 className={styles.sectionSubtitle}>Solid Buttons</h3>
                <div className={styles.buttonGroup}>
                    <Button
                        variant="button_purple"
                        button_text="Purple Button"
                    />
                    <Button
                        variant="primary"
                        button_text="Primary"
                    />
                    <Button
                        variant="button_success"
                        button_text="Success"
                    />
                    <Button
                        variant="button_danger"
                        button_text="Danger"
                    />
                    <Button
                        variant="warning"
                        button_text="Warning"
                    />
                </div>

                <h3 className={styles.sectionSubtitle}>Outlined Buttons</h3>
                <div className={styles.buttonGroup}>
                    <Button
                        variant="primary_outline"
                        button_text="Primary Outline"
                    />
                    <Button
                        variant="button_danger_outline"
                        button_text="Danger Outline"
                    />
                    <Button
                        variant="warning_outline"
                        button_text="Warning Outline"
                    />
                    <Button
                        variant="bordered_one"
                        button_text="Bordered One"
                    />
                    <Button
                        variant="bordered_two"
                        button_text="Bordered Two"
                    />
                    <Button
                        variant="bordered_three"
                        button_text="Bordered Three"
                    />
                </div>

                <h3 className={styles.sectionSubtitle}>Special Buttons</h3>
                <div className={styles.buttonGroup}>
                    <Button
                        variant="bordered_four"
                        button_text="Shadow Button"
                    />
                    <Button
                        variant="search_button"
                        button_text="Search"
                        icon={<Search fontSize="small" />}
                    />
                </div>
            </section>

            {/* Buttons with Icons */}
            <section className={styles.exampleSection}>
                <h2 className={styles.sectionTitle}>Buttons with Icons</h2>
                <p className={styles.description}>
                    Buttons can include icons on the left (icon prop) or right (icon_two prop) side.
                </p>

                <h3 className={styles.sectionSubtitle}>Left Icon</h3>
                <div className={styles.buttonGroup}>
                    <Button
                        variant="button_purple"
                        button_text="Add New"
                        icon={<Add fontSize="small" />}
                    />
                    <Button
                        variant="primary"
                        button_text="Edit"
                        icon={<Edit fontSize="small" />}
                    />
                    <Button
                        variant="button_danger"
                        button_text="Delete"
                        icon={<Delete fontSize="small" />}
                    />
                    <Button
                        variant="button_success"
                        button_text="Save"
                        icon={<Save fontSize="small" />}
                    />
                </div>

                <h3 className={styles.sectionSubtitle}>Right Icon</h3>
                <div className={styles.buttonGroup}>
                    <Button
                        variant="primary"
                        button_text="Next"
                        icon_two={<ArrowForward fontSize="small" />}
                    />
                    <Button
                        variant="primary_outline"
                        button_text="Previous"
                        icon={<ArrowBack fontSize="small" />}
                    />
                    <Button
                        variant="button_purple"
                        button_text="Send"
                        icon_two={<Send fontSize="small" />}
                    />
                </div>

                <h3 className={styles.sectionSubtitle}>Both Icons</h3>
                <div className={styles.buttonGroup}>
                    <Button
                        variant="button_purple"
                        button_text="Download"
                        icon={<Download fontSize="small" />}
                        icon_two={<ArrowForward fontSize="small" />}
                    />
                    <Button
                        variant="primary"
                        button_text="Upload"
                        icon={<Upload fontSize="small" />}
                        icon_two={<Check fontSize="small" />}
                    />
                </div>

                <h3 className={styles.sectionSubtitle}>Icon Only</h3>
                <div className={styles.buttonGroup}>
                    <Button
                        variant="primary"
                        icon={<Add fontSize="small" />}
                    />
                    <Button
                        variant="button_success"
                        icon={<Check fontSize="small" />}
                    />
                    <Button
                        variant="button_danger"
                        icon={<Close fontSize="small" />}
                    />
                    <Button
                        variant="primary_outline"
                        icon={<Refresh fontSize="small" />}
                    />
                    <Button
                        variant="bordered_one"
                        icon={<Settings fontSize="small" />}
                    />
                    <Button
                        variant="bordered_three"
                        icon={<Visibility fontSize="small" />}
                    />
                    <Button
                        variant="warning_outline"
                        icon={<FilterList fontSize="small" />}
                    />
                </div>
            </section>

            {/* Button States */}
            <section className={styles.exampleSection}>
                <h2 className={styles.sectionTitle}>Button States</h2>
                <p className={styles.description}>
                    Buttons support different states including disabled and loading states.
                </p>

                <h3 className={styles.sectionSubtitle}>Disabled Buttons</h3>
                <div className={styles.buttonGroup}>
                    <Button
                        variant="button_purple"
                        button_text="Disabled Primary"
                        disabled
                    />
                    <Button
                        variant="primary_outline"
                        button_text="Disabled Outline"
                        disabled
                    />
                    <Button
                        variant="button_success"
                        button_text="Disabled Success"
                        icon={<Check fontSize="small" />}
                        disabled
                    />
                    <Button
                        variant="button_danger"
                        button_text="Disabled Danger"
                        disabled
                    />
                </div>

                <h3 className={styles.sectionSubtitle}>Loading State (Click to trigger)</h3>
                <div className={styles.buttonGroup}>
                    <Button
                        variant="button_purple"
                        button_text={loading ? "Loading..." : "Click to Load"}
                        onClick={handleLoadingClick}
                        disabled={loading}
                    />
                </div>
            </section>

            {/* Button Types */}
            <section className={styles.exampleSection}>
                <h2 className={styles.sectionTitle}>Button Types</h2>
                <p className={styles.description}>
                    The type prop can be set to "button", "submit", or "reset" for form handling.
                </p>

                <div className={styles.buttonGroup}>
                    <Button
                        type="button"
                        variant="primary"
                        button_text="Type: Button"
                    />
                    <Button
                        type="submit"
                        variant="button_success"
                        button_text="Type: Submit"
                        icon={<Check fontSize="small" />}
                    />
                    <Button
                        type="reset"
                        variant="button_danger_outline"
                        button_text="Type: Reset"
                        icon={<Refresh fontSize="small" />}
                    />
                </div>
            </section>

            {/* Action Button Examples */}
            <section className={styles.exampleSection}>
                <h2 className={styles.sectionTitle}>Common Use Cases</h2>
                <p className={styles.description}>
                    Common button patterns used in real applications.
                </p>

                <h3 className={styles.sectionSubtitle}>Form Actions</h3>
                <div className={styles.buttonGroup}>
                    <Button
                        variant="button_purple"
                        button_text="Save Changes"
                        icon={<Save fontSize="small" />}
                    />
                    <Button
                        variant="bordered_three"
                        button_text="Cancel"
                        icon={<Close fontSize="small" />}
                    />
                </div>

                <h3 className={styles.sectionSubtitle}>CRUD Actions</h3>
                <div className={styles.buttonGroup}>
                    <Button
                        variant="button_success"
                        button_text="Create New"
                        icon={<Add fontSize="small" />}
                    />
                    <Button
                        variant="primary"
                        button_text="View Details"
                        icon={<Visibility fontSize="small" />}
                    />
                    <Button
                        variant="warning"
                        button_text="Edit"
                        icon={<Edit fontSize="small" />}
                    />
                    <Button
                        variant="button_danger"
                        button_text="Delete"
                        icon={<Delete fontSize="small" />}
                    />
                </div>

                <h3 className={styles.sectionSubtitle}>Dialog/Modal Actions</h3>
                <div className={styles.buttonGroup}>
                    <Button
                        variant="button_purple"
                        button_text="Open Modal"
                        onClick={() => setModalOpen(true)}
                    />
                </div>

                <CustomModal
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    title="Example Modal"
                    width="500px"
                    footer={
                        <div className={styles.modalActions}>
                            <Button
                                variant="bordered_three"
                                button_text="Cancel"
                                onClick={() => setModalOpen(false)}
                            />
                            <Button
                                variant="button_purple"
                                button_text="Confirm"
                                icon={<Check fontSize="small" />}
                                onClick={() => setModalOpen(false)}
                            />
                        </div>
                    }
                >
                    <div className={styles.modalContent}>
                        <p>This is an example modal with action buttons in the footer.</p>
                        <p>Click "Confirm" or "Cancel" to close.</p>
                    </div>
                </CustomModal>

                <h3 className={styles.sectionSubtitle}>Navigation Actions</h3>
                <div className={styles.buttonGroup}>
                    <Button
                        variant="primary_outline"
                        button_text="Back"
                        icon={<ArrowBack fontSize="small" />}
                    />
                    <Button
                        variant="primary"
                        button_text="Continue"
                        icon_two={<ArrowForward fontSize="small" />}
                    />
                </div>
            </section>
        </div>
    );
};

export default ButtonsExamples;