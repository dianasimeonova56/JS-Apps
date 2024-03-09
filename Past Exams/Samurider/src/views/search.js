import { html,render } from '../../node_modules/lit-html/lit-html.js'
import { main } from '../app.js';
import { searchRide } from '../data/rides.js';
import { searchRideTemplate } from '../constants/rideTemplate.js';

const resultTemplate = (search, searchRideTemplate) => html`
${search != '' && search.length > 0
    ? search.map(s => searchRideTemplate(s))
:html`
<div class="search-result">
    <h2 class="no-avaliable">No result.</h2>
</div>
`}
`

const searchTemplate = (onSearch, clicked, search, searchRideTemplate) => html`
   <section id="search">
<div class="form">
  <h4>Search</h4>
  <form class="search-form" @submit=${onSearch}>
    <input
      type="text"
      name="search"
      id="search-input"
    />
    <button class="button-list">Search</button>
  </form>
</div>
<h4 id="result-heading">Results:</h4>

    ${clicked 
    ? resultTemplate(search, searchRideTemplate)
: null}
        </section>
`

export async function searchPage() {
    let clicked = false;
    render(searchTemplate(onSearch, clicked), main);
    async function onSearch(e) {
        clicked = true;
        e.preventDefault();
        const query = e.target.elements.search.value;
        console.log(query);
        if(query === '') {
            return alert('Enter a model to search!')
        }
        debugger
        const search = await searchRide(query);
        console.log(search);
        render(searchTemplate(onSearch, clicked, search,searchRideTemplate), main);
    }
}