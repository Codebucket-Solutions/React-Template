import React, { useState } from 'react';
import Table from '../../components/ui/table';
import InputField from '../../components/ui/input';
import Button from '../../components/ui/button';
import CustomModal from '../../components/modal';
import styles from './styles.module.scss';
import {
    sampleUsers,
    sampleProducts,
    roleOptions,
    statusOptions
} from './data';
import { Add, FilterList, Download, Refresh, Delete, Save, Close } from '@mui/icons-material';

// Column definitions (inline)
const simpleUserColumns = [
    { field: 'id', label: 'ID', widthEnable: true, width: '60px' },
    { field: 'name', label: 'Name' },
    { field: 'email', label: 'Email' },
    { field: 'role', label: 'Role', widthEnable: true, width: '120px' },
    { field: 'status', label: 'Status', widthEnable: true, width: '120px' }
];

const userColumns = [
    { field: 'id', label: 'ID', widthEnable: true, width: '60px' },
    { field: 'name', label: 'Name' },
    { field: 'email', label: 'Email' },
    { field: 'role', label: 'Role', widthEnable: true, width: '120px' },
    { field: 'status', label: 'Status', widthEnable: true, width: '120px' },
    { field: 'joinDate', label: 'Join Date', widthEnable: true, width: '120px' },
    { field: 'actions', label: 'Actions', widthEnable: true, width: '150px' }
];

const productColumns = [
    { field: 'id', label: 'ID', widthEnable: true, width: '60px' },
    { field: 'name', label: 'Product Name' },
    { field: 'category', label: 'Category', widthEnable: true, width: '150px' },
    { field: 'price', label: 'Price', widthEnable: true, width: '100px' },
    { field: 'stock', label: 'Stock', widthEnable: true, width: '100px' },
    { field: 'status', label: 'Status', widthEnable: true, width: '120px' },
    { field: 'actions', label: 'Actions', widthEnable: true, width: '150px' }
];

