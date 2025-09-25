const tacoHeader = document.getElementById('taco-header');
const tacoTitle = document.getElementById('taco-title');
const tacoInfo = document.getElementById('taco-info');

// Obtener id de la URL
const urlParams = new URLSearchParams(window.location.search);
const mealId = urlParams.get('id');

if (!mealId) {
    tacoInfo.innerHTML = '<p style="color:red;">No se especificó ningún taco.</p>';
} else {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then(res => res.json())
    .then(data => {
        if (!data.meals) {
            tacoInfo.innerHTML = '<p>No se encontró el taco.</p>';
            return;
        }
        const taco = data.meals[0];
        showTacoDetail(taco);
    })
    .catch(err => {
        tacoInfo.innerHTML = `<p style="color:red;">${err.message}</p>`;
    });
}

function showTacoDetail(taco) {
    // HEADER
    tacoHeader.style.backgroundImage = `url(${taco.strMealThumb})`;
    tacoTitle.textContent = taco.strMeal;

    // INFORMACIÓN DETALLADA
    let html = '';

    // Categoría y área
    html += `<h2>Información</h2>`;
    html += `<p><strong>Categoría:</strong> ${taco.strCategory}</p>`;
    html += `<p><strong>Área:</strong> ${taco.strArea}</p>`;

    // Ingredientes y medidas
    html += `<h2>Ingredientes</h2><ul>`;
    for (let i = 1; i <= 20; i++) {
        const ingredient = taco[`strIngredient${i}`];
        const measure = taco[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== '') {
            html += `<li>${ingredient} - ${measure}</li>`;
        }
    }
    html += `</ul>`;

    // Instrucciones
    html += `<h2>Instrucciones</h2><p>${taco.strInstructions}</p>`;

    // Tags
    if (taco.strTags) {
        const tags = taco.strTags.split(',');
        html += `<h2>Tags</h2><div class="taco-tags">`;
        tags.forEach(tag => {
            html += `<span>${tag.trim()}</span>`;
        });
        html += `</div>`;
    }

    // Video de YouTube
    if (taco.strYoutube) {
        html += `<h2>Video de Preparación</h2>`;
        html += `<p><a href="${taco.strYoutube}" target="_blank">Ver en YouTube</a></p>`;
    }

    tacoInfo.innerHTML = html;
}


