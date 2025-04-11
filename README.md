# UM-HACKATHON-2025-BENINGING


## Table of Contents

- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
  - [1. Backend Setup (Flask)](#1-backend-setup-flask)
  - [2. Frontend Setup (React)](#2-frontend-setup-react)
- [Running Both Servers](#running-both-servers)
- [Testing](#testing)

## Project Structure
After setting up:
```
UM-HACKATHON-2025-BENINGING/
├── Server/         # Flask backend
│   ├── app.py
│   ├── venv
│   └── requirements.txt
└── frontend/       # React frontend
    ├── src/
    ├── public/
    └── package.json
├── .gitignore
├── readme.md
```

## Setup Instructions
### 1. Backend Setup (Flask)
```
cd Server
```

Create a virtual environment:
```
python -m venv venv
```

Activate the virtual environment:
```
venv\Scripts\activate
```

⚠️ If You Get This Error:
```
venv\Scripts\Activate.ps1 cannot be loaded because running scripts is disabled on this system.
```

Temporary fix (safe for development):
```
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
```

Permanent fix (use with caution):
```
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Install dependencies:
```
pip install -r requirements.txt
```


Start backend
```
python app.py
```

### 2. Frontend Setup (React)
Open a split terminal or a new terminal tab/window, then:
```
cd frontend
```

Install React dependencies:
```
npm install
```

Start the React development server:
```
npm run start
```


## Running Both Servers
Flask runs on: http://localhost:5000

React runs on: http://localhost:3000

Make sure your React app is calling Flask endpoints like /api, or configure a proxy in frontend/package.json:
```
"proxy": "http://localhost:5000",
```
## Testing
Visit http://localhost:3000 in your browser to view the React frontend.

It should fetch and display data from your Flask backend.
