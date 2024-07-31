# Three-Tier Application

This is a three-tier application consisting of a React client, a Node.js service, and a Python service with a PostgreSQL database. The application is designed to showcase the interaction between different services using Docker containers.

## Project Structure
```
project-root/
│
├── client/
│ ├── src/
│ ├── public/
│ ├── Dockerfile
│ └── package.json
│
├── server/
│ ├── index.js
│ ├── Dockerfile
│ └── package.json
│
├── python_service/
│ ├── app.py
│ ├── requirements.txt
│ ├── Dockerfile
│ ├── .flake8
│ └── pyproject.toml
│
├── docker-compose.yml
└── README.md
```
## Prerequisites

Ensure you have the following installed on your machine:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Setup Instructions

1. **Clone the Repository**

   ```
   git clone https://github.com/derderian7/HyperSpace.git
   cd your-repo-name
   ```

2. **Build and Run the Docker Containers**
   ```
   docker-compose up --build
   ```
   This command will build the Docker images and start the containers as defined in the docker-compose.yml file.

3. **Access the Application**
   
   The React client will be available at: http://localhost:3000
   The Node.js service will be running at: http://localhost:3002
   The Python service will be running at: http://localhost:5000
   PostgreSQL database will be available at: localhost:5432

**Running Linters**

To run linters for the Python service, execute the following command:
```
docker-compose run --rm python_service flake8 .
```
To run black and check the Python code formatting, execute:
```
docker-compose run --rm python_service black --check .
```
To automatically reformat the code using black, run:
```
docker-compose run --rm python_service black .
```
**Directory Details**:

client/: Contains the React frontend application.
Dockerfile: Configuration for building the Docker image for the React app.
src/: Source code for the React app.
public/: Public assets for the React app.

server/: Contains the Node.js service.
Dockerfile: Configuration for building the Docker image for the Node.js service.
index.js: Main file for the Node.js service.

python_service/: Contains the Python service.
Dockerfile: Configuration for building the Docker image for the Python service.
app.py: Main file for the Python service.
requirements.txt: Python dependencies.
.flake8: Configuration for Flake8 linter.
pyproject.toml: Configuration for Black code formatter.

**API Endpoints**

**Node.js Service**

GET /elements: Fetches all elements from the Python service.
POST /elements: Adds a new element through the Python service.
PUT /elements/: Updates an existing element through the Python service.

**Python Service**

GET /elements: Fetches all elements from the PostgreSQL database.
POST /elements: Adds a new element to the PostgreSQL database.
PUT /elements/: Updates an existing element in the PostgreSQL database.

**Stopping the Application**

To stop the application and remove the containers, run:
```
docker-compose down
```
**Troubleshooting**

Ensure all Docker containers are running by executing ``` docker ps ```.
Check the logs of a specific container using docker logs <container_id>.
