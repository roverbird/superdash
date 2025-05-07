// Define constants for element references
const refs = {
    imagePreviews: document.getElementById('previews'),
    fileSelector: document.getElementById('file-input'),
    parseWordDocxFileInput: document.getElementById('parseWordDocxFile'),
    modifiedFilenames: []
};

// Function to add image preview
function addImagePreview(container, imageURL, filename) {
    const imageBox = document.createElement("div");
    imageBox.classList.add("column", "is-one-fifth");

    const imageLink = document.createElement("a");
    imageLink.href = imageURL;
    imageLink.download = filename;

    const imgElement = document.createElement("img");
    imgElement.src = imageURL;

    const removeButton = createButton("X", "is-danger", () => removeImage(imageBox, filename));
    const moveDownButton = createButton("Move Down", "is-primary", () => moveImageDown(container, imageBox, filename));

    imageLink.appendChild(imgElement);
    imageBox.appendChild(imageLink);
    imageBox.appendChild(removeButton);
    imageBox.appendChild(moveDownButton);
    container.appendChild(imageBox);

    refs.modifiedFilenames.push(filename);
}

// Function to remove image
function removeImage(imageBox, filename) {
    imageBox.remove();
    refs.modifiedFilenames = refs.modifiedFilenames.filter(name => name !== filename);
}

// Function to move image down
function moveImageDown(container, imageBox, filename) {
    const index = refs.modifiedFilenames.indexOf(filename);
    if (index < refs.modifiedFilenames.length - 1) {
        [refs.modifiedFilenames[index], refs.modifiedFilenames[index + 1]] = [refs.modifiedFilenames[index + 1], refs.modifiedFilenames[index]];
        container.insertBefore(imageBox, imageBox.nextElementSibling.nextElementSibling);
    }
}

// Helper function to create buttons
function createButton(text, className, onClick) {
    const button = document.createElement("button");
    button.textContent = text;
    button.classList.add("button", className, "is-small");
    button.addEventListener("click", onClick);
    return button;
}

// Function to process image file // used in image preview only
function processFile(file) {
    if (!file) return;

    const now = new Date();
    const timestamp = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}-IMG-${Math.floor(Math.random() * 10000).toString().padStart(5, '0')}`;

    const reader = new FileReader();
    reader.onload = function (event) {
        const imageURL = event.target.result;
        const filename = `${timestamp}.webp`;

        const tempImg = new Image();
        tempImg.src = imageURL;
        tempImg.onload = function() {
            const targetWidth = 820;
            const targetHeight = (targetWidth / tempImg.width) * tempImg.height;

            const canvas = document.createElement('canvas');
            canvas.width = targetWidth;
            canvas.height = targetHeight;
            const ctx = canvas.getContext('2d');

            ctx.drawImage(tempImg, 0, 0, targetWidth, targetHeight);

            const webPURL = canvas.toDataURL("image/webp");
            addImagePreview(refs.imagePreviews, webPURL, filename);
        };
    };
    reader.readAsDataURL(file);
}

// Function to process files
function processFiles(files) {
    for (const file of files) {
        processFile(file);
    }
}

// Event listener for file input change
refs.fileSelector.addEventListener("change", function () {
    processFiles(refs.fileSelector.files);
    refs.fileSelector.value = "";
});


// Function to print filenames in YAML format
function printFilenamesYAML() {
    console.log("Figures:");
    refs.modifiedFilenames.forEach(filename => {
        console.log(`- '${filename}'`);
    });
}

// Function to generate YAML frontmatter
function generateYAMLFrontmatter() {
//    const slugify = str => {
//        const normalizedStr = str.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Normalize and remove diacritics
//        const slug = normalizedStr
//            .toLowerCase()
//            .trim()
//            .replace(/[^\w\s-]/g, '')
//            .replace(/[\s_-]+/g, '-')
//            .replace(/^-+|-+$/g, '');
//
//        const words = slug.split('-').slice(0, 5);
//        return words.join('-');
//    };
//

    const slugify = str => {
        const normalized = str
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")     // remove diacritics
            .replace(/[^\w\s]/g, "")             // remove special characters
            .trim()
            .toLowerCase();

        const firstWord = normalized.split(/\s+/)[0]; // get first word only
        return firstWord;
    };

    const author = document.getElementById('author').value.split(',').map(author => author.trim().replace(/['"]/g, ''));
    const title = document.getElementById('title').value.replace(/['"]/g, '');
    const description = document.getElementById('description').value.replace(/['"]/g, '');
    //const rubrika = document.getElementById('rubrika').value.replace(/['"]/g, '');
    const imageCredit = document.getElementById('imageCredit').value.replace(/['"]/g, '');
    const tags = document.getElementById('tags').value.split(',').map(tag => tag.trim().replace(/['"]/g, ''));

    const sekcija = document.getElementById('sekcija').value;
    //const draft = document.getElementById('draft').value;
    const md = editor.getMarkdown();

    const slug = slugify(title);

    const selectedDate = new Date(document.getElementById('dateInput').value);
    const dateHugo = selectedDate.toISOString().slice(0, 19);
    const dateFilename = `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1).toString().padStart(2, '0')}-${selectedDate.getDate().toString().padStart(2, '0')}`;
    const randomSuffix = Math.floor(Math.random() * 10000).toString().padStart(5, '0');
    const filenameMd = `${dateFilename}-${sekcija}-${slug}-${randomSuffix}.md`;

    // Set your YAML frontmatter here
    const yamlFrontmatter = `---
