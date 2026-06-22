import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isRegister) {
        await api.post('/api/auth/register', form);
        setIsRegister(false);
        setError('Bruker opprettet! Logg inn nå.');
      } else {
        const res = await api.post('/api/auth/login', form);
        localStorage.setItem('token', res.data);
        navigate('/tasks');
      }
    } catch (err) {
      setError('Noe gikk galt. Sjekk brukernavn og passord.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>{isRegister ? 'Registrer deg' : 'Logg inn'}</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            style={styles.input}
            placeholder="Brukernavn"
            value={form.username}
            onChange={e => setForm({ ...form, username: e.target.value })}
          />
          {isRegister && (
            <input
              style={styles.input}
              placeholder="E-post"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
            />
          )}
          <input
            style={styles.input}
            type="password"
            placeholder="Passord"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
          />
          <button style={styles.button} type="submit">
            {isRegister ? 'Registrer' : 'Logg inn'}
          </button>
        </form>
        <p
          style={styles.toggle}
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? 'Har du konto? Logg inn' : 'Ingen konto? Registrer deg'}
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f2f5',
  },
  card: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    width: '360px',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '12px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    boxSizing: 'border-box',
    fontSize: '16px',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
  },
  toggle: {
    marginTop: '16px',
    color: '#4CAF50',
    cursor: 'pointer',
    textAlign: 'center',
  },
};