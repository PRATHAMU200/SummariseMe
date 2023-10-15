document.addEventListener('DOMContentLoaded', () => {
    const sourceModelSelect = document.getElementById('sourceModel');
    const sourceTypeSelect = document.getElementById('sourceType');
    const inputFields = document.getElementById('inputFields');
    const generateSummaryBtn = document.getElementById('generateSummaryBtn');
    const summaryResult = document.getElementById('summaryResult');
    // const darkModeToggle = document.getElementById('darkModeToggle');
    

    // // Check if the user has a preferred theme and apply it
    // const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    // if (prefersDarkScheme.matches) {
    //     document.body.classList.toggle('dark-mode');
    //     darkModeToggle.checked = true;
    // }

    // darkModeToggle.addEventListener('change', () => {
    //     // Toggle dark mode
    //     document.body.classList.toggle('dark-mode');
    // });

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
            // Add updated file input with drag-and-drop functionality for PDFs
            inputFields.innerHTML = `
                <div class="pdf-upload">
                    <label for="pdfFile">Upload PDF Document:</label>
                    <input type="file" id="pdfFile" accept=".pdf">
                    <p>OR</p>
                    <div id="dragAndDropArea">
                        <p>Drag & Drop PDF Here</p>
                    </div>
                </div>
            `;

            // Add event listeners for drag-and-drop functionality
            const dragAndDropArea = document.getElementById('dragAndDropArea');
            dragAndDropArea.addEventListener('dragover', handleDragOver);
            dragAndDropArea.addEventListener('drop', handleFileDrop);
        } else if (selectedOption === 'text') {
            // Add textarea for entering long text
            inputFields.innerHTML = `
                <label for="longText">Enter Long Text:</label>
                <textarea id="longText" name="text" rows="6" placeholder="Enter your text here..."></textarea>
            `;
        } else if (selectedOption === 'select') {
            // Add textarea for entering long text
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
    if (selectedOption === 'youtube' || selectedOption === 'text') {
            // Get the input text from the appropriate input field
            inputText = document.getElementById(selectedOption === 'youtube' ? 'youtubeLink' : 'longText').value;
        }

    fetch('/summary',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({inputText: inputText, selectedOption: selectedOption, selectedModel: selectedModel}),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the response as JSON
        })
        .then((data) => {
            // Display the summary response in the summaryResult element
            summaryResult.textContent = data.result;
            document.getElementById("processingAnimation").classList.add("hidden");
            this.disabled = false;
        })
        .catch((error) => {
            console.error('Error:', error);
            document.getElementById("processingAnimation").classList.add("hidden");
            this.disabled = false;
        });
    });
    
});

function handleDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
}

function handleFileDrop(event) {
    event.preventDefault();
    const files = event.dataTransfer.files;

    // Handle the dropped files (e.g., upload to server or process locally)
    // For now, let's display a message
    const dragAndDropArea = document.getElementById('dragAndDropArea');
    dragAndDropArea.innerHTML = '<p>File(s) dropped. Processing...</p>';
}




// generateSummaryBtn.addEventListener('click', () => {
//     // Get the selected source type and corresponding input value
// const selectedOption = sourceTypeSelect.value;
// let inputText = '';

// if (selectedOption === 'youtube' || selectedOption === 'text') {
//     // Get the input text from the appropriate input field
//     inputText = document.getElementById(selectedOption === 'youtube' ? 'youtubeLink' : 'longText').value;
// }

// if (selectedOption === 'pdf') {
//     // Handle PDF upload here (you can add this logic)
//     // For now, let's assume there's no PDF upload
// }

// // Send a POST request to your Flask server with the selected source type and input text
// fetch('/summary', {
//     method: 'GET',
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ sourceType: selectedOption, text: inputText }),
// })
//     .then((response) => {
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         return response.json(); // Parse the response as JSON
//     })
//     .then((data) => {
//         // Display the summary response in the summaryResult element
//         summaryResult.textContent = data.message;
//     })
//     .catch((error) => {
//         console.error('Error:', error);
//     });
// });

// });