const path = require('path');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 5000;
const clientOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173';
const publicDir = path.join(__dirname, '..', 'public');

const tasks = [
  {
    id: 1,
    title: 'Containerize the React client with Docker multi-stage builds',
    area: 'Docker',
    status: 'Done'
  },
  {
    id: 2,
    title: 'Automate build, image publishing, and ECS deployment with GitHub Actions',
    area: 'CI/CD',
    status: 'Ready'
  },
  {
    id: 3,
    title: 'Deploy the app on AWS with an ALB and ECS auto-scaling',
    area: 'AWS',
    status: 'Provisioned via templates'
  }
];

app.use(cors({ origin: clientOrigin }));
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'experiment-9-fullstack-app',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/overview', (_req, res) => {
  res.json({
    project: 'Experiment 9 (3.2)',
    stack: {
      frontend: 'React + Vite',
      backend: 'Node.js + Express',
      containerization: 'Docker multi-stage production image',
      cicd: 'GitHub Actions -> Amazon ECR -> Amazon ECS',
      aws: 'Application Load Balancer + ECS Fargate + Auto Scaling'
    },
    tasks
  });
});

app.get('/api/tasks', (_req, res) => {
  res.json(tasks);
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(publicDir));

  app.get(/^(?!\/api\/).*/, (_req, res) => {
    res.sendFile(path.join(publicDir, 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
