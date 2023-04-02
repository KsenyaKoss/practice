// console.log(localStorage);

// const user = {
//   name: 'Oksana Koss',
//   age: 35,
// };

// localStorage.setItem('userData', JSON.stringify(user));

// const user1 = localStorage.getItem('userData');
// console.log(user1);

// console.log(JSON.parse(user1));

// console.log(sessionStorage);



async function searchByLetter(letter){
  try {
      const resolve = await fetch(`www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`);
      const coctailData = await resolve.json();
      return coctailData;
  } catch (error) {
      throw new Error(error.message)
  }
}

const searchList = document.querySelectorAll('.hero___search__list .hero__search__item')
console.log(searchList);

searchList.forEach(li => {
  li.addEventListener('click', (evt)=>{
  let searchLetter = evt.target.textContent
  console.log(searchLetter);
  searchByLetter(searchLetter)

  })
})