const TableExample = () => {
    // Pagination state
    const [userPage, setUserPage] = useState(1);
    const [productPage, setProductPage] = useState(1);

    // Filter state
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    // Modal state
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    // Edit form state
    const [editFormData, setEditFormData] = useState({
        name: '',
        email: '',
        role: '',
        status: ''
    });

    // Handle edit click
    const handleEdit = (item) => {
        setSelectedItem(item);
        setEditFormData({
            name: item.name,
            email: item.email,
            role: item.role?.toLowerCase() || item.role,
            status: item.status?.toLowerCase() || item.status
        });
        setEditModalOpen(true);
    };

    // Handle delete click
    const handleDelete = (item) => {
        setSelectedItem(item);
        setDeleteModalOpen(true);
    };

    // Handle save edit
    const handleSaveEdit = () => {
        console.log('Saving:', editFormData);
        setEditModalOpen(false);
        setSelectedItem(null);
    };

    // Handle confirm delete
    const handleConfirmDelete = () => {
        console.log('Deleting:', selectedItem);
        setDeleteModalOpen(false);
        setSelectedItem(null);
    };

    // Filter users
    const filteredUsers = sampleUsers.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = !roleFilter || user.role.toLowerCase() === roleFilter;
        const matchesStatus = !statusFilter || user.status.toLowerCase() === statusFilter;
        return matchesSearch && matchesRole && matchesStatus;
    });

    // Helper function to format user rows with status badges and action buttons
    const formatUserRows = (users) => {
        return users.map(user => ({
            ...user,
            status: (
                <span className={`${styles.badge} ${user.status === 'Active' ? styles.badgeSuccess :
                    user.status === 'Inactive' ? styles.badgeDanger :
                        styles.badgeWarning
                    }`}>
                    {user.status}
                </span>
            ),
            actions: (
                <div className={styles.actionButtons}>
                    <Button
                        variant="primary_outline"
                        button_text="Edit"
                        onClick={() => handleEdit(user)}
                    />
                    <Button
                        variant="button_danger_outline"
                        button_text="Delete"
                        onClick={() => handleDelete(user)}
                    />
                </div>
            )
        }));
    };

    // Helper function to format product rows
    const formatProductRows = (products) => {
        return products.map(product => ({
            ...product,
            price: `$${product.price.toFixed(2)}`,
            status: (
                <span className={`${styles.badge} ${product.status === 'In Stock' ? styles.badgeSuccess :
                    product.status === 'Out of Stock' ? styles.badgeDanger :
                        styles.badgeWarning
                    }`}>
                    {product.status}
                </span>
            ),
            actions: (
                <div className={styles.actionButtons}>
                    <Button
                        variant="primary_outline"
                        button_text="Edit"
                        onClick={() => handleEdit(product)}
                    />
                    <Button
                        variant="button_danger_outline"
                        button_text="Delete"
                        onClick={() => handleDelete(product)}
                    />
                </div>
            )
        }));
    };

    // Format rows with action handlers
    const formattedUserRows = formatUserRows(filteredUsers);
    const formattedProductRows = formatProductRows(sampleProducts);

    return (
        <div className={styles.exampleContainer}>
            {/* Basic Table */}
            <section className={styles.exampleSection}>
                <h2 className={styles.sectionTitle}>Basic Table</h2>
                <p className={styles.description}>
                    A simple table displaying data without pagination or actions.
                </p>

                <div className={styles.tableSection}>
                    <Table
                        columns={simpleUserColumns}
                        rows={sampleUsers.slice(0, 5).map(user => ({
                            ...user,
                            status: (
                                <span className={`${styles.badge} ${user.status === 'Active' ? styles.badgeSuccess :
                                    user.status === 'Inactive' ? styles.badgeDanger :
                                        styles.badgeWarning
                                    }`}>
                                    {user.status}
                                </span>
                            )
                        }))}
                        pagination={false}
                    />
                </div>
            </section>

            {/* Table with Pagination */}
            <section className={styles.exampleSection}>
                <h2 className={styles.sectionTitle}>Table with Pagination</h2>
                <p className={styles.description}>
                    Table with MUI pagination component. Use pageNumber and totalSize props to control pagination.
                </p>

                <div className={styles.tableSection}>
                    <Table
                        columns={simpleUserColumns}
                        rows={sampleUsers.slice((userPage - 1) * 3, userPage * 3).map(user => ({
                            ...user,
                            status: (
                                <span className={`${styles.badge} ${user.status === 'Active' ? styles.badgeSuccess :
                                    user.status === 'Inactive' ? styles.badgeDanger :
                                        styles.badgeWarning
                                    }`}>
                                    {user.status}
                                </span>
                            )
                        }))}
                        pagination={true}
                        pageNumber={userPage}
                        totalSize={sampleUsers.length}
                        countPages={3}
                        fetchSelectedPage={(page) => setUserPage(page)}
                        onChangeCustomPage={(page) => setUserPage(page)}
                    />
                </div>
            </section>

            {/* Table with Search and Filters */}
            <section className={styles.exampleSection}>
                <h2 className={styles.sectionTitle}>Table with Search & Filters</h2>
                <p className={styles.description}>
                    Interactive table with search functionality and dropdown filters.
                </p>

                <div className={styles.searchRow}>
                    <InputField
                        type="text"
                        name="searchUsers"
                        title="Search"
                        placeholder="Search by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    <InputField
                        type="select"
                        name="roleFilter"
                        title="Role"
                        placeholder="All Roles"
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        options={[{ value: '', label: 'All Roles' }, ...roleOptions]}
                        optionValue="value"
                        optionLabel="label"
                    />

                    <InputField
                        type="select"
                        name="statusFilter"
                        title="Status"
                        placeholder="All Statuses"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        options={[{ value: '', label: 'All Statuses' }, ...statusOptions]}
                        optionValue="value"
                        optionLabel="label"
                    />

                    <Button
                        variant="primary_outline"
                        button_text="Reset"
                        icon={<Refresh fontSize="small" />}
                        onClick={() => {
                            setSearchTerm('');
                            setRoleFilter('');
                            setStatusFilter('');
                        }}
                    />
                </div>

                <div className={styles.tableSection}>
                    <Table
                        columns={userColumns}
                        rows={formattedUserRows}
                        pagination={false}
                    />
                </div>

                {filteredUsers.length === 0 && (
                    <div className={styles.previewBox}>
                        <p>No users found matching your criteria.</p>
                    </div>
                )}
            </section>

            {/* Table with Actions */}
            <section className={styles.exampleSection}>
                <h2 className={styles.sectionTitle}>Product Table with Actions</h2>
                <p className={styles.description}>
                    Table with action buttons (Edit, Delete) and a toolbar for adding new items.
                </p>

                <div className={styles.buttonGroup} style={{ marginBottom: '1.5rem' }}>
                    <Button
                        variant="button_purple"
                        button_text="Add Product"
                        icon={<Add fontSize="small" />}
                        onClick={() => alert('Add Product clicked!')}
                    />
                    <Button
                        variant="primary_outline"
                        button_text="Export"
                        icon={<Download fontSize="small" />}
                        onClick={() => alert('Export clicked!')}
                    />
                    <Button
                        variant="bordered_one"
                        button_text="Filter"
                        icon={<FilterList fontSize="small" />}
                        onClick={() => alert('Filter clicked!')}
                    />
                </div>

                <div className={styles.tableSection}>
                    <Table
                        columns={productColumns}
                        rows={formattedProductRows}
                        pagination={true}
                        pageNumber={productPage}
                        totalSize={sampleProducts.length}
                        countPages={5}
                        fetchSelectedPage={(page) => setProductPage(page)}
                    />
                </div>
            </section>

            {/* Table with Custom Styling */}
            <section className={styles.exampleSection}>
                <h2 className={styles.sectionTitle}>Table Customization</h2>
                <p className={styles.description}>
                    Tables can be customized with className, wrapperClassName, and spacing props.
                </p>

                <h3 className={styles.sectionSubtitle}>Without Spacing</h3>
                <div className={styles.tableSection}>
                    <Table
                        columns={simpleUserColumns.slice(0, 4)}
                        rows={sampleUsers.slice(0, 3)}
                        pagination={false}
                        spacing={false}
                    />
                </div>

                <h3 className={styles.sectionSubtitle}>Column Width Configuration</h3>
                <p className={styles.description}>
                    Columns support widthEnable and width props for custom column widths.
                </p>
                <div className={styles.codeBlock}>
                    <code>
                        {`{
    field: 'id',
    label: 'ID',
    widthEnable: true,
    width: '60px'
}`}
                    </code>
                </div>
            </section>

            {/* Edit Modal */}
            <CustomModal
                open={editModalOpen}
                onClose={() => setEditModalOpen(false)}
                title="Edit User"
                width="500px"
                footer={
                    <div className={styles.modalActions}>
                        <Button
                            variant="bordered_three"
                            button_text="Cancel"
                            icon={<Close fontSize="small" />}
                            onClick={() => setEditModalOpen(false)}
                        />
                        <Button
                            variant="button_purple"
                            button_text="Save Changes"
                            icon={<Save fontSize="small" />}
                            onClick={handleSaveEdit}
                        />
                    </div>
                }
            >
                <div className={styles.modalContent}>
                    <div className={styles.formGrid}>
                        <InputField
                            type="text"
                            name="editName"
                            title="Name"
                            value={editFormData.name}
                            onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                        />

                        <InputField
                            type="email"
                            name="editEmail"
                            title="Email"
                            value={editFormData.email}
                            onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                        />

                        <InputField
                            type="select"
                            name="editRole"
                            title="Role"
                            value={editFormData.role}
                            onChange={(e) => setEditFormData({ ...editFormData, role: e.target.value })}
                            options={roleOptions}
                            optionValue="value"
                            optionLabel="label"
                        />

                        <InputField
                            type="select"
                            name="editStatus"
                            title="Status"
                            value={editFormData.status}
                            onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })}
                            options={statusOptions}
                            optionValue="value"
                            optionLabel="label"
                        />
                    </div>
                </div>
            </CustomModal>

            {/* Delete Confirmation Modal */}
            <CustomModal
                open={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                title="Confirm Delete"
                width="400px"
                footer={
                    <div className={styles.modalActions}>
                        <Button
                            variant="bordered_three"
                            button_text="Cancel"
                            onClick={() => setDeleteModalOpen(false)}
                        />
                        <Button
                            variant="button_danger"
                            button_text="Delete"
                            icon={<Delete fontSize="small" />}
                            onClick={handleConfirmDelete}
                        />
                    </div>
                }
            >
                <div className={styles.modalContent}>
                    <p>Are you sure you want to delete <strong>{selectedItem?.name}</strong>?</p>
                    <p style={{ color: '#6b7280', marginTop: '0.5rem' }}>This action cannot be undone.</p>
                </div>
            </CustomModal>

            {/* Props Reference */}
            <section className={styles.exampleSection}>
                <h2 className={styles.sectionTitle}>Table Props Reference</h2>
                <p className={styles.description}>
                    Available props for the Table component.
                </p>

                <div className={styles.codeBlock}>
                    <code>
                        {`// Required Props
columns: PropTypes.arrayOf(PropTypes.shape({
    field: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    widthEnable: PropTypes.bool,
    width: PropTypes.string,
    enable: PropTypes.bool
})).isRequired,
rows: PropTypes.arrayOf(PropTypes.object).isRequired,

// Pagination Props
pagination: PropTypes.bool,
pageNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
totalSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
countPages: PropTypes.number,
fetchSelectedPage: PropTypes.func,
onChangeCustomPage: PropTypes.func,
maxPageCount: PropTypes.number,

// Styling Props
className: PropTypes.string,
wrapperClassName: PropTypes.string,
spacing: PropTypes.bool,
isChangeColumn: PropTypes.bool`}
                    </code>
                </div>
            </section>
        </div>
    );
};

export default TableExample;