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

        ctx.lineWidth = eraserMode ? 20 : 5; 
        ctx.lineCap = 'round';
        ctx.strokeStyle = eraserMode ? 'black' : 'white'; // Use white for drawing on black canvas

        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    }

    function resetCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    }

    function toggleEraser() {
        eraserMode = !eraserMode;
        console.log(`Eraser mode is now: ${eraserMode}`); // Debugging line
        document.getElementById('eraserButton').innerText = `Eraser Mode: ${eraserMode ? 'On' : 'Off'}`;
    }
});
