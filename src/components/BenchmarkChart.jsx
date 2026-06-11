import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function BenchmarkChart({ metrics }) {
  if (!metrics) return null;

  const data = {
    labels: ['JS Built-in', 'KMP Algorithm', 'Z-Algorithm', 'String Hashing', 'Trie Data Structure'],
    datasets: [
      {
        label: 'Execution Time (ms)',
        data: [metrics.native, metrics.kmp, metrics.zAlgo, metrics.rabinKarp, metrics.trie],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',   
          'rgba(54, 162, 235, 0.8)',   
          'rgba(75, 192, 192, 0.8)',   
          'rgba(153, 102, 255, 0.8)',  
          'rgba(255, 159, 64, 0.8)',   
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Algorithm Performance Benchmark (Lower is Better)',
        color: '#4CAF50',
        font: { size: 16, family: 'sans-serif' }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Milliseconds (ms)', color: '#888' },
        ticks: { color: '#ccc' },
        grid: { color: '#333' }
      },
      x: { ticks: { color: '#ccc' }, grid: { display: false } }
    }
  };

  return (
    <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#1e1e1e', borderRadius: '8px', border: '1px solid #333' }}>
      <Bar data={data} options={options} />
    </div>
  );
}