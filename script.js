document.getElementById('convert-btn').addEventListener('click', function () {
  const fileInput = document.getElementById('image-input');
  if (fileInput.files.length > 0) {
    const file = fileInput.files[0];
    convertImageToPDF(file);
  } else {
    alert('Please select an image file.');
  }
});

function convertImageToPDF(file) {
  const reader = new FileReader();
  const successMessage = document.getElementById('success-message');

  reader.onload = function (event) {
    const img = new Image();
    img.onload = function () {
      const pdf = new jspdf.jsPDF({
        orientation: img.width > img.height ? 'l' : 'p',
        unit: 'px',
        format: [img.width, img.height],
      });
      pdf.addImage(event.target.result, 'PNG', 0, 0, img.width, img.height);
      pdf.save('download.pdf');
      successMessage.style.display = 'block';
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
}

const dropArea = document.getElementById('drop-area');

['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName) => {
  dropArea.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

['dragenter', 'dragover'].forEach((eventName) => {
  dropArea.addEventListener(eventName, highlight, false);
});

['dragleave', 'drop'].forEach((eventName) => {
  dropArea.addEventListener(eventName, unhighlight, false);
});

function highlight() {
  dropArea.classList.add('highlight');
}

function unhighlight() {
  dropArea.classList.remove('highlight');
}

dropArea.addEventListener('drop', handleDrop, false);

function handleDrop(e) {
  const dt = e.dataTransfer;
  const files = dt.files;

  handleFiles(files);
}

document.getElementById('image-input').addEventListener('change', function () {
  const files = this.files;
  handleFiles(files);
});

// Function to handle dropped files or file selection
function handleFiles(files) {
  const successMessage = document.getElementById('success-message');

  successMessage.style.display = 'none';

  const fileInput = document.getElementById('image-input');
  fileInput.files = files;

  const fileChosen = document.getElementById('file-chosen');
  if (files.length > 0) {
    fileChosen.textContent = files[0].name;
    previewImage(files[0]);
  } else {
    fileChosen.textContent = 'No file chosen';
    document.getElementById('image-preview').style.display = 'none'; // Hide the image preview
  }
}

// Function to preview image
function previewImage(file) {
  if (file.type.match('image.*')) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const imagePreview = document.getElementById('image-preview');
      imagePreview.src = e.target.result;
      imagePreview.style.display = 'block'; // Make the image visible
    };

    reader.readAsDataURL(file);
  }
}
