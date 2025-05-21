# 🧠 Pancreatic Cancer Predictor (Frontend)

This is the **React frontend** for the **Pancreatic Cancer Predictor** web app. It allows users to input medical and lifestyle data to receive a survival prediction based on a machine learning model hosted on the backend.

## 🚀 Features

- Clean, responsive UI built with **React**
- Dynamic form with validation and state management
- Real-time communication with Flask backend API
- Data visualization using **Recharts**:
  - Pie chart for survival probability
  - Bar chart summarizing key inputs
  - Line chart for historical cancer rates by country
- Error handling and user feedback

---

## 🖥️ Tech Stack

- React
- JavaScript
- Recharts
- CSS (custom)

---

## 📦 Installation & Running Locally

```bash
# Clone the repo
git clone https://github.com/your-username/pancreatic-prediction.git
cd pancreatic-prediction

# Install dependencies
npm install

# Start the development server
npm start


File Structure:
src/
│
├── App.js               # Main component with form, charts, API calls
├── PerformanceCharts.js # Fallback chart when no prediction made
├── App.css              # Styling
└── index.js             # React entry point

Website Screen Shot:
![Screenshot 2025-05-21 at 2 32 25 PM](https://github.com/user-attachments/assets/04fd6c2b-b44e-4a37-8a3a-b188a5dbc0c3)


Access The Website: https://pancreatic-cancer.onrender.com/


