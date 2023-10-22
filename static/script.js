document.addEventListener('DOMContentLoaded', () => {
    const sourceModelSelect = document.getElementById('sourceModel');
    const sourceTypeSelect = document.getElementById('sourceType');
    const inputFields = document.getElementById('inputFields');
    const generateSummaryBtn = document.getElementById('generateSummaryBtn');
    const summaryResult = document.getElementById('summaryResult');

    sourceTypeSelect.addEventListener('change', () => {
        const selectedOption = sourceTypeSelect.value;

        // Hide all input fields
        inputFields.innerHTML = '';

        // Dynamically add input fields based on the selected source type
        if (selectedOption === 'youtube') {
            // Add input field for YouTube video link
            inputFields.innerHTML = `
                <label for="youtubeLink">Enter YouTube Video Link:</label>
                <input type="text" id="youtubeLink" name="text" placeholder="https://www.youtube.com/watch?v=...">
            `;
        } else if (selectedOption === 'pdf') {
            inputFields.innerHTML = `
                <div class="pdf-upload">
                    <div class="drop-pdf-upload">
                    <div id="pdfFileDropArea">
                        <p id="file-name">Drag/drop files here <br> or<br>Select files</p>
                        <input type="file" id="pdfFileInput" accept=".pdf" style="display: none;">
                    </div>
                        
                    </div>
                    <div id="pagenumbers">
                        <label for="from">From PageNo.: </label>
                        <input class="pagenumber" type="number" id="from" placeholder="From:" required>
                        <label for="till">Till PageNo.: </label>
                        <input class="pagenumber" type="number" id="till" placeholder="Till:" required>
                    </div>
                </div>
            `;

            // Add event listeners for drag-and-drop functionality
            const pdfFileDropArea = document.getElementById('pdfFileDropArea');
            const pdfFileInput = document.getElementById('pdfFileInput');
            pdfFileDropArea.addEventListener('click', () => {
                pdfFileInput.click(); // Trigger the hidden input file element
            });
            pdfFileDropArea.addEventListener('dragover', (e) => {
                e.preventDefault(); // Prevent default behavior
                pdfFileDropArea.classList.add('dragover'); // Add a CSS class for styling
            });
            
            pdfFileDropArea.addEventListener('dragleave', () => {
                pdfFileDropArea.classList.remove('dragover'); // Remove the dragover class
            });
            
            pdfFileDropArea.addEventListener('drop', (e) => {
                e.preventDefault(); // Prevent default behavior
                pdfFileDropArea.classList.remove('dragover'); // Remove the dragover class
                const files = e.dataTransfer.files; // Get the dropped files
                handleDroppedFiles(files);
            });
            
            pdfFileInput.addEventListener('change', (e) => {
                const files = e.target.files; // Get the selected files
                handleDroppedFiles(files);
            });
            
            function handleDroppedFiles(files) {
                // Process the dropped or selected files (e.g., upload to the server)
                for (const file of files) {
                    const filename = file.name;
                    console.log('Selected file:', file.name);
                    document.getElementById("file-name").innerText="Selected: "+file.name;

                }
            }
        } else if (selectedOption === 'text') {
            inputFields.innerHTML = `
                <label for="longText">Enter Long Text:</label>
                <textarea id="longText" name="text" rows="6" placeholder="Enter your text here..."></textarea>
            `;
        } else if (selectedOption === 'select') {
            inputFields.innerHTML = `
            `;
        }
    });

    generateSummaryBtn.addEventListener('click', function(event) {
    event.preventDefault();
    this.disabled = true;
    document.getElementById("processingAnimation").classList.remove("hidden");

    const selectedOption = sourceTypeSelect.value;
    const selectedModel = sourceModelSelect.value;
    let inputText = 'Nonee';
    let file = 'Nonee';
    let till = 'Nonee';
    let from = 'Nonee';
    let goOn = false;
    if (selectedOption === 'youtube' || selectedOption === 'text') {
            inputText = document.getElementById(selectedOption === 'youtube' ? 'youtubeLink' : 'longText').value;
            goOn = true;
        }
    else if (selectedOption=='pdf') {
        from = document.getElementById('from').value;
        till = document.getElementById('till').value;
        file = pdfFileInput.files[0];
        inputText = file.name;
        console.log(file+"yes");
        if(file){
            goOn = true;
            console.log("files yes");
        }
    }
    if(goOn){
        const formData = new FormData();
        formData.append('inputText', inputText);
        formData.append('selectedOption', selectedOption);
        formData.append('selectedModel', selectedModel);
        formData.append('from', from);
        formData.append('till', till);
        formData.append('file', file);    
    fetch('/summary',{
            method: 'POST',
            body: formData,
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            summaryResult.innerHTML = data.result;
            document.getElementById("processingAnimation").classList.add("hidden");
            this.disabled = false;
        })
        .catch((error) => {
            console.error('Error:', error);
            document.getElementById("processingAnimation").classList.add("hidden");
            this.disabled = false;
        });
    }else{
        alert("Error!! Enter details Correctly!!");
    }
    });
    
});