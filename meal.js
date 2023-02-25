const loadMeals = (searchText) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayMeals(data.meals));
};

const displayMeals = (meals) => {
  // console.log(meals)
  // Step-1 : Container Element
  const mealsContainer = document.getElementById("meals-container");
  mealsContainer.innerHTML = "";
  meals.forEach((meal) => {
    console.log(meal);
    // Step-2 : Create child for each element
    const mealDiv = document.createElement("div");
    mealDiv.classList.add("col");

    // Step-3 : Set content of the child
    mealDiv.innerHTML = `
        <div class="card h-100">
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <button onclick="loadMealDetails2(${meal.idMeal})" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#mealsDetails">
            Details
            </button>
        </div>
        </div>
        `;

    // Step-4 : appendChild
    mealsContainer.appendChild(mealDiv);
  });
};

const searchMeals = () => {
  const searchText = document.getElementById("search-field").value;
  console.log(searchText);
  loadMeals(searchText);
  document.getElementById("search-field").value = "";
};

const loadMealDetails = idMeal =>{
    const url =`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayMealDetails(data.meals[0]))
    .catch(error => {
        console.log(error)
    })
};

//Async Await

const loadMealDetails2 = async(idMeal) =>{
    const url =`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
    try{
            const res = await fetch(url);
        const data = await res.json();
        displayMealDetails(data.meals[0]);
    }
    catch(error){
        console.log(error);
    }


}

const displayMealDetails = meal =>{
    document.getElementById('mealsDetailsLabel').innerText=meal.strMeal;
    const mealsDetails = document.getElementById('mealsDetailsBody');
    mealsDetails.innerHTML=`
    <img class="img-fluid" src="${meal.strMealThumb}">
    `;

}

loadMeals("chicken");
