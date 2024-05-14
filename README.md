# YAML Frontmatter Markdown Dashboard for Hugo Static Site Generator

This is a customizable one-page dashboard designed to facilitate the creation of YAML frontmatter Markdown files for use with Hugo Static Site Generator or any other headless CMS that relies on MD. It includes features for managing images and converting them to the WebP format.

## Demo

[Live Demo](https://textvisualization.app/hugo-yaml-markdown-generator/)

## Features

- **YAML Frontmatter Generation**: Automatically generate YAML frontmatter for your Markdown files using a webform.
- **Image Management**: Easily add, remove, and rearrange images within your Markdown files, name converted images consistently and list them in your YAML frontmatter.
- **WebP Conversion**: Automatically convert uploaded images to the WebP format for improved performance and bandwidth savings.
- **Word Document Parsing**: Convert DOCX Word documents to Markdown format with ease, edit resulting MD with Toast UI editor.

## Getting Started

1. **Clone the Repository**: Clone this repository to your local machine.

    ```bash
    git clone https://github.com/roverbird/superdash.git
    ```

2. **Install Dependencies**: Make sure you have all the necessary dependencies installed. This project relies on JavaScript libraries like Toast UI Editor and JSZip.

You can install them from CDN:

    ```html
    <!-- Toast UI editor -->
    <script src="https://uicdn.toast.com/editor/latest/toastui-editor-all.min.js"></script>
    <!-- Mammoth to convert Docx -->
    <script src="https://cdn.jsdelivr.net/npm/mammoth@1.4.8/mammoth.browser.min.js"></script>
    <!-- JSZip -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"></script>
    <!-- FileSaver -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js"></script>
    ```

3. **Customize Configuration**: Customize the configuration options according to your project requirements. Update webform UI elements and YAML fields as needed.

4. **Run the Application**: Open the `index.html` file in your web browser to start using the dashboard.

## Usage

1. **Adding Images**: Click the file input button to select images for upload. The dashboard will convert them to WebP format and display them in the preview area.

2. **Managing Images**: Use the "X" button to remove images or the "Move Down" button to rearrange their order.

3. **Word Document Parsing**: Upload DOCX Word documents using the designated input field to convert them to Markdown format.

4. **Downloading Markdown Files**: Use the "Generate YAML" button to download Markdown files with YAML frontmatter and images in a zip package to your local device.

5. **Uploading Markdown Files**: Server integration: Upload the generated zip package using the "Upload Package" button to your Hugo site for deployment.

## Contributing

Contributions are welcome! Feel free to submit bug reports, feature requests, or pull requests to help improve this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

