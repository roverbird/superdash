import os
import re
from flask import Flask, jsonify, request

# for file uploads
from werkzeug.utils import secure_filename
import zipfile

app = Flask(__name__)

#HUGO dashboard uploads app
#This is a sample backend flask app that you can use with dashboard.js hugo dashboard editor
#you will need to set up your server, otherwise contact me for help

# Config paths
app.config['UPLOAD_FOLDER'] = '/dir/to/uploads'
app.config['MAX_CONTENT_LENGTH'] = 20 * 1024 * 1024  # set 20 MB limit for uploads
CONTENT_DIR = '/path/to/uploads/content/'
STATIC_DIR = '/path/to/uploads/static/img/'

ALLOWED_EXTENSIONS = {'zip'}
IMAGE_EXTENSIONS = {'.webp', '.jpg', '.jpeg', '.png'}
MARKDOWN_EXTENSION = '.md'

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/putyouruploadapppathhere/', methods=['POST'])
def upload():
    if 'zipFile' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    zip_file = request.files['zipFile']
    if zip_file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if zip_file and allowed_file(zip_file.filename):
        # Check size
        data = zip_file.read()
        if len(data) > app.config['MAX_CONTENT_LENGTH']:
            return jsonify({'error': 'File size exceeds limit'}), 400
        zip_file.stream.seek(0)

        filename = secure_filename(zip_file.filename)
        saved_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        zip_file.save(saved_path)

        try:
            with zipfile.ZipFile(saved_path, 'r') as zip_ref:
                # Validate all files
                for zip_info in zip_ref.infolist():
                    if zip_info.is_dir():
                        continue  # skip directory entries

                    name = zip_info.filename
                    ext = os.path.splitext(name)[1].lower()

                    if '/' in name or '\\' in name:
                        # Reject nested folders
                        os.remove(saved_path)
                        return jsonify({'error': 'Nested directories are not allowed in ZIP'}), 400

                    if ext != MARKDOWN_EXTENSION and ext not in IMAGE_EXTENSIONS:
                        # Reject unknown file types
                        os.remove(saved_path)
                        return jsonify({'error': f'Invalid file type in ZIP: {name}'}), 400

                # Passed validation: extract
                for zip_info in zip_ref.infolist():
                    name = zip_info.filename
                    ext = os.path.splitext(name)[1].lower()

                    if ext == MARKDOWN_EXTENSION:
                        target_dir = CONTENT_DIR
                    elif ext in IMAGE_EXTENSIONS:
                        target_dir = STATIC_DIR
                    else:
                        continue  # should never happen due to prior validation

                    os.makedirs(target_dir, exist_ok=True)
                    zip_ref.extract(zip_info, target_dir)

        except zipfile.BadZipFile:
            os.remove(saved_path)
            return jsonify({'error': 'Invalid ZIP archive'}), 400

        os.remove(saved_path)
        return jsonify({'message': '<br><span class="tag is-info is-large">Submitted, thanks!</span><br>You can leave this page. Do not press "Publish" again.'}), 200

    return jsonify({'error': 'Invalid file type'}), 400

# HUGO uploads end


if __name__ == "__main__":
    app.run()
