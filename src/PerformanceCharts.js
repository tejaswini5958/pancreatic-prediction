// PerformanceCharts.js
import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, PieChart, Pie, Cell, Legend
} from 'recharts';

export default function PerformanceCharts() {
  // 1️⃣ Classification report data
  const classReport = [
    { cls: '0', precision: 0.87, recall: 0.94, f1: 0.90 },
    { cls: '1', precision: 0.12, recall: 0.06, f1: 0.08 },
  ];

  // 2️⃣ Overall metrics
  const overallMetrics = [
    { metric: 'Accuracy', value: 0.8241 },
    { metric: 'F1 Score', value: 0.07954 },
    { metric: 'ROC AUC', value: 0.47549 },
  ];

  // 3️⃣ Confusion matrix as pie
  const confusionPieData = [
    { name: 'True Negative',  value: 8165 },
    { name: 'False Positive', value: 551  },
    { name: 'False Negative', value: 1208 },
    { name: 'True Positive',  value: 76   },
  ];
  const CONF_COLORS = ['#4caf50', '#ff9800', '#f44336', '#2196f3'];

  // Custom label for percentages
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const RADIAN = Math.PI / 180;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="#fff" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" style={{ fontSize: '12px', fontWeight: 'bold' }}>
        {`${(percent * 100).toFixed(1)}%`}
      </text>
    );
  };

  return (
    <div style={{ maxWidth: 1200, margin: '40px auto', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 20 }}>Model Performance Overview</h2>

      <div style={{ display: 'flex', gap: 40, justifyContent: 'space-between', flexWrap: 'wrap' }}>
        {/* Classification Report */}
        <div style={{ flex: '1 1 300px', minWidth: 300, height: 350, background: '#fff', padding: 20, borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <h3 style={{ textAlign: 'center', marginBottom: 10 }}>Classification Report</h3>
          <ResponsiveContainer width="100%" height="80%">
            <BarChart data={classReport} margin={{ top: 10, right: 10, bottom: 10, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="cls" label={{ value: 'Class', position: 'insideBottom', dy: 10 }} />
              <YAxis domain={[0, 1]} />
              <Tooltip />
              <Bar dataKey="precision" name="Precision" stackId="a" fill="#ffa726" />
              <Bar dataKey="recall"    name="Recall"    stackId="a" fill="#66bb6a" />
              <Bar dataKey="f1"        name="F1-Score"  stackId="a" fill="#ef5350" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Overall Metrics */}
        <div style={{ flex: '1 1 300px', minWidth: 300, height: 350, background: '#fff', padding: 20, borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <h3 style={{ textAlign: 'center', marginBottom: 10 }}>Overall Metrics</h3>
          <ResponsiveContainer width="100%" height="80%">
            <BarChart data={overallMetrics} margin={{ top: 10, right: 10, bottom: 10, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="metric" />
              <YAxis domain={[0, 1]} />
              <Tooltip />
              <Bar dataKey="value" name="Value" fill="#42a5f5" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Confusion Matrix Pie */}
        <div style={{ flex: '1 1 300px', minWidth: 300, height: 350, background: '#fff', padding: 20, borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <h3 style={{ textAlign: 'center', marginBottom: 10 }}>Confusion Matrix</h3>
          <ResponsiveContainer width="100%" height="80%">
            <PieChart>
              <Pie
                data={confusionPieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                labelLine={false}
                label={renderCustomizedLabel}
              >
                {confusionPieData.map((entry, idx) => (
                  <Cell key={idx} fill={CONF_COLORS[idx % CONF_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => new Intl.NumberFormat().format(value)} />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
