import './App.css'
import { useEffect, useState } from 'react'

const initialState = {
  project: '',
  stack: {},
  tasks: [],
}

function App() {
  const [data, setData] = useState(initialState)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadOverview = async () => {
      try {
        const response = await fetch('/api/overview')

        if (!response.ok) {
          throw new Error('Failed to load project overview.')
        }

        const result = await response.json()
        setData(result)
      } catch (err) {
        setError(err.message)
      }
    }

    loadOverview()
  }, [])

  return (
    <main className="app-shell">
      <section className="hero-card">
        <p className="eyebrow">Experiment 9 (3.2)</p>
        <h1>One full-stack project for Docker, CI/CD, and AWS deployment.</h1>
        <p className="lead">
          This sample app shows how a React frontend and an Express backend can be
          packaged into one production image, shipped through GitHub Actions, and
          deployed to AWS behind a load balancer with auto-scaling.
        </p>
        <div className="status-row">
          <span>Docker multi-stage build</span>
          <span>GitHub Actions pipeline</span>
          <span>AWS ECS + ALB + Auto Scaling</span>
        </div>
      </section>

      <section className="grid-layout">
        <article className="panel stack-panel">
          <h2>Project stack</h2>
          <div className="stack-list">
            {Object.entries(data.stack).map(([key, value]) => (
              <div key={key} className="stack-item">
                <span>{key}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </article>

        <article className="panel task-panel">
          <h2>Experiment deliverables</h2>
          {error ? <p className="error-message">{error}</p> : null}
          <div className="task-list">
            {data.tasks.map((task) => (
              <div key={task.id} className="task-card">
                <div>
                  <p className="task-area">{task.area}</p>
                  <h3>{task.title}</h3>
                </div>
                <span className="task-status">{task.status}</span>
              </div>
            ))}
          </div>
        </article>
      </section>
    </main>
  )
}

export default App
