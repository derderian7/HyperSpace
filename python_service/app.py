import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
import logging

app = Flask(__name__)
CORS(app)

# Configure logging
logging.basicConfig(level=logging.DEBUG)

try:
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
    logging.error("Error connecting to the database: %s", e)
    raise


@app.route("/elements", methods=["GET"])
def get_elements():
    try:
        cursor.execute("SELECT * FROM elements")
        rows = cursor.fetchall()
        return jsonify(rows)
    except Exception as e:
        logging.error("Error fetching elements: %s", e)
        return jsonify({"error": "Error fetching elements"}), 500


@app.route("/elements", methods=["POST"])
def add_element():
    try:
        new_element = request.json["name"]
        cursor.execute("INSERT INTO elements (name) VALUES (%s)", (new_element,))
        conn.commit()
        return jsonify({"message": "Element added"}), 201
    except Exception as e:
        logging.error("Error adding element: %s", e)
        return jsonify({"error": "Error adding element"}), 500


@app.route("/elements/<int:id>", methods=["PUT"])
def update_element(id):
    try:
        new_name = request.json["name"]
        cursor.execute("UPDATE elements SET name = %s WHERE id = %s", (new_name, id))
        conn.commit()
        return jsonify({"message": "Element updated"}), 200
    except Exception as e:
        logging.error("Error updating element: %s", e)
        return jsonify({"error": "Error updating element"}), 500


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
