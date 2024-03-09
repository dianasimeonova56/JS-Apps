import { html, render } from '../../node_modules/lit-html/lit-html.js'
import { main } from '../app.js';
import { deleteRide, getRideById } from '../data/rides.js';
import { getUserData } from '../util.js';
import page from '../../node_modules/page/page.mjs'

const detailsTemplate = (ride, canEdit, onDelete) => html`<section id="home">
<section id="details">
          <div id="details-wrapper">
            <img id="details-img" src="${ride.imageUrl}" alt="example1" />
            <p id="details-title">${ride.model}</p>
            <div id="info-wrapper">
              <div id="details-description">
                <p class="year">Year: ${ride.year}</p>
                <p class="mileage">Mileage: ${ride.mileage} km.</p>
                <p class="contact">Contact Number: ${ride.contact}</p>
                   <p id = "motorcycle-description">
                   ${ride.about}</p>
              </div>
              ${canEdit
        ? html`<div id="action-buttons">
            <a href="/details/${ride._id}/edit" id="edit-btn">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
          </div>`
        : null}
            </div>
        </div>
      </section>
`

export async function detailsPage(ctx) {
    const id = ctx.params.id;
    const ride = await getRideById(id);
    console.log(ride);
    const userData = await getUserData();
    let canEdit;
    if(userData) {
        canEdit = ride._ownerId === userData._id;
    }
    render(detailsTemplate(ride, canEdit, onDelete), main);
    async function onDelete() {
        const choice = confirm("Are you sure you want to delete?");
        if(choice) {
            await deleteRide(id);
            page.redirect('/catalog')
        }
    }
}