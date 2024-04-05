import { html, render } from '../../node_modules/lit-html/lit-html.js'
import { main } from '../app.js';
import { searchFruit } from '../data/fruits.js';
import { resultFruitTemplate } from '../constants/fruitTemplate.js'


const searchResultTemplate = (result) => html`
<div class="search-result">
    ${result != undefined && result.length > 0
        ? result.map(f => resultFruitTemplate(f))
        : html`<p class="no-result">No result.</p>`
        }
        </div>
 `

const searchTemplate = (onSearch, clicked, result) => html` 
<section id="search">

<div class="form">
  <h2>Search</h2>
  <form class="search-form" @submit=${onSearch}>
    <input
      type="text"
      name="search"
      id="search-input"
    />
    <button class="button-list">Search</button>
  </form>
</div>
<h4>Results:</h4>
  ${clicked
        ? searchResultTemplate(result)
        : null}
        </section>
`

export async function searchPage() {
    let clicked = false;
    render(searchTemplate(onSearch, clicked), main);

    async function onSearch(e) {
        e.preventDefault();
        clicked = true;
        const search = e.target.elements.search.value;
        console.log(search);
        if(search === '') {
            return alert('Enter a fruit to search!')
        }
        const result = await searchFruit(search);
        console.log(result);
        render(searchTemplate(onSearch, clicked, result), main);
    }

}