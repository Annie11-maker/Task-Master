'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState('');

  // Fetch tasks from API on mount
  useEffect(() => {
    fetch('/api/tasks')
      .then((res) => res.json())
      .then(setTasks)
      .catch(console.error);
  }, []);

  // Add a new task
  async function addTask() {
    if (!newTitle.trim()) return;

    const res = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTitle }),
    });

    if (res.ok) {
      const task = await res.json();
      setTasks((prev) => [...prev, task]);
      setNewTitle('');
    } else {
      alert('Failed to add task');
    }
  }

  return (
    <main style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
      <h1>TaskMaster</h1>
      <input
        type="text"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        placeholder="New task title"
        style={{ padding: '0.5rem', width: '70%', marginRight: '1rem' }}
      />
      <button onClick={addTask} style={{ padding: '0.5rem 1rem' }}>
        Add Task
      </button>

      <ul style={{ marginTop: '2rem' }}>
        {tasks.map((task) => (
          <li key={task._id} style={{ padding: '0.5rem 0' }}>
            {task.title} {task.completed ? '✔️' : ''}
          </li>
        ))}
      </ul>
    </main>
  );
}
