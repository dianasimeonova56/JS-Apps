import { html, render } from '../../node_modules/lit-html/lit-html.js'
import { main } from '../app.js';
import { deleteCar, getCarById } from '../data/cars.js';
import { getUserData } from '../util.js';

const detailsTemplate = (car,onDelete) => html`
<section id="details">
          <div id="details-wrapper">
            <img id="details-img" src="${car.imageUrl}" alt="example1"/>
            <p id="details-title">${car.model}</p>
            <div id="info-wrapper">
              <div id="details-description">
                <p class="price">Price: €${car.price}</p>
                <p class="weight">Weight: ${car.weight} kg</p>
                <p class="top-speed">Top Speed: ${car.speed} kph</p>
                <p id="car-description">
                ${car.about}</p>
              </div>
              ${car.canEdit 
              ? html`<div id="action-buttons">
                <a href="/details/${car._id}/edit" id="edit-btn">Edit</a>
                <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
              </div>`
              : null
            }
            </div>
          </div>
        </section>`


export async function detailsPage(ctx) {
    const id = ctx.params.id;

    const requests = [
        getUserData(),
        getCarById(id)
    ]

    const [userData, car] = await Promise.all(requests);

    if(userData) {
        car.canEdit = userData._id === car._ownerId;
    }
    render(detailsTemplate(car, onDelete), main);

    async function onDelete() {
        const choice = confirm('Are you sure you want to delete');
        if (choice) {
          await deleteCar(id);
          ctx.page.redirect('/catalog');
        }
      }
}