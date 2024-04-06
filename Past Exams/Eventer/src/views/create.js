import { html,render } from '../../node_modules/lit-html/lit-html.js'
import { createSubmitHandler } from '../util.js';
import { main } from '../app.js';
import page from '../../node_modules/page/page.mjs'
import { createEvent } from '../data/events.js';

//TODO replace w/ actual view
const createTemplate = (onCreate) => html`
    <section id="create">
          <div class="form">
            <h2>Add Event</h2>
            <form class="create-form" @submit=${onCreate}>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Event"
              />
              <input
                type="text"
                name="imageUrl"
                id="event-image"
                placeholder="Event Image URL"
              />
              <input
                type="text"
                name="category"
                id="event-category"
                placeholder="Category"
              />


              <textarea
                id="event-description"
                name="description"
                placeholder="Description"
                rows="5"
                cols="50"
              ></textarea>
              
              <input
              type="text"
              name="date"
              id="date"
              placeholder="When?"
            />

              <button type="submit">Add</button>
            </form>
          </div>
        </section>
`

export function createPage() {
    render(createTemplate(createSubmitHandler(onCreate)), main);
    
    async function onCreate({name,
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

        const result = await createEvent({name,
            imageUrl, 
            category, 
            description, 
            date
          });
          console.log(result);
        page.redirect('/catalog')
    }
}