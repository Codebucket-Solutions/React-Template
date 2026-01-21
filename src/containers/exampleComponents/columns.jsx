import React from 'react';
import Button from '../../components/ui/button';
import styles from './styles.module.scss';

// User table columns
export const userColumns = [
    {
        field: 'id',
        label: 'ID',
        widthEnable: true,
        width: '60px'
    },
    {
        field: 'name',
        label: 'Name',
        widthEnable: false
    },
    {
        field: 'email',
        label: 'Email',
        widthEnable: false
    },
    {
        field: 'role',
        label: 'Role',
        widthEnable: true,
        width: '120px'
    },
    {
        field: 'status',
        label: 'Status',
        widthEnable: true,
        width: '120px'
    },
    {
        field: 'joinDate',
        label: 'Join Date',
        widthEnable: true,
        width: '120px'
    },
    {
        field: 'actions',
        label: 'Actions',
        widthEnable: true,
        width: '150px'
    }
];

// Product table columns
export const productColumns = [
    {
        field: 'id',
        label: 'ID',
        widthEnable: true,
        width: '60px'
    },
    {
        field: 'name',
        label: 'Product Name',
        widthEnable: false
    },
    {
        field: 'category',
        label: 'Category',
        widthEnable: true,
        width: '150px'
    },
    {
        field: 'price',
        label: 'Price',
        widthEnable: true,
        width: '100px'
    },
    {
        field: 'stock',
        label: 'Stock',
        widthEnable: true,
        width: '100px'
    },
    {
        field: 'status',
        label: 'Status',
        widthEnable: true,
        width: '120px'
    },
    {
        field: 'actions',
        label: 'Actions',
        widthEnable: true,
        width: '150px'
    }
];

// Helper function to format user rows with status badges and action buttons
export const formatUserRows = (users, onEdit, onDelete) => {
    return users.map(user => ({
        ...user,
        status: (
            <span className={styles.badge + ' ' + (
                user.status === 'Active' ? styles.badgeSuccess :
                    user.status === 'Inactive' ? styles.badgeDanger :
                        styles.badgeWarning
            )}>
                {user.status}
            </span>
        ),
        actions: (
            <div className={styles.actionButtons}>
                <Button
                    variant="primary_outline"
                    button_text="Edit"
                    onClick={() => onEdit?.(user)}
                />
                <Button
                    variant="button_danger_outline"
                    button_text="Delete"
                    onClick={() => onDelete?.(user)}
                />
            </div>
        )
    }));
};

// Helper function to format product rows with price formatting and status badges
export const formatProductRows = (products, onEdit, onDelete) => {
    return products.map(product => ({
        ...product,
        price: `$${product.price.toFixed(2)}`,
        status: (
            <span className={styles.badge + ' ' + (
                product.status === 'In Stock' ? styles.badgeSuccess :
                    product.status === 'Out of Stock' ? styles.badgeDanger :
                        styles.badgeWarning
            )}>
                {product.status}
            </span>
        ),
        actions: (
            <div className={styles.actionButtons}>
                <Button
                    variant="primary_outline"
                    button_text="Edit"
                    onClick={() => onEdit?.(product)}
                />
                <Button
                    variant="button_danger_outline"
                    button_text="Delete"
                    onClick={() => onDelete?.(product)}
                />
            </div>
        )
    }));
};

// Simple table columns (without actions)
export const simpleUserColumns = [
    { field: 'id', label: 'ID', widthEnable: true, width: '60px' },
    { field: 'name', label: 'Name' },
    { field: 'email', label: 'Email' },
    { field: 'role', label: 'Role', widthEnable: true, width: '120px' },
    { field: 'status', label: 'Status', widthEnable: true, width: '120px' }
];
