// Sample data for all example components

// Table data
export const sampleUsers = [
    { id: 1, name: "John Doe", email: "john.doe@example.com", role: "Admin", status: "Active", joinDate: "2024-01-15" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", role: "Editor", status: "Active", joinDate: "2024-02-20" },
    { id: 3, name: "Bob Johnson", email: "bob.johnson@example.com", role: "Viewer", status: "Inactive", joinDate: "2024-03-10" },
    { id: 4, name: "Alice Brown", email: "alice.brown@example.com", role: "Admin", status: "Active", joinDate: "2024-03-25" },
    { id: 5, name: "Charlie Wilson", email: "charlie.wilson@example.com", role: "Editor", status: "Pending", joinDate: "2024-04-05" },
    { id: 6, name: "Diana Miller", email: "diana.miller@example.com", role: "Viewer", status: "Active", joinDate: "2024-04-18" },
    { id: 7, name: "Eve Davis", email: "eve.davis@example.com", role: "Admin", status: "Active", joinDate: "2024-05-02" },
    { id: 8, name: "Frank Garcia", email: "frank.garcia@example.com", role: "Editor", status: "Inactive", joinDate: "2024-05-15" },
];

export const sampleProducts = [
    { id: 1, name: "Wireless Headphones", category: "Electronics", price: 99.99, stock: 150, status: "In Stock" },
    { id: 2, name: "Smart Watch Pro", category: "Electronics", price: 249.99, stock: 75, status: "In Stock" },
    { id: 3, name: "Running Shoes", category: "Sports", price: 129.99, stock: 0, status: "Out of Stock" },
    { id: 4, name: "Yoga Mat Premium", category: "Sports", price: 45.99, stock: 200, status: "In Stock" },
    { id: 5, name: "Coffee Maker Deluxe", category: "Home", price: 179.99, stock: 30, status: "Low Stock" },
];

// Select/Dropdown options
export const roleOptions = [
    { value: "admin", label: "Administrator" },
    { value: "editor", label: "Editor" },
    { value: "viewer", label: "Viewer" },
    { value: "moderator", label: "Moderator" },
];

export const statusOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "pending", label: "Pending" },
    { value: "suspended", label: "Suspended" },
];

export const categoryOptions = [
    { value: "electronics", label: "Electronics" },
    { value: "sports", label: "Sports & Outdoors" },
    { value: "home", label: "Home & Garden" },
    { value: "fashion", label: "Fashion" },
    { value: "books", label: "Books" },
];

export const countryOptions = [
    { value: "us", label: "United States" },
    { value: "uk", label: "United Kingdom" },
    { value: "ca", label: "Canada" },
    { value: "au", label: "Australia" },
    { value: "de", label: "Germany" },
    { value: "fr", label: "France" },
    { value: "jp", label: "Japan" },
    { value: "in", label: "India" },
];

// Picky options (id/name format)
export const tagOptions = [
    { id: 1, name: "Featured" },
    { id: 2, name: "New Arrival" },
    { id: 3, name: "Best Seller" },
    { id: 4, name: "Sale" },
    { id: 5, name: "Limited Edition" },
];

export const skillOptions = [
    { id: 1, name: "JavaScript" },
    { id: 2, name: "React" },
    { id: 3, name: "Node.js" },
    { id: 4, name: "Python" },
    { id: 5, name: "TypeScript" },
    { id: 6, name: "CSS/SCSS" },
    { id: 7, name: "SQL" },
    { id: 8, name: "GraphQL" },
];

// Radio/Checkbox options
export const priorityOptions = [
    { value: "low", label: "Low Priority" },
    { value: "medium", label: "Medium Priority" },
    { value: "high", label: "High Priority" },
    { value: "urgent", label: "Urgent" },
];

export const paymentMethodOptions = [
    { value: "credit", label: "Credit Card" },
    { value: "debit", label: "Debit Card" },
    { value: "paypal", label: "PayPal" },
    { value: "bank", label: "Bank Transfer" },
];

export const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
    { value: "prefer_not", label: "Prefer not to say" },
];

export const notificationOptions = [
    { value: "email", label: "Email Notifications" },
    { value: "sms", label: "SMS Notifications" },
    { value: "push", label: "Push Notifications" },
    { value: "newsletter", label: "Newsletter" },
];

// AutoSuggest options
export const cityOptions = [
    { value: "nyc", label: "New York City" },
    { value: "la", label: "Los Angeles" },
    { value: "chicago", label: "Chicago" },
    { value: "houston", label: "Houston" },
    { value: "phoenix", label: "Phoenix" },
    { value: "philadelphia", label: "Philadelphia" },
    { value: "san_antonio", label: "San Antonio" },
    { value: "san_diego", label: "San Diego" },
    { value: "dallas", label: "Dallas" },
    { value: "san_jose", label: "San Jose" },
    { value: "austin", label: "Austin" },
    { value: "seattle", label: "Seattle" },
    { value: "boston", label: "Boston" },
    { value: "denver", label: "Denver" },
    { value: "miami", label: "Miami" },
];

export const productSearchOptions = [
    { value: "iphone", label: "iPhone 15 Pro Max" },
    { value: "samsung", label: "Samsung Galaxy S24" },
    { value: "macbook", label: "MacBook Pro 16 inch" },
    { value: "ipad", label: "iPad Air 5th Gen" },
    { value: "airpods", label: "AirPods Pro 2" },
    { value: "ps5", label: "PlayStation 5" },
    { value: "xbox", label: "Xbox Series X" },
    { value: "switch", label: "Nintendo Switch OLED" },
];
