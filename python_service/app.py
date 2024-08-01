import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
import logging
from dotenv import load_dotenv

load_dotenv()

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
        cursor.execute("SELECT * FROM elements")
        rows = cursor.fetchall()
        return jsonify(rows)
    except Exception as e:
        logging.error("Error fetching elements: %s", e)
        return jsonify({"error": "Error fetching elements"}), 500


# Define a route to add a new element to the database
@app.route("/elements", methods=["POST"])
def add_element():
    try:
        new_element = request.json["name"]
        if not new_element or new_element.strip() == "":
            return jsonify({"error": "Element name cannot be empty"}), 400
        cursor.execute("INSERT INTO elements (name) VALUES (%s)", (new_element,))
        conn.commit()
        return jsonify({"message": "Element added"}), 201
    except Exception as e:
        logging.error("Error adding element: %s", e)
        return jsonify({"error": "Error adding element"}), 500


# Define a route to update an existing element by ID
@app.route("/elements/<int:id>", methods=["PUT"])
def update_element(id):
    try:
        new_name = request.json["name"]
        if not new_name or new_name.strip() == "":
            return jsonify({"error": "Element name cannot be empty"}), 400
        cursor.execute("UPDATE elements SET name = %s WHERE id = %s", (new_name, id))
        conn.commit()
        return jsonify({"message": "Element updated"}), 200
    except Exception as e:
        logging.error("Error updating element: %s", e)
        return jsonify({"error": "Error updating element"}), 500


# Run the Flask application if this script is executed directly
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
