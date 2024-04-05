import { html, render } from '../../node_modules/lit-html/lit-html.js'
import { createSubmitHandler } from '../util.js';
import { main } from '../app.js';
import page from '../../node_modules/page/page.mjs'
import { getCharById, updateChar } from '../data/chars.js';


const editTemplate = (onEdit, char) => html`
    <section id="edit">
          <div class="form">
            <img class="border" src="./images/border.png" alt="">
            <h2>Edit Character</h2>
            <form class="edit-form" @submit=${onEdit}>
              <input
              type="text"
              name="category"
              .value=${char.category}
              id="category"
              placeholder="Character Type"
            />
            <input
              type="text"
              name="image-url"
              .value=${char.imageUrl}
              id="image-url"
              placeholder="Image URL"
            />
            <textarea
            id="description"
            name="description"
            placeholder="Description"
            rows="2"
            cols="10"
            .value=${char.description}
          ></textarea>
          <textarea
            id="additional-info"
            name="additional-info"
            placeholder="Additional Info"
            rows="2"
            cols="10"
            .value=${char.addInfo}
          ></textarea>
              <button type="submit">Edit</button>
            </form>
            <img class="border" src="./images/border.png" alt="">
          </div>
        </section>
`

export async function editPage(ctx) {
    const id = ctx.params.id;
    const char = await getCharById(id);
    console.log(char);
    render(editTemplate(createSubmitHandler(onEdit), char), main);

    async function onEdit({ category, ['image-url']: imageUrl, description, ['additional-info']: addInfo }) {
        if ([category, imageUrl, description, addInfo].some(v=>v === '')) {
            return alert("All fields are required")
        }
       const result = await updateChar(id, {category, imageUrl, description, addInfo});
        console.log(result);
        page.redirect('/details/' + id)
    }
}