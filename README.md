Here’s an updated version of your **README** that includes your new Todo List feature and RTK Query integration 👇

---

# 🚀 React Boilerplate

A scalable and well-structured React project setup with **Redux Toolkit**, **RTK Query**, **Axios**, and **modular SCSS** — ready for rapid development.

---

## 📁 Project Structure

```
src/
├── apiCalls/
│   └── functions/                # API function definitions (with example at homepage)
├── components/                   # Reusable UI components
├── containers/                   # Smart components handling logic and state
├── pages/
│   ├── buttonPages/              # Example pages for button components
│   └── todoPages/
│       ├── todoList/             # Todo List page using RTK Query example
│       │   └── index.jsx
│       └── todoApi.js            # RTK Query API definitions
├── routes/                       # Centralized routing setup
├── shared/
│   └── axios.js                  # Axios base configuration
└── store/                        # Redux setup (with RTK Query middleware and DevTools)
```

Each folder includes its own `.scss` file for modular styling.

---

## ⚙️ Features

✅ **RTK Query Integration** – Centralized API handling with caching and async management.
✅ **Todo List Example** – Demonstrates RTK Query API usage, data fetching, and mutation.
✅ **Component Architecture** – Structured separation between components, containers, and pages.
✅ **Routing System** – Pre-configured using React Router inside `/routes`.
✅ **Axios Setup** – Centralized API configuration under `shared/axios.js`.
✅ **Redux Toolkit Integration** – Store setup with RTK Query middleware and DevTools enabled.
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

| Folder               | Purpose                                                          |
| :------------------- | :--------------------------------------------------------------- |
| `components/`        | Contains small reusable UI blocks (e.g., Buttons, Modals)        |
| `containers/`        | Handles data logic, connects with Redux or API calls             |
| `pages/todoPages/`   | Includes Todo List example with RTK Query integration            |
| `routes/`            | Defines and manages all routes                                   |
| `shared/axios.js`    | Base Axios instance setup for API calls                          |
| `apiCalls/functions` | Individual API function modules                                  |
| `store/`             | Redux store configuration with RTK Query middleware and DevTools |

---

## 🧠 Example References

* **RTK Query Example:** `pages/todoPages/todoList/index.jsx`
* **API Setup:** `pages/todoPages/todoApi.js`
* **Redux Integration:** RTK Query middleware configured in `store/`
* **Routing Example:** Defined in `routes/index.jsx`

---

## 📜 Scripts

| Command           | Description                      |
| :---------------- | :------------------------------- |
| `npm run dev`     | Start development server         |
| `npm run build`   | Create production build          |
| `npm run preview` | Preview production build locally |

---

## 🛠️ Tech Stack

* **React 19+**
* **Redux Toolkit + RTK Query**
* **React Router**
* **Axios**
* **SCSS Modules**
* **Vite**

---