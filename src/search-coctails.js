async function searchCocktailsByLetter(letter) {
  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${letter}`
  );
  const data = await response.json();
  return data.drinks;
}

const ulList = document.querySelectorAll(
  '.hero___search__list .hero__search__item'
);
const selectList = document.querySelector('.hero__select');
console.log(selectList);

// Добавляем слушатели на каждый элемент select
// for (let i = 0; i < selectList.length; i++) {
//   selectList[i].addEventListener('change', () => {
//     console.log(this.value);
//     const selectedValue = this.value;
//     console.log(selectedValue);
//   });
// }

ulList.forEach(li => {
  li.addEventListener('click', ev => {
    const selectedLetter = ev.target.textContent.toLowerCase();
    console.log(selectedLetter);
    parseCoctailPagination();
    searchCocktailsByLetter(selectedLetter).then(value => {
      return value;
    });
  });
});

function parseCoctailPagination(data) {
  const dataCoctails = searchCocktailsByLetter();
  let currentPage = 1;
  let cardsPerPage = 3;

  function displayList(arrData, cards, page) {
    const coctailsBox = document.querySelector('.searched__list');
    coctailsBox.innerHTML = '';
    page--;
    const start = cards * page;
    const end = start + cards;
    const paginatedData = arrData.slice(start, end);

    const renderedCoctails = paginatedData
      .map(
        el => `
        <li class="searched-cocktail__item">
        <img class="searched-cocktail__image" src="${cocktail.strDrinkThumb}" alt="${cocktail.strCategory}" loading="lazy" width="0" height="0"/>
        <h3 class="searched-cocktail__uppertext">${cocktail.strDrink}</h3>
        </li>`
      )
      .join('');
    coctailsBox.insertAdjacentHTML('afterbegin', renderedCoctails);
  }
  function displayPagination(arrData, cards) {
    const paginationList = document.querySelector('.pagination__list');
    const pagesCount = Math.ceil(arrData.length / cards);
    for (let i = 0; index < pagesCount; index++) {
      const liEl = displayPaginationBtn(i + 1);
      paginationList.appendChild(liEl);
    }
  }
  function displayPaginationBtn(page) {
    const liEl = document.createElement('li');
    liEl.classList.add('pagination__item');
    liEl.innerText = page;
    liEl.addEventListener('click', () => {
      currentPage = page;
      displayList(dataCoctails, cardsPerPage, currentPage);
    });
    return liEl;
  }

  displayList(dataCoctails, cardsPerPage, currentPage);
  displayPagination(dataCoctails, cardsPerPage);
}
