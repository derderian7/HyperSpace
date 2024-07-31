import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
import logging

# Create a new Flask application instance
app = Flask(__name__)

# Enable Cross-Origin Resource Sharing (CORS) for the Flask app
CORS(app)

# Configure logging to display debug information
logging.basicConfig(level=logging.DEBUG)

try:
    # Establish a connection to the PostgreSQL database
    conn = psycopg2.connect(
        database=os.environ.get("POSTGRES_DB", "mydatabase"),
        user=os.environ.get("POSTGRES_USER", "myuser"),
        password=os.environ.get("POSTGRES_PASSWORD", "mypassword"),
        host=os.environ.get("POSTGRES_HOST", "db"),
        port="5432",
    )
    cursor = conn.cursor()
    logging.info("Database connection established.")
except Exception as e:
    # Log any errors that occur while connecting to the database
    logging.error("Error connecting to the database: %s", e)
    raise

# Define a route to fetch all elements from the database
@app.route("/elements", methods=["GET"])
def get_elements():
    try:
        # Execute a SQL query to select all elements
        cursor.execute("SELECT * FROM elements")
        rows = cursor.fetchall()
        # Return the fetched rows as a JSON response
        return jsonify(rows)
    except Exception as e:
        # Log any errors that occur while fetching elements
        logging.error("Error fetching elements: %s", e)
        # Return an error response with a 500 status code
        return jsonify({"error": "Error fetching elements"}), 500

# Define a route to add a new element to the database
@app.route("/elements", methods=["POST"])
def add_element():
    try:
        # Get the new element name from the request body
        new_element = request.json["name"]
        # Execute a SQL query to insert the new element
        cursor.execute("INSERT INTO elements (name) VALUES (%s)", (new_element,))
        conn.commit()
        # Return a success message with a 201 status code
        return jsonify({"message": "Element added"}), 201
    except Exception as e:
        # Log any errors that occur while adding an element
        logging.error("Error adding element: %s", e)
        # Return an error response with a 500 status code
        return jsonify({"error": "Error adding element"}), 500

# Define a route to update an existing element by ID
@app.route("/elements/<int:id>", methods=["PUT"])
def update_element(id):
    try:
        # Get the new name for the element from the request body
        new_name = request.json["name"]
        # Execute a SQL query to update the element by ID
        cursor.execute("UPDATE elements SET name = %s WHERE id = %s", (new_name, id))
        conn.commit()
        # Return a success message with a 200 status code
        return jsonify({"message": "Element updated"}), 200
    except Exception as e:
        # Log any errors that occur while updating an element
        logging.error("Error updating element: %s", e)
        # Return an error response with a 500 status code
        return jsonify({"error": "Error updating element"}), 500

# Run the Flask application if this script is executed directly
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
