import { html,render } from '../../node_modules/lit-html/lit-html.js'
import { main } from '../app.js';
import { deleteFruit, getFruitById } from '../data/fruits.js';
import { getUserData } from '../util.js';
import page from '../../node_modules/page/page.mjs'

//TODO replace w/ actual view
const detailsTemplate = (fruit, onDelete) => html` 
<section id="details">
          <div id="details-wrapper">
            <img id="details-img" src="${fruit.imageUrl}" alt="example1" />
            <p id="details-title">${fruit.name}</p>
            <div id="info-wrapper">
              <div id="details-description">
                <p>
                ${fruit.description}
                  </p>
                    <p id="nutrition">Nutrition</p>
                   <p id = "details-nutrition">
                   ${fruit.nutrition}
                        </p>
              </div>
              ${fruit.canEdit
            ? html`<div id="action-buttons">
            <a href="/details/${fruit._id}/edit" id="edit-btn">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
              </div>`
            : null}
          
            </div>
        </div>
      </section>
`

export async function detailsPage(ctx) {
    const id = ctx.params.id;
    const fruit = await getFruitById(id);
    const userData = getUserData();
    if(userData) {
        fruit.canEdit = fruit._ownerId === userData._id;
    }

    async function onDelete() {
        const choice = confirm('Are you sure you want to delete?')
        if (choice) {
            await deleteFruit(id);
            page.redirect('/catalog')
        }
    }
    render(detailsTemplate(fruit, onDelete), main);
    
}