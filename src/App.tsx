import React, { useEffect, useState } from 'react';
import api from './api';
import type { RESPONSE_DATA } from './api';
import './App.css';

function App() {
  const [data, setData] = useState<RESPONSE_DATA>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get.data();
        setData(response);
      } catch (err: any) {
        setError(err.message || 'Ошибка загрузки');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="App">Loading...</div>;
  if (error) return <div className="App">Error: {error}</div>;

  return (
    <div className='App'>
      {data ? <p>{data.greeting}</p> : 'Data is empty'}
    </div>
  );
}

export default App;
