import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../dist/public/css/main.css';

function searchWord() {
    // Obtener los valores de los inputs
    const word = document.getElementById('wordInput').value;
    const text = document.getElementById('textInput').value;
    
    // Validar que ambos campos tengan contenido
    if (!word.trim()) {
        alert('Por favor, escribe una palabra para buscar.');
        return;
    }
    
    if (!text.trim()) {
        alert('Por favor, escribe un texto donde buscar.');
        return;
    }
    
    // Convertir a minúsculas para búsqueda sin importar mayúsculas
    const wordLower = word.trim().toLowerCase();
    const textLower = text.toLowerCase();
    
    // Contar las ocurrencias de la palabra
    let count = 0;
    let index = 0;
    
    while ((index = textLower.indexOf(wordLower, index)) !== -1) {
        count++;
        index += wordLower.length;
    }
    
    // Resaltar la palabra en el texto original
    const escapedWord = word.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escapedWord, 'gi');
    const highlightedText = text.replace(regex, match => `<span class="highlight">${match}</span>`);
    
    // Mostrar los resultados
    const resultSection = document.getElementById('resultSection');
    const resultText = document.getElementById('resultText');
    const textDisplay = document.getElementById('textDisplay');
    const countNumber = document.getElementById('countNumber');
    const searchedWord = document.getElementById('searchedWord');
    
    // Actualizar el contador de repeticiones
    countNumber.textContent = count;
    searchedWord.textContent = word.trim();
    
    if (count > 0) {
        resultText.textContent = `Se encontraron ${count} coincidencias exactas.`;
    } else {
        resultText.textContent = `No se encontraron coincidencias de la palabra "${word.trim()}".`;
    }
    
    textDisplay.innerHTML = highlightedText;
    resultSection.classList.add('show');
    
    // Hacer scroll suave hacia los resultados
    resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Esperar a que el DOM cargue completamente
document.addEventListener('DOMContentLoaded', function() {
    // Agregar evento click al botón
    const searchButton = document.getElementById('searchButton');
    if (searchButton) {
        searchButton.addEventListener('click', searchWord);
    }
    
    // Permitir buscar con Enter
    const wordInput = document.getElementById('wordInput');
    if (wordInput) {
        wordInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchWord();
            }
        });
    }
});