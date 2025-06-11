# **KalashnikovCMS** — The Brutalist Publishing Machine

For years, I dreamed of a CMS that’s as simple and powerful as a Kalashnikov rifle - rugged, reliable, and built for pure firepower. No distractions, no database, just **Markdown**, **metadata**, and **deployments**. So, this shit is built to work with Hugo, headless CMS.

## What’s the story?

A brutalist headless CMS machine **built for animals and robots who write Markdown directly**, but it’s also user-friendly. It’s minimal, it’s raw, it’s 100% client-side customizable admin panel plus rock-solid backend pipeline.

## The stack?

* **Editor dashboard:** Pure client-side JS — a lean, toastful editor that lets you upload Word docs (which become Markdown), resize and convert images to WebP, and manage metadata — all in your browser, no backend involved.
* **Uploader backend:** A tiny Flask server app listens for uploads, handles secure file storage, and only that.
* **Build & deploy:** Hugo turns your Markdown and metadata into a blazing-fast static site, automatically deployed to Firebase Hosting — a CDN built for speed and reliability.
* **Automation:** completely decoupled from anything, via a watchdog.
* **Bonus:** It’s AI-agent ready, so you can plug in your favorite AI to spit out content, generate metadata, or help with SEO — it's a Kalashnikov.

## Why brutalist?

All CMS suck. This isn’t grandma’s WordPress. It’s a no-nonsense, bare-bones, lean thing. It looks familiar because it feels right, low maintanance, minimal, intuitive, a tool that just disappears so you can create.

Ready to load? 🔫✨

--- 

# YAML Frontmatter Markdown Dashboard for Hugo Static Site Generator

Customizable CMS admin panel (dashboard) designed to facilitate the creation of YAML frontmatter Markdown files for use with Hugo Static Site Generator or any other headless CMS that relies on MD. It includes features for managing images and converting them to the WebP format. In backend folder you will find a sample flask app to handle server uploads. This dashboard can work independently without backend if you just want to generate and save hugo content package on your local device. 

Lightweight building block for creating your own custom Hugo workflow. It’s designed with content creators in mind, making content creation simple, fast, and enjoyable.

The dashboard is fully customizable to support any type of Markdown frontmatter structure.

If you're looking to migrate from WordPress or a legacy CMS/CRM to a modern, Firebase- or cloud/CDN-based content workflow, I can help. I offer:

- Legacy content preparation and migration
- Custom editor dashboards tailored to your team's needs
- Productivity-focused CMS solutions
- Integration readiness of your CMS for AI agents and automation tools

📩 Contact me at a.sotov@yahoo.co.uk to get a quote and explore how we can improve your publishing workflow.

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
2. **Customize Configuration**: Customize the configuration options according to your project requirements. Update webform UI elements and YAML fields as needed.

3. **Run the Application**: Open the `index.html` file in your web browser to start using the dashboard.

## Usage


1. **Adding Images**: Click the file input button to select images for upload. The dashboard will convert them to WebP format and display them in the preview area.

2. **Managing Images**: Use the "X" button to remove images or the "Move Down" button to rearrange their order.

3. **Word Document Parsing**: Upload DOCX Word documents using the designated input field to convert them to Markdown format.

4. **Downloading Markdown Files**: Use the "Download Package" button to download Markdown files with YAML frontmatter and images in a zip package to your local device. Works out of the box.

5. **Uploading Markdown Files**: Server integration: Upload the generated zip package using the "Upload Package" button to your Hugo site for deployment. Note: must setup backend to use this.

## Contributing

Contributions are welcome! Feel free to submit bug reports, feature requests, or pull requests to help improve this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

