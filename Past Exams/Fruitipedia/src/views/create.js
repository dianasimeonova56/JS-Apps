import { html,render } from '../../node_modules/lit-html/lit-html.js'
import { createSubmitHandler } from '../util.js';
import { register } from '../data/auth.js';
import { main } from '../app.js';
import page from '../../node_modules/page/page.mjs'
import { createFruit } from '../data/fruits.js';

//TODO replace w/ actual view
const createTemplate = (onCreate) => html`
    <section id="create">
          <div class="form">
            <h2>Add Fruit</h2>
            <form class="create-form" @submit=${onCreate}>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Fruit Name"
              />
              <input
                type="text"
                name="imageUrl"
                id="Fruit-image"
                placeholder="Fruit Image"
              />
              <textarea
              id="fruit-description"
              name="description"
              placeholder="Description"
              rows="10"
              cols="50"
            ></textarea>
            <textarea
              id="fruit-nutrition"
              name="nutrition"
              placeholder="Nutrition"
              rows="10"
              cols="50"
            ></textarea>
              <button type="submit">Add Fruit</button>
            </form>
          </div>
        </section>
`

export function createPage() {
    render(createTemplate(createSubmitHandler(onCreate)), main);
    
    async function onCreate({name, imageUrl, description, nutrition}) {
        if ([name, imageUrl, description, nutrition].some(v => v  === '')) {
            return alert("All fields are required")
        }

    await createFruit({name, imageUrl, description, nutrition});
        page.redirect('/catalog')
    }
}