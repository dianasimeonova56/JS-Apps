import { html, render } from '../../node_modules/lit-html/lit-html.js'
import { createSubmitHandler } from '../util.js';
import { main } from '../app.js';
import page from '../../node_modules/page/page.mjs'
import { getFactById, updateFact } from '../data/facts.js';


const editTemplate = (fact, onEdit) => html`
    <section id="edit">
          <div class="form">
            <h2>Edit Fact</h2>
            <form class="edit-form" @submit=${onEdit}>
              <input
              type="text"
              name="category"
              .value=${fact.category}
              id="category"
              placeholder="Category"
            />
            <input
              type="text"
              name="image-url"
              .value=${fact.imageUrl}
              id="image-url"
              placeholder="Image URL"
            />
            <textarea
            id="description"
            name="description"
            .value=${fact.description}
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
            .value=${fact.moreInfo}
          ></textarea>
              <button type="submit">Post</button>
            </form>
          </div>
        </section>
`

export async function editPage(ctx) {
    const id = ctx.params.id;
    const fact = await getFactById(id);
    console.log(fact);
    render(editTemplate(fact, createSubmitHandler(onEdit)), main);

    async function onEdit({ category, ['image-url']: imageUrl, description, ['additional-info']: moreInfo }) {
        if([category, imageUrl, description, moreInfo].some(v=> v === '')) {
            return alert("All fields are required");
        }
        const result = await updateFact(id, {category, imageUrl, description,  moreInfo});
        console.log(result);
        page.redirect('/details/' + id)
    }
}