# 🚀 React Boilerplate

A scalable and well-structured React project setup with **Redux Toolkit**, **Axios**, and **modular SCSS** — ready for rapid development.

---

## 📁 Project Structure

```
src/
├── apiCalls/
│   └── functions/                # API function definitions (with example at homepage)
├── components/                   # Reusable UI components
├── containers/                   # Smart components handling logic and state
├── pages/                        # Page-level components (Home, About, etc.)
├── routes/                       # Centralized routing setup
├── shared/
│   └── axios.js                  # Axios base configuration
└── store/                        # Redux setup (with counter example)
```

Each folder includes its own `.scss` file for modular styling.

---

## ⚙️ Features

✅ **Component Architecture** – Structured separation between components, containers, and pages.  
✅ **Routing System** – Pre-configured using React Router inside `/routes`.  
✅ **Axios Setup** – Centralized API configuration under `shared/axios.js`.  
✅ **API Call Example** – Included at the homepage for reference.  
✅ **Redux Toolkit Integration** – Store setup with a working counter example.  
✅ **SCSS Support** – Component-level modular SCSS for cleaner styling.  

---

## 🧑‍💻 Developer Setup

### 1️⃣ Clone the Repository
```bash
git clone <repo-url>
cd <repo-folder>
```

### 2️⃣ Rename Project
Search for `"react-template"` and replace it with your project/repo name.

### 3️⃣ Environment Setup
Create a `.env` file and copy the contents from `.buildParams.stage`.

### 4️⃣ Install Dependencies
```bash
npm install
```

### 5️⃣ Run the Project
```bash
npm run dev
```

---

## 🧩 Folder Highlights

| Folder | Purpose |
|:--------|:---------|
| `components/` | Contains small reusable UI blocks (e.g., Buttons, Modals) |
| `containers/` | Handles data logic, connects with Redux or API calls |
| `pages/` | Page-level views used in route definitions |
| `routes/` | Defines and manages all routes |
| `shared/axios.js` | Base Axios instance setup for API calls |
| `apiCalls/functions` | Individual API function modules |
| `store/` | Redux store configuration and slices |

---

## 🧠 Example References

- **API Call Example:** Check Home Page code
- **Redux Example:** Counter setup in `store/` folder and used on Home page.

---

## 📜 Scripts

| Command | Description |
|:---------|:-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run preview` | Preview production build locally |

---

## 🛠️ Tech Stack

- **React 19+**
- **Redux Toolkit**
- **React Router**
- **Axios**
- **SCSS Modules**
- **Vite**

---