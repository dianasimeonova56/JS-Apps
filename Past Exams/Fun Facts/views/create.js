import { html, render } from '../../node_modules/lit-html/lit-html.js'
import { createSubmitHandler } from '../util.js';
import { main } from '../app.js';
import page from '../../node_modules/page/page.mjs'
import { createFact } from '../data/facts.js';


const createTemplate = (onCreate) => html`
    <section id="create">
          <div class="form">
            <h2>Add Fact</h2>
            <form class="create-form" @submit=${onCreate}>
              <input
                type="text"
                name="category"
                id="category"
                placeholder="Category"
              />
              <input
                type="text"
                name="image-url"
                id="image-url"
                placeholder="Image URL"
              />
              <textarea
              id="description"
              name="description"
              placeholder="Description"
              rows="10"
              cols="50"
            ></textarea>
            <textarea
              id="additional-info"
              name="additional-info"
              placeholder="Additional Info"
              rows="10"
              cols="50"
            ></textarea>
              <button type="submit">Add Fact</button>
            </form>
          </div>
        </section>
`

export function createPage() {
    render(createTemplate(createSubmitHandler(onCreate)), main);

    async function onCreate({ category, ['image-url']: imageUrl, description, ['additional-info']: moreInfo }) {
        if([category, imageUrl, description, moreInfo].some(v=> v === '')) {
            return alert("All fields are required");
        }
        const result = await createFact({category, imageUrl, description, moreInfo});
        console.log(result);
        page.redirect('/catalog')
    }
}