document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('upload');
    const previewContainer = document.getElementById('preview-container');

    input.addEventListener('change', function() {
        // Limpar qualquer pré-visualização anterior
        previewContainer.innerHTML = '';

        const file = this.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = function(e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.alt = 'Pré-visualização';
                img.style.maxWidth = '200px';
                img.style.maxHeight = '200px';
                previewContainer.appendChild(img);
            }

            reader.readAsDataURL(file);
        }
    });
});