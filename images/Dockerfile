# Use Ubuntu as the base image
FROM ubuntu:20.04

# Install dependencies
RUN apt-get update && \
    apt-get install -y \
    python3 \
    python3-pip \
    python3-venv \
    python3-dev \
    build-essential \
    libssl-dev \
    libffi-dev \
    && apt-get clean

# Upgrade pip to the latest version
RUN pip3 install --upgrade pip

# Set working directory
WORKDIR /app

# Copy entrypoint script (to execute user scripts)
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# Expose the container's working port
EXPOSE 5002

# Install Flask for creating a simple server
RUN pip3 install flask flask-cors

# Copy the backend server
COPY server.py /app/server.py

# Command to start the Flask server
CMD ["python3", "/app/server.py"]
