import { html, render } from '../../node_modules/lit-html/lit-html.js'
import { main } from '../app.js';
import { getAllCars } from '../data/cars.js';
import { carTemplate } from '../constants/carTemplate.js'

const catalogTemplate = (carTemplate, cars) => html`
<h3 class="heading">Our Cars</h3>
        <section id="dashboard">
            ${cars && cars.length > 0
        ? html`${cars.map((car) => carTemplate(car))}`
        : html`<h3 class="nothing">Nothing to see yet</h3>`
            }
    </section>`


export async function catalogPage() {
    const cars = await getAllCars();
    render(catalogTemplate(carTemplate, cars), main);
}