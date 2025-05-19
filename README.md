# Vehicle Information Management System (VIMS)

The **Vehicle Information Management System (VIMS)** is a web-based platform developed for **Prima Autoworld** to assist **sales agents** in quickly looking up used vehicle information and accessing detailed specifications. This system helps streamline the sales process while allowing **admin users** to manage and upload vehicle data via a secure backend.

---

## 🎯 Project Overview

* Designed for **sales agents** to view and filter used vehicle records.
* Built for **admin users** to manage car inventory through an authenticated system.
* Developed using **Django REST Framework** for the backend and **React.js** for the frontend.

---

## 📁 Project Structure

```
vims/
├── project/            # Django REST Framework backend
├── frontend/           # React.js frontend
└── README.md
```

---

## ⚙️ Tech Stack

* **Backend**: Django 4.x, Django REST Framework
* **Frontend**: React.js, Axios
* **Database**: SQLite (development), MySQL (production-ready)
* **Authentication**: Token-based (DRF Auth)

---

## 🚀 Getting Started

### 🔧 Backend Setup (project/)

1. Navigate to the backend folder:

```bash
cd project
```

2. Set up Python virtual environment and install dependencies:

```bash
pip install pipenv
pipenv install
pipenv shell
```

3. Run migrations:

```bash
python manage.py makemigrations
python manage.py migrate
```

4. Create admin user:

```bash
python manage.py createsuperuser
```

5. Start the server:

```bash
pipenv run python manage.py runserver
```

---

### 🎨 Frontend Setup (frontend/)

1. Navigate to the frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the frontend development server:

```bash
npm start
```

> ⚠️ **Note**: If `npm start` doesn't work, try using:

```bash
npm run dev
```

> Make sure the backend is running and the API base URL is correctly set in `.env` or Axios config.


---

## 🔐 Authentication

VIMS uses **token-based authentication**. After logging in, include the token in the `Authorization` header:

```http
Authorization: Token your_token_here
```

---

## 📬 API Endpoints (Sample)

| Endpoint                | Method | Description                    |
| ----------------------- | ------ | ------------------------------ |
| `/api/vehicles/`        | GET    | List all vehicles              |
| `/api/vehicles/<id>/`   | GET    | Get details of a specific car  |
| `/api/vehicles/create/` | POST   | Add a new vehicle (admin only) |
| `/api/token-auth/`      | POST   | Login and receive token        |

---

## ✅ System Roles

* **Sales Agent**: Can access vehicle data via frontend (read-only).
* **Admin**: Can log in to backend to upload, edit, and delete vehicle records.

---

## 📌 Notes

* This system **does not handle** customer profiles or internal staff management.
* Focused purely on **vehicle inventory lookup** and **admin data input**.
* Designed for use in a **car dealership environment**.

---

## 📖 License

This project is developed for internal usage at Prima Autoworld. For inquiries or customization, please contact the developer.

