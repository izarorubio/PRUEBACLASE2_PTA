const btnGenerate = document.getElementById('btn-generate');
const tacoResultDiv = document.getElementById('taco-result');

// Endpoint de TheMealDB para tacos
const API_BASE = 'https://www.themealdb.com/api/json/v1/1/search.php?s=taco';

async function fetchTaco() {
  try {
    const resp = await fetch(API_BASE);
    if (!resp.ok) throw new Error(`Error: ${resp.status}`);
    const data = await resp.json();
    const meals = data.meals;
    if (!meals) {
      tacoResultDiv.innerHTML = '<p>No se encontró ningún taco.</p>';
      return;
    }
    // Taco aleatorio
    const randomTaco = meals[Math.floor(Math.random() * meals.length)];
    showTaco(randomTaco);
  } catch (err) {
    tacoResultDiv.innerHTML = `<p style="color:red;">${err.message}</p>`;
  }
}

function showTaco(taco) {
  let html = `<h2>${taco.strMeal}</h2>`;
  html += `<img src="${taco.strMealThumb}" alt="${taco.strMeal}">`;
  html += `<h3>Ingredientes:</h3><ul>`;

  for (let i = 1; i <= 20; i++) {
    const ingredient = taco[`strIngredient${i}`];
    const measure = taco[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== '') {
      html += `<li>${ingredient} - ${measure}</li>`;
    }
  }
  html += `</ul>`;
  html += `<h3>Instrucciones:</h3><p>${taco.strInstructions}</p>`;

  tacoResultDiv.innerHTML = html;
  tacoResultDiv.style.transform = "scale(1.05)";
  setTimeout(() => { tacoResultDiv.style.transform = "scale(1)"; }, 300);
}

// Evento click
btnGenerate.addEventListener('click', () => {
  tacoResultDiv.innerHTML = '<p>Cargando...</p>';
  fetchTaco();
});
