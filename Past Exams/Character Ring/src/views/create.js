import { html, render } from '../../node_modules/lit-html/lit-html.js'
import { createSubmitHandler } from '../util.js';
import { main } from '../app.js';
import page from '../../node_modules/page/page.mjs'
import { createChar } from '../data/chars.js';

//TODO replace w/ actual view
const createTemplate = (onCreate) => html`
    <section id="create">
          <div class="form">
            <img class="border" src="./images/border.png" alt="">
            <h2>Add Character</h2>
            <form class="create-form" @submit=${onCreate}>
              <input
                type="text"
                name="category"
                id="category"
                placeholder="Character Type"
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
              rows="2"
              cols="10"
            ></textarea>
            <textarea
              id="additional-info"
              name="additional-info"
              placeholder="Additional Info"
              rows="2"
              cols="10"
            ></textarea>
              <button type="submit">Add Character</button>
            </form>
            <img class="border" src="./images/border.png" alt="">
          </div>
        </section>
`

export async function createPage() {
    render(createTemplate(createSubmitHandler(onCreate)), main);

    async function onCreate({ category, ['image-url']: imageUrl, description, ['additional-info']: moreInfo }) {
        if ([category, imageUrl, description, moreInfo].some(v=>v === '')) {
            return alert("All fields are required")
        }
       const result = await createChar({category, imageUrl, description, moreInfo});
        console.log(result);
        page.redirect('/catalog')
    }
}