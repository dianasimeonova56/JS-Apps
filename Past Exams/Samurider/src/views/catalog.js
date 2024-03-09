import { html,render } from '../../node_modules/lit-html/lit-html.js'
import { main } from '../app.js';
import { rideTemplate } from '../constants/rideTemplate.js';
import { getAllRides } from '../data/rides.js';

//TODO replace w/ actual view
const catalogTemplate = (rideTemplate, rides) => html`<section id="home">
<h2>Available Motorcycles</h2>
        <section id="dashboard">
          ${rides.length > 0 
        ? (rides.map(r => rideTemplate(r)))
    : html`<h2 class="no-avaliable">No avaliable motorcycles yet.</h2>`}
        </section>
         
`

export async function catalogPage() {
    const rides = await getAllRides();
    render(catalogTemplate(rideTemplate, rides), main);
    
}