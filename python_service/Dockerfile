# Use an official Python runtime as a parent image
FROM python:3.12

# Set the working directory
WORKDIR /app

# Copy the requirements.txt file to the working directory
COPY requirements.txt .

# Install the dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code to the working directory
COPY . .

# Run linters
RUN flake8 .
RUN black --check .

# Expose port 5000
EXPOSE 5000

# Start the Flask application
CMD ["python", "app.py"]
