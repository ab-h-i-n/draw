document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('drawingCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let drawing = false;
    let eraserMode = false;

    // Mouse events
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseleave', stopDrawing); // Stop drawing when mouse leaves the canvas

    // Touch events
    canvas.addEventListener('touchstart', startDrawing);
    canvas.addEventListener('touchend', stopDrawing);
    canvas.addEventListener('touchmove', draw);
    canvas.addEventListener('touchleave', stopDrawing); // Stop drawing when touch leaves the canvas

    document.getElementById('resetButton').addEventListener('click', resetCanvas);
    document.getElementById('eraserButton').addEventListener('click', toggleEraser);
    document.getElementById('downloadButton').addEventListener('click', downloadImage);

    function startDrawing(event) {
        drawing = true;
        draw(event); // Call draw to start drawing immediately
    }

    function stopDrawing() {
        drawing = false;
        ctx.beginPath(); // Reset the path
    }

    function draw(event) {
        if (!drawing) return;

        // Prevent default touch behavior (like scrolling)
        event.preventDefault();

        // Get the position of the mouse or touch
        const rect = canvas.getBoundingClientRect();
        const x = event.touches ? event.touches[0].clientX - rect.left : event.clientX - rect.left;
        const y = event.touches ? event.touches[0].clientY - rect.top : event.clientY - rect.top;

        if (eraserMode) {
            // Use clearRect to erase instead of drawing
            ctx.clearRect(x - 10, y - 10, 20, 20); // Erase a 20x20 area around the touch/mouse position
        } else {
            ctx.lineWidth = 5; 
            ctx.lineCap = 'round';
            ctx.strokeStyle = 'white'; // Use white for drawing on black canvas

            ctx.lineTo(x, y);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x, y);
        }
    }

    function resetCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    }

    function toggleEraser() {
        eraserMode = !eraserMode;
        console.log(`Eraser mode is now: ${eraserMode}`); // Debugging line
        document.getElementById('eraserButton').innerText = `Eraser Mode: ${eraserMode ? 'On' : 'Off'}`;
    }

    function downloadImage(event) {
        event.preventDefault(); // Prevent default action

        const link = document.createElement('a');
        link.download = 'canvas_image.png'; // Set the name of the downloaded file
        link.href = canvas.toDataURL(); // Convert the canvas to a data URL

        // Disable the button to prevent multiple clicks
        const downloadButton = document.getElementById('downloadButton');
        downloadButton.disabled = true;

        // Trigger the download
        link.click(); 

        // Re-enable the button after a short delay
        setTimeout(() => {
            downloadButton.disabled = false;
        }, 500); // Re-enable after 0.5 seconds
    }
});
