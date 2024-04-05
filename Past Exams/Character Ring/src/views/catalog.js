import { html, render } from '../../node_modules/lit-html/lit-html.js'
import { main } from '../app.js';
import { charTemplate } from '../constants/charTemplate.js';
import { getAllChars } from '../data/chars.js';

const catalogTemplate = (chars, charTemplate) => html`
     <h2>Characters</h2>
     ${chars.length > 0
        ? html`<section id="characters"> 
            ${chars.map(c=>charTemplate(c))}    
            </section>`
        : html`<h2>No added Heroes yet.</h2>`}
         
`

export async function catalogPage() {
    const chars = await getAllChars();
    console.log(chars);
    render(catalogTemplate(chars, charTemplate), main);

}