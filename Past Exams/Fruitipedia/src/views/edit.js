import { html,render } from '../../node_modules/lit-html/lit-html.js'
import { createSubmitHandler } from '../util.js';
import { register } from '../data/auth.js';
import { main } from '../app.js';
import page from '../../node_modules/page/page.mjs'
import { createFruit, getFruitById, updateFruit } from '../data/fruits.js';

//TODO replace w/ actual view
const editTemplate = (fruit, onEdit) => html`
    <section id="edit">
          <div class="form">
            <h2>Edit Fruit</h2>
            <form class="edit-form" @submit=${onEdit}>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Fruit Name"
                .value=${fruit.name}
              />
              <input
                type="text"
                name="imageUrl"
                id="Fruit-image"
                placeholder="Fruit Image URL"
                .value=${fruit.imageUrl}
              />
              <textarea
                id="fruit-description"
                name="description"
                placeholder="Description"
                rows="10"
                cols="50"
                .value=${fruit.description}
              ></textarea>
              <textarea
                id="fruit-nutrition"
                name="nutrition"
                placeholder="Nutrition"
                rows="10"
                cols="50"
                .value=${fruit.nutrition}
              ></textarea>
              <button type="submit">post</button>
            </form>
          </div>
        </section>
`

export async function editPage(ctx) {
    const id = ctx.params.id;
    const fruit = await getFruitById(id);
    console.log(fruit);
    render(editTemplate(fruit, createSubmitHandler(onEdit)), main);
    
    async function onEdit({name, imageUrl, description, nutrition}) {
        if ([name, imageUrl, description, nutrition].some(v => v  === '')) {
            return alert("All fields are required")
        }

    await updateFruit(id, {name, imageUrl, description, nutrition});
        page.redirect('/details/' + id)
    }
}