avtor:${author && author.some(Boolean) ? `\n${author.map(author => `- '${author}'`).join('\n')}` : ''}
date: '${dateHugo}'
tags:${tags && tags.some(Boolean) ? `\n${tags.map(tag => `- '${tag}'`).join('\n')}` : ''}
title: '${title}'
description: '${description}'
fototitle:${imageCredit ? ` '${imageCredit}'` : ''}
sekcija:${sekcija ? `\n- '${sekcija}'` : ''}
foto:${refs.modifiedFilenames.length > 0 ? ` '${refs.modifiedFilenames[0]}'` : ''}
figures:${refs.modifiedFilenames.length > 0 ? `\n${refs.modifiedFilenames.map(filename => `- '${filename}'`).join('\n')}` : ''}

---
${md}`;

    return { yamlFrontmatter, filenameMd };

}

// Helper function to handle image conversion (cropping, resizing, and WebP conversion)
async function processImage(imgElement) {
    return new Promise((resolve, reject) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d', { alpha: false }); // disable alpha for better compression if transparency isn't needed
        const img = new Image();

        img.onload = function () {
            const targetWidth = 1200;
            const targetHeight = Math.round(targetWidth / 1.91); // 1200×630

            canvas.width = targetWidth;
            canvas.height = targetHeight;

            const imgAspectRatio = img.width / img.height;
            const targetAspectRatio = targetWidth / targetHeight;

            let cropWidth, cropHeight, offsetX, offsetY;

            if (imgAspectRatio > targetAspectRatio) {
                cropHeight = img.height;
                cropWidth = img.height * targetAspectRatio;
                offsetX = (img.width - cropWidth) / 2;
                offsetY = 0;
            } else {
                cropWidth = img.width;
                cropHeight = img.width / targetAspectRatio;
                offsetX = 0;
                offsetY = (img.height - cropHeight) / 2;
            }

            ctx.clearRect(0, 0, targetWidth, targetHeight);
            ctx.drawImage(img, offsetX, offsetY, cropWidth, cropHeight, 0, 0, targetWidth, targetHeight);

            // High-quality WebP output
            canvas.toBlob(
                blob => {
                    if (blob) resolve(blob);
                    else reject(new Error('Canvas toBlob failed'));
                },
                'image/webp',
                1.0 // Quality: 1.0 = best quality
            );
        };

        img.onerror = reject;
        img.crossOrigin = 'anonymous'; // Allow CORS loading if needed
        img.src = imgElement.src;
    });
}


// Function to download Markdown file with YAML frontmatter and images
function downloadMarkdownWithYAMLAndImages() {
    const { yamlFrontmatter, filenameMd } = generateYAMLFrontmatter();
    const filenamePaket = `${filenameMd}`;
    const markdownContent = `${yamlFrontmatter}\n`;

    // Create a zip file
    const zip = new JSZip();

    // Add Markdown file with YAML frontmatter
    zip.file(filenamePaket, markdownContent);

    // Add images
    const imagePromises = Array.from(document.querySelectorAll('#previews img')).map(img => processImage(img));

    Promise.all(imagePromises)
        .then(imageBlobs => {
            imageBlobs.forEach((blob, index) => {
                const filename = refs.modifiedFilenames[index];
                zip.file(filename, blob, { binary: true });
            });

            // Generate zip content and trigger download
            zip.generateAsync({ type: "blob" }).then(content => {
                saveAs(content, `${filenamePaket.split('.')[0]}.zip`);
            }).catch(error => {
                console.error('Error generating zip content:', error);
            });
        })
        .catch(error => {
            console.error('Error fetching images:', error);
        });
}

// Function to upload Markdown file with YAML frontmatter and images
function uploadMarkdownWithYAMLAndImages() {
    const { yamlFrontmatter, filenameMd } = generateYAMLFrontmatter();
    const filenamePaket = `${filenameMd}`;
    const markdownContent = `${yamlFrontmatter}\n`;

    // Create a zip file
    const zip = new JSZip();

    // Add Markdown file with YAML frontmatter
    zip.file(filenamePaket, markdownContent);

    // Add images
    const imagePromises = Array.from(document.querySelectorAll('#previews img')).map(img => processImage(img));

    Promise.all(imagePromises)
        .then(imageBlobs => {
            imageBlobs.forEach((blob, index) => {
                const filename = refs.modifiedFilenames[index];
                zip.file(filename, blob, { binary: true });
            });

            // Generate zip content and trigger upload
            zip.generateAsync({ type: "blob" }).then(content => {
                uploadZipToFlask(content); // Upload the generated zip file
            }).catch(error => {
                console.error('Error generating zip content:', error);
            });
        })
        .catch(error => {
            console.error('Error fetching images:', error);
        });
}

// Function to upload zip to Flask
function uploadZipToFlask(zip) {
    const formData = new FormData();
    const datePaket = Date.now();
    formData.append('zipFile', zip, `paket-${datePaket}.zip`);

    fetch('/yourendpointurl/', { // your flask endpointurl goes here // you will need to setup flask app on your server
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Failed to upload file');
        }
    })
    .then(data => {
        document.getElementById('uploadMessage').innerHTML = data.message;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}



// TOAST UI editor
const editor = new toastui.Editor({
    el: document.querySelector('#editor'),
    height: '1000px',
    //initialEditType: 'markdown',
    initialEditType: 'wysiwyg',
    previewStyle: 'vertical',
    toolbarItems: [
        ['heading', 'bold', 'italic'],
        ['hr', 'quote'],
        ['ul', 'ol', 'task', 'indent', 'outdent'],
        ['table', 'link'],
    ]
});

// Function to parse uploaded Word document to Markdown
function parseWordDocxFile(inputElement) {
    var files = inputElement.files || [];
    if (!files.length) return;
    var file = files[0];

    console.time();
    var reader = new FileReader();
    reader.onloadend = function(event) {
        var arrayBuffer = reader.result;

        mammoth.convertToMarkdown({arrayBuffer: arrayBuffer}).then(function (resultObject) {
            let markdown = resultObject.value;

            // Remove unwanted escaping of punctuation marks
            markdown = markdown.replace(/\\([^\w\s])/g, '$1');

            // Set the modified Markdown to the editor
            editor.setMarkdown(markdown);
        }).catch(function(error) {
            console.error('Error converting Word document to Markdown:', error);
        });
    };
    reader.readAsArrayBuffer(file);
}

// Event listener for Word document file input change
refs.parseWordDocxFileInput.addEventListener("change", function () {
    parseWordDocxFile(this);
    this.value = ""; // Clear the input field after processing the file
});

// Event listener for "Generate YAML" button
// This allows downloading File Package to local machine
document.getElementById('downloadMarkdownWithYAMLAndImages').addEventListener('click', function(event) {
    event.preventDefault();
    downloadMarkdownWithYAMLAndImages();
});

// Event listener for "Upload Package" button
document.getElementById('yamlForm').addEventListener('submit', function(event) {
    event.preventDefault();
    uploadMarkdownWithYAMLAndImages();
});

