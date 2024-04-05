import { html, render } from '../../node_modules/lit-html/lit-html.js'
import { main } from '../app.js';
import { getAllFruits } from '../data/fruits.js';
import { fruitTemplatle } from '../constants/fruitTemplate.js';

//TODO replace w/ actual view
const catalogTemplate = (fruits, fruitTemplatle) => html` 
<h2>Fruits</h2>

${fruits.length > 0
        ? html`<section id="dashboard"> ${fruits.map(f => fruitTemplatle(f))} </section>`
        : html`<h2>No fruit info yet.</h2>`
    }   
`

export async function catalogPage() {
    const fruits = await getAllFruits();
    render(catalogTemplate(fruits, fruitTemplatle), main);

}