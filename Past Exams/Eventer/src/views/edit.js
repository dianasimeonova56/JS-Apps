import { html,render } from '../../node_modules/lit-html/lit-html.js'
import { createSubmitHandler } from '../util.js';
import { main } from '../app.js';
import page from '../../node_modules/page/page.mjs'
import { createEvent, getEventById, updateEvent } from '../data/events.js';

//TODO replace w/ actual view
const editTemplate = (onEdit, event) => html`
    <section id="edit">
          <div class="form">
            <h2>Edit Event</h2>
            <form class="edit-form" @submit=${onEdit}>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Event"
                .value=${event.name}
              />
              <input
                type="text"
                name="imageUrl"
                id="event-image"
                placeholder="Event Image"
                .value=${event.imageUrl}
              />
              <input
                type="text"
                name="category"
                id="event-category"
                placeholder="Category"
                .value=${event.category}
              />


              <textarea
                id="event-description"
                name="description"
                placeholder="Description"
                rows="5"
                cols="50"
                .value=${event.description}
              ></textarea>
              
              <label for="date-and-time">Event Time:</label>
              <input
              type="text"
              name="date"
              id="date"
              placeholder="When?"
              .value=${event.date}
            />

              <button type="submit">Edit</button>
            </form>
          </div>
        </section>
`

export async function editPage(ctx) {
    const id = ctx.params.id;
    const event = await getEventById(id);
    render(editTemplate(createSubmitHandler(onEdit), event), main);
    
    async function onEdit({name,
        imageUrl, 
        category, 
        description, 
        date
      }) {

        if([name,
            imageUrl, 
            category, 
            description, 
            date
          ].some(v => v == "")) {
            return alert("All fields are required")
        }

        const result = await updateEvent(id, {name,
            imageUrl, 
            category, 
            description, 
            date
          });
          console.log(result);
        page.redirect('/details/'+id);
    }
}