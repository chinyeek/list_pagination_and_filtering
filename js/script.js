/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/
/* Create two variables: 1st variable holds the entire student list, 2nd variable indicates the number of student's records we want to display per page
*/
const listItems = document.getElementsByClassName("student-item");
let itemsPerPage = 10; 

//create a function to dynamically show the page numbers based on the total number of student records we have (e.g. 54 records - 6 pages, 44 records - 5 pages)

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
   
   let aa = ul.firstElementChild.firstElementChild
   aa.className = 'active';
   
   // add link function to each page number
   const x = div.getElementsByTagName('a');
   
   for (let i = 0; i < x.length; i++) {
      x[i].addEventListener("click", (e) => {
         let current = document.getElementsByClassName("active");
         current[0].className = current[0].className.replace("active","");
         e.target.className = "active";
         showPage(list, e.target.textContent);
      })
   } 
}

showPage(listItems, 1);
appendPageLinks(listItems);

const header = document.querySelector('.page-header');
const div = document.createElement('div');
const input = document.createElement('input');
const button = document.createElement('button');
var matchedArray = [];

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

appendSearchBar();

function searchNames (searchInput, list) {
   for (let i = 0; i < list.length; i++) {
      list[i].style.display = 'none';
      if (searchInput.value.length !== 0 && list[i].textContent.toLowerCase().includes(searchInput.value.toLowerCase())) {
         matchedArray.push(list[i]);
      }
   }
}
   
button.addEventListener("click", () => {
   searchNames(input, listItems);
   showPage (matchedArray, 1);
   //appendPageLinks(matchedArray);
})

  /*  input.addEventListener("keyup", () => {
      searchNames(input, listItems);
      const result = document.getElementsByClassName('match');
      appendPageLinks(result);
      showPage (result, 1);
   }) */

/*** 
 Create the `showPage` function to hide all of the items in the 
 list except for the ten you want to show.
 
 Pro Tips: 
 - Keep in mind that with a list of 54 students, the last page 
 will only display four.
 - Remember that the first student has an index of 0.
 - Remember that a function `parameter` goes in the parens when 
 you initially define the function, and it acts as a variable 
 or a placeholder to represent the actual function `argument` 
 that will be passed into the parens later when you call or 
 "invoke" the function 
 ***/


/*** 
 Create the `appendPageLinks function` to generate, append, and add 
 functionality to the pagination buttons.
 ***/