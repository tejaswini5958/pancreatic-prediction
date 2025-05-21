import React, { useState } from 'react';
import './App.css';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, LineChart, Line, CartesianGrid,
} from 'recharts';
import PerformanceCharts from './PerformanceCharts';

const countries = ['USA', 'India', 'UK', 'Germany', 'Canada', 'Australia'];
const genderOptions = ['Male', 'Female', 'Other'];
const stageOptions = ['Stage I', 'Stage II', 'Stage III', 'Stage IV'];
const treatmentOptions = ['Surgery', 'Chemotherapy', 'Radiation Therapy', 'Immunotherapy'];
const activityLevels = ['Low', 'Medium', 'High'];
const dietLevels = ['Low', 'Medium', 'High'];
const healthcareAccess = ['Low', 'Medium', 'High'];
const locationOptions = ['Urban', 'Rural'];
const economicOptions = ['Low', 'Medium', 'High'];

const defaultForm = {
  Country: '',
  Age: '',
  Gender: '',
  Smoking_History: '',
  Obesity: '',
  Diabetes: '',
  Chronic_Pancreatitis: '',
  Family_History: '',
  Hereditary_Condition: '',
  Jaundice: '',
  Abdominal_Discomfort: '',
  Back_Pain: '',
  Weight_Loss: '',
  Development_of_Type2_Diabetes: '',
  Stage_at_Diagnosis: '',
  Survival_Time_Months: '',
  Treatment_Type: '',
  Alcohol_Consumption: '',
  Physical_Activity_Level: '',
  Diet_Processed_Food: '',
  Access_to_Healthcare: '',
  Urban_vs_Rural: '',
  Economic_Status: ''
};

const booleanFields = [
  'Smoking_History', 'Obesity', 'Diabetes', 'Chronic_Pancreatitis', 'Family_History',
  'Hereditary_Condition', 'Jaundice', 'Abdominal_Discomfort', 'Back_Pain', 'Weight_Loss',
  'Development_of_Type2_Diabetes', 'Alcohol_Consumption'
];

const cancerRatesByCountry = {
  India: [
    { year: 2019, rate: 3.4 },
    { year: 2020, rate: 3.7 },
    { year: 2021, rate: 4.0 },
    { year: 2022, rate: 4.2 },
    { year: 2023, rate: 4.5 },
  ],
  USA: [
    { year: 2019, rate: 8.9 },
    { year: 2020, rate: 9.1 },
    { year: 2021, rate: 10 },
    { year: 2022, rate: 11 },
    { year: 2023, rate: 12 },
    { year: 2024, rate: 12.8 },
    { year: 2025, rate: 13 },
  ],
  UK: [
    { year: 2019, rate: 7 },
    { year: 2020, rate: 8.3 },
    { year: 2021, rate: null },
    { year: 2022, rate: null },
    { year: 2023, rate: null },
  ],
  Canada: Array.from({ length: 7 }, (_, i) => ({ year: 2019 + i, rate: 10 })),
  Germany: Array.from({ length: 7 }, (_, i) => ({ year: 2019 + i, rate: 11 })),
};

