from flask import Flask, request, jsonify
import subprocess
import os

app = Flask(__name__)

# Allow CORS for communication with the React frontend
from flask_cors import CORS
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Made for troubleshooting
@app.route('/')
def index():
    return "Flask server is running on port 5003!\n"

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        app.logger.error('No file uploaded')
        return jsonify({"error": "No file uploaded"}), 400
    
    file = request.files['file']
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    
    app.logger.info(f'Received file: {file.filename}')
    
    # Save the file
    file.save(file_path)

    try:
        # Execute the file using entrypoint.sh
        result = subprocess.run(
            ["./entrypoint.sh", file_path],
            capture_output=True,
            text=True,
        )

        return jsonify({
            "output": result.stdout,
            "error": result.stderr,
            "return_code": result.returncode,
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5003, debug=True)
