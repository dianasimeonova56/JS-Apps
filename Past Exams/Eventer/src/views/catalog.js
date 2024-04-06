import { html,render } from '../../node_modules/lit-html/lit-html.js'
import { main } from '../app.js';
import page from '../../node_modules/page/page.mjs'
import { getAllEvents } from '../data/events.js';
import { eventTemplate } from '../constants/eventTemplate.js';


//TODO replace w/ actual view
const catalogTemplate = (events) => html`
    <h2>Current Events</h2>
    ${events.length > 0
    ? html`<section id="dashboard">
        ${events.map(e=>eventTemplate(e))}
        </section>`
:html`<h4>No Events yet.</h4>`}
`

export async function catalogPage() {
    const events = await getAllEvents();
    render(catalogTemplate(events, eventTemplate), main);

}