function App() {
  const [form, setForm] = useState(defaultForm);
  const [prediction, setPrediction] = useState(null);
  const [probability, setProbability] = useState(0);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isEmpty = Object.values(form).some(value => value === '');
    if (isEmpty) {
      setError('⚠️ Please fill out all fields before submitting the form.');
      setPrediction(null);
      return;
    }

    try {
      const response = await fetch('https://pancreatic-cancer-prediction-backend.onrender.com/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const result = await response.json();
      setPrediction(result.prediction);
      setProbability(result.probability_of_survival_status_1);
      setError('');
    } catch (error) {
      setError('An error occurred while predicting. Please try again.');
      console.error('Prediction error:', error.message);
    }
  };

  const pieData = [
    { name: 'Survival Probability', value: probability },
    { name: 'Non-Survival Probability', value: 1 - probability }
  ];

  const barChartData = [
    { name: 'Age', value: parseInt(form.Age || 0) },
    { name: 'Survival Time', value: parseInt(form.Survival_Time_Months || 0) },
    { name: 'Obesity', value: parseInt(form.Obesity || 0) },
    { name: 'Diabetes', value: parseInt(form.Diabetes || 0) },
  ];

  const pieColors = ['#4caf50', '#f44336'];

  return (
    <div className="container">
      <h1 className="title">Pancreatic Cancer Predictor</h1>
      <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '-10px', textAlign: 'center' }}>
      <span style={{color:'red'}}>&#9888;</span> This prediction is based on pre-trained datasets and may not reflect individual medical cases. Always consult a healthcare professional.
      </p>

      <form onSubmit={handleSubmit} className="form-grid">
        <select name="Country" className="form-select" value={form.Country} onChange={handleChange}>
          <option value="">Select Country</option>
          {countries.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        <input type="number" name="Age" className="form-input" placeholder="Age" value={form.Age} onChange={handleChange} />

        <select name="Gender" className="form-select" value={form.Gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          {genderOptions.map(g => <option key={g} value={g}>{g}</option>)}
        </select>

        {booleanFields.map(field => (
          <select key={field} name={field} className="form-select" value={form[field]} onChange={handleChange}>
            <option value="">{field.replace(/_/g, ' ')}</option>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
        ))}

        <select name="Stage_at_Diagnosis" className="form-select" value={form.Stage_at_Diagnosis} onChange={handleChange}>
          <option value="">Select Stage</option>
          {stageOptions.map(s => <option key={s} value={s}>{s}</option>)}
        </select>

        <input type="number" name="Survival_Time_Months" className="form-input" placeholder="Survival Time (months)" value={form.Survival_Time_Months} onChange={handleChange} />

        <select name="Treatment_Type" className="form-select" value={form.Treatment_Type} onChange={handleChange}>
          <option value="">Select Treatment</option>
          {treatmentOptions.map(t => <option key={t} value={t}>{t}</option>)}
        </select>

        <select name="Physical_Activity_Level" className="form-select" value={form.Physical_Activity_Level} onChange={handleChange}>
          <option value="">Physical Activity</option>
          {activityLevels.map(l => <option key={l} value={l}>{l}</option>)}
        </select>

        <select name="Diet_Processed_Food" className="form-select" value={form.Diet_Processed_Food} onChange={handleChange}>
          <option value="">Diet (Processed Food)</option>
          {dietLevels.map(d => <option key={d} value={d}>{d}</option>)}
        </select>

        <select name="Access_to_Healthcare" className="form-select" value={form.Access_to_Healthcare} onChange={handleChange}>
          <option value="">Access to Healthcare</option>
          {healthcareAccess.map(a => <option key={a} value={a}>{a}</option>)}
        </select>

        <select name="Urban_vs_Rural" className="form-select" value={form.Urban_vs_Rural} onChange={handleChange}>
          <option value="">Urban or Rural</option>
          {locationOptions.map(l => <option key={l} value={l}>{l}</option>)}
        </select>

        <select name="Economic_Status" className="form-select" value={form.Economic_Status} onChange={handleChange}>
          <option value="">Economic Status</option>
          {economicOptions.map(e => <option key={e} value={e}>{e}</option>)}
        </select>

        <div className="form-button-wrapper">
          <button type="submit" className="submit-btn">Predict</button>
        </div>
      </form>

      {error && <div className="alert alert-warning">{error}</div>}

      {prediction === null ? (
        <PerformanceCharts />
      ) : (
        <>
          {prediction === 0 && (
            <div className="alert alert-danger">
              ⚠️ Based on the data provided, the prognosis indicates a <strong>low likelihood of survival</strong>.
              Please consult a medical professional for further evaluation and support.
            </div>
          )}

          {prediction === 1 && (
            <div className="alert alert-success">
              ✅ Based on the data provided, the prognosis indicates a <strong>favorable likelihood of survival</strong>.
              Please continue regular health checkups and follow medical advice.
            </div>
          )}

          {form.Country && cancerRatesByCountry[form.Country] && (
            <div className="chart-container">
              <h2 className="chart-title">{form.Country} - Pancreatic Cancer Rates (Last 5 Years)</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={cancerRatesByCountry[form.Country]}>
                  <CartesianGrid stroke="#e0e0e0" />
                  <XAxis dataKey="year" />
                  <YAxis label={{ value: 'Rate per 100K', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="rate" stroke="#1976d2" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
              <p style={{ marginTop: '0px', fontSize: '0.85rem', color: '#888', textAlign: 'center' }}>
                ⚠️ This data is for illustrative purposes only and is based on general internet sources.
              </p>
            </div>
          )}

          <div className="chart-section side-by-side">
            <div className="chart-box">
              <h2 className="chart-title">Survival Probability</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={index} fill={pieColors[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-box">
              <h2 className="chart-title">Input Summary</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill={prediction === 1 ? '#4caf50' : '#f44336'} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
