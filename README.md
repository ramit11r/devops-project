# Experiment 9 (3.2) Full-Stack Project

This single project demonstrates all three required outcomes:

- 3.2.1 Containerizing a React application using a Docker multi-stage build for optimized production deployment.
- 3.2.2 Implementing an automated CI/CD pipeline for a React-based full-stack app with GitHub Actions.
- 3.2.3 Deploying the full-stack application on AWS with an Application Load Balancer and ECS auto-scaling.

## Project Structure

- `client/` React frontend built with Vite.
- `server/` Express backend that exposes API routes and serves the production React build.
- `Dockerfile` Multi-stage production image that builds the React app and packages it with the Node server.
- `.github/workflows/ci-cd.yml` CI/CD pipeline for build, image publishing, and ECS deployment.
- `deploy/task-definition.json` ECS task definition template for GitHub Actions deployments.
- `deploy/cloudformation/ecs-fargate.yml` AWS infrastructure template for ALB and ECS auto-scaling.

## Local Development

### 1. Install dependencies

```bash
npm run install:all
```

### 2. Start the backend

```bash
npm run dev:server
```

### 3. Start the frontend in another terminal

```bash
npm run dev:client
```

The Vite dev server proxies `/api` requests to `http://localhost:5000`.

## Docker Build

```bash
docker build -t experiment-9-app .
docker run -p 5000:5000 experiment-9-app
```

The container exposes the full-stack application on port `5000`.

## GitHub Actions Secrets

Configure these repository secrets before enabling deployment from `main`:

- `AWS_REGION`
- `AWS_ROLE_ARN`
- `ECR_REPOSITORY`
- `ECS_CLUSTER`
- `ECS_SERVICE`

## AWS Deployment Notes

1. Create or reuse a VPC, two public subnets, a security group, and an IAM execution role.
2. Push the Docker image to Amazon ECR.
3. Deploy the `deploy/cloudformation/ecs-fargate.yml` stack with the required parameters.
4. Update `deploy/task-definition.json` with your real account IDs, roles, and image URI if you are not relying solely on the GitHub Actions render step.

## Suggested Viva Explanation

This project uses one codebase to cover the full deployment lifecycle. React is built through a Docker multi-stage process, the backend serves the production frontend assets, GitHub Actions automates testing and container delivery, and AWS ECS runs the final container behind an Application Load Balancer with auto-scaling.
