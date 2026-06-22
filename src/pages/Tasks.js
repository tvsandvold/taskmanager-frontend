import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await api.get('/api/tasks');
      setTasks(res.data);
    } catch (err) {
      navigate('/');
    }
  };

  const createTask = async (e) => {
    e.preventDefault();
    await api.post('/api/tasks', { title, description });
    setTitle('');
    setDescription('');
    fetchTasks();
  };

  const toggleComplete = async (task) => {
    await api.put(`/api/tasks/${task.id}`, {
      ...task,
      completed: !task.completed,
    });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await api.delete(`/api/tasks/${id}`);
    fetchTasks();
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>Mine oppgaver</h2>
        <button style={styles.logoutBtn} onClick={logout}>Logg ut</button>
      </div>

      <form onSubmit={createTask} style={styles.form}>
        <input
          style={styles.input}
          placeholder="Tittel"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <input
          style={styles.input}
          placeholder="Beskrivelse (valgfritt)"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button style={styles.addBtn} type="submit">+ Legg til oppgave</button>
      </form>

      <div style={styles.taskList}>
        {tasks.map(task => (
          <div key={task.id} style={styles.taskCard}>
            <div style={styles.taskInfo}>
              <p style={{
                ...styles.taskTitle,
                textDecoration: task.completed ? 'line-through' : 'none',
                color: task.completed ? '#aaa' : '#333',
              }}>
                {task.title}
              </p>
              {task.description && (
                <p style={styles.taskDesc}>{task.description}</p>
              )}
            </div>
            <div style={styles.taskActions}>
              <button
                style={task.completed ? styles.undoBtn : styles.completeBtn}
                onClick={() => toggleComplete(task)}
              >
                {task.completed ? 'Angre' : '✓'}
              </button>
              <button
                style={styles.deleteBtn}
                onClick={() => deleteTask(task.id)}
              >
                🗑
              </button>
            </div>
          </div>
        ))}
        {tasks.length === 0 && (
          <p style={styles.empty}>Ingen oppgaver enda. Legg til en!</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: '600px', margin: '40px auto', padding: '0 20px' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  logoutBtn: { padding: '8px 16px', backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  form: { backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', marginBottom: '20px' },
  input: { width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ddd', boxSizing: 'border-box', fontSize: '16px' },
  addBtn: { width: '100%', padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', fontSize: '16px', cursor: 'pointer' },
  taskList: { display: 'flex', flexDirection: 'column', gap: '10px' },
  taskCard: { backgroundColor: 'white', padding: '16px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  taskInfo: { flex: 1 },
  taskTitle: { margin: 0, fontSize: '16px', fontWeight: 'bold' },
  taskDesc: { margin: '4px 0 0', color: '#666', fontSize: '14px' },
  taskActions: { display: 'flex', gap: '8px' },
  completeBtn: { padding: '6px 12px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  undoBtn: { padding: '6px 12px', backgroundColor: '#95a5a6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  deleteBtn: { padding: '6px 12px', backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  empty: { textAlign: 'center', color: '#aaa', marginTop: '40px' },
};