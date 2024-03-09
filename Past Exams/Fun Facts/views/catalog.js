import { html,render } from '../../node_modules/lit-html/lit-html.js'
import { main } from '../app.js';
import page from '../../node_modules/page/page.mjs'
import { getAllFacts } from '../data/facts.js';
import { factTemplate } from '../constants.js/factTemplate.js';


const catalogTemplate = (facts, factTemplate) => html`
    <section id="dashboard">
      ${facts.length > 0 
      ? html`${facts.map(f=>factTemplate(f))}`
      : html `<h2>No Fun Facts yet.</h2>`
      }
      </section>
`

export async function catalogPage() {
  const facts = await getAllFacts();
    render(catalogTemplate(facts, factTemplate), main);
}