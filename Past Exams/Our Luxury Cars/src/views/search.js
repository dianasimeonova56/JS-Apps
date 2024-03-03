import { html, render } from '../../node_modules/lit-html/lit-html.js'
import { main } from '../app.js';
import { searchCar } from '../data/cars.js';

const resultTemplate = (result) => html`<div class="car">
<img src="${result.imageUrl}" alt="example1"/>
<h3 class="model">${result.model}</h3>
<a class="details-btn" href="/details/${result._id}">More Info</a>
</div>`

const searchTemplate = (result, onSearch) => html`
<section id="search">
          <div class="form">
            <h4>Search</h4>
            <form class="search-form" @submit=${onSearch}>
              <input type="text" name="search" id="search-input" />
              <button class="button-list">Search</button>
            </form>
          </div>
          ${result != '' && result.length > 0 
          ? result.map(r => resultTemplate(r)) 
          : html`<div class="search-result">
            <h2 class="no-avaliable">No result.</h2>
          </div>`
        }
        </section>`


export async function searchPage() {
    render(searchTemplate('', onSearch), main);

    async function onSearch(e) {
        e.preventDefault();
        const searchTerm = e.target.elements.search.value;
        console.log(searchTerm);
        if(searchTerm === "") {
            return alert('Please enter a search term');
        }
        const result = await searchCar(searchTerm);
        console.log(result);
        debugger
        render(searchTemplate(result, onSearch), main);
        console.log(result);
    }
}