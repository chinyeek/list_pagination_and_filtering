/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
//Create two variables: 1st variable holds the entire student list, 2nd variable indicates the number of student's records to display per page

const listItems = document.getElementsByClassName("student-item");
let itemsPerPage = 10; 

//create a function to dynamically show the page - total page number changes based on the total number of student records (e.g. 54 records - 6 pages, 44 records - 5 pages etc.)

function showPage (list, page) {
   let startIndex = (page * itemsPerPage) - itemsPerPage;
   let endIndex = page * itemsPerPage;
   for (let i = 0; i < list.length; i++) {
      if (i >= startIndex && i < endIndex) {
         list[i].style.display = '';
      } else {
         list[i].style.display = 'none';
      }
   }
}

function appendPageLinks (list) {
   // create a 'div' element with class name "pagination"
   const page = document.querySelector('.page');
   const div = document.createElement('div');
   div.className = 'pagination';
   page.appendChild(div);
   
   // create a 'ul' element
   const ul = document.createElement('ul');
   div.appendChild(ul);
   
   // create several 'li' elements
   const numberOfPage = Math.ceil(list.length / 10);
   for (let i = 0; i < numberOfPage; i++) {
      const li = document.createElement('li');
      ul.appendChild(li);
      const a = document.createElement('a');
      a.setAttribute('href', '#');
      a.textContent = i+1;
      li.appendChild(a);
   }
   
   // add 'active' class to the first page initially
   let aa = ul.firstElementChild.firstElementChild
   aa.className = 'active';
   
   // add link function to each pagination anchor text
   const anchor = div.getElementsByTagName('a');
   
   for (let i = 0; i < anchor.length; i++) {
      anchor[i].addEventListener("click", (e) => {
         let current = document.getElementsByClassName("active");
         current[0].className = current[0].className.replace("active","");
         e.target.className = "active";
         showPage(list, e.target.textContent);
      })
   } 
}

//call the function to show first page initially and show pagination links
showPage(listItems, 1);
appendPageLinks(listItems);

//create variables for appending search bar
const header = document.querySelector('.page-header');
const div = document.createElement('div');
const input = document.createElement('input');
const button = document.createElement('button');

// create an array to store search result
var matchedArray = [];

// create a function to append the search bar on top of the page
function appendSearchBar() {
   div.className = 'student-search';
   header.appendChild(div);
   input.setAttribute('placeholder', 'search for students ...');
   input.id = 'search-input';
   div.appendChild(input);
   button.textContent = 'Search';
   button.id = 'search-button';
   div.appendChild(button);
}

// call the function to append search bar on top of the page
appendSearchBar();

// create a function to add matched student record into the matchedArray
function searchNames (searchInput, list) {
   for (let i = 0; i < list.length; i++) {
      list[i].style.display = 'none';
      if (searchInput.value.length !== 0 && list[i].textContent.toLowerCase().includes(searchInput.value.toLowerCase())) {
         matchedArray.push(list[i]);
      }
   }
}

// add event listener to search button
button.addEventListener("click", () => {
   // call the searchNames function
   searchNames(input, listItems);
   
   // check whether pagination links exist, if yes, remove these pagination links
   const checkPagination = document.querySelector('.pagination');
   if (checkPagination !== 'undefined') {
      checkPagination.parentNode.removeChild(checkPagination);
   }

   // check whether any results are found, if yes, show the results using showPage and appendPageLinks functions. If not, show the noResultTxt
   if (matchedArray.length > 0) {
      showPage (matchedArray, 1);
      appendPageLinks(matchedArray);
   } else {
      const noResultTxt = document.createElement('div');
      const txtPosition = document.querySelector('.page');
      const studentListPosition = document.querySelector('.student-list');
      noResultTxt.className = 'message';
      noResultTxt.textContent = "Sorry, we couldn't find any results matching '" + input.value + " '.";
      txtPosition.insertBefore(noResultTxt, studentListPosition);
   }
})