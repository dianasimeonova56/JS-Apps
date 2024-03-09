import { html,render } from '../../node_modules/lit-html/lit-html.js'
import { createSubmitHandler } from '../util.js';
import { main } from '../app.js';
import page from '../../node_modules/page/page.mjs'
import { getRideById, updateRide } from '../data/rides.js';

//TODO replace w/ actual view
const editTemplate = (onEdit, ride) => html`
   <section id="edit">
            <h2>Edit Motorcycle</h2>
            <div class="form">
              <h2>Edit Motorcycle</h2>
              <form class="edit-form" @submit=${onEdit}>
                <input
                  type="text"
                  name="model"
                  id="model"
                  .value=${ride.model}
                  placeholder="Model"
                />
                <input
                  type="text"
                  name="imageUrl"
                  id="moto-image"
                  .value=${ride.imageUrl}
                  placeholder="Moto Image"
                />
                <input
                type="number"
                name="year"
                .value=${ride.year}
                id="year"
                placeholder="Year"
              />
              <input
              type="number"
              name="mileage"
              .value=${ride.mileage}
              id="mileage"
              placeholder="mileage"
            />
            <input
              type="number"
              name="contact"
              .value=${ride.contact}
              id="contact"
              placeholder="contact"
            />
              <textarea
                id="about"
                name="about"
                .value=${ride.about}
                placeholder="about"
                rows="10"
                cols="50"
              ></textarea>
                <button type="submit">Edit Motorcycle</button>
              </form>
          </div>
        </section>
        
`

export async function editPage(ctx) {
    const id = ctx.params.id;
    const ride = await getRideById(id);
    render(editTemplate(createSubmitHandler(onEdit), ride), main);
    
    async function onEdit({
        model,
        imageUrl, 
        year, 
        mileage,
        contact,
        about
      } 
      , form) {
        if([model,
            imageUrl, 
            year, 
            mileage,
            contact,
            about].some(v => v === '')) {
            return alert("All fields are required")
        }
        await updateRide(id, {model,
            imageUrl, 
            year, 
            mileage,
            contact,
            about});
        form.reset();
        page.redirect(`/details/${id}`)
    }
}