import { html, render } from '../../node_modules/lit-html/lit-html.js'
import { main } from '../app.js';
import page from '../../node_modules/page/page.mjs'
import { deleteFact, getFactById, likeFact, totalLikes, userLikes } from '../data/facts.js';
import { factDetailTemplate } from '../constants.js/factTemplate.js';
import { getUserData } from '../util.js';


const detailsTemplate = (fact, factDetailTemplate, onDelete, onLike, canLike, likes, canEdit) => html`
    <section id="details">
    <div id="details-wrapper">
        ${factDetailTemplate(fact, likes)}
          <div id="action-buttons">
            ${canEdit 
            ? html`<a href="/details/${fact._id}/edit" id="edit-btn">Edit</a>
            <a href="javascript:void(0)" id="delete-btn" @click=${onDelete}>Delete</a>`
            : null}
            ${canLike === 0 && canEdit !== true
            ? html `<a @click=${onLike} href="javascript:void(0)" id="like-btn">Like</a>`
        : null}
          </div>
            </div>
        </div>
            </div>
      </section>
`

export async function detailsPage(ctx) {
    const factId = ctx.params.id;
    const fact = await getFactById(factId);
    const userData = getUserData();
    let likes = await totalLikes(factId);
    let canLike, canEdit;
false
    if(userData) {
        canEdit = fact._ownerId === userData._id;
        canLike = await userLikes(factId, userData._id)
        console.log(canEdit, canLike);
    }
    render(detailsTemplate(fact, factDetailTemplate, onDelete, onLike, canLike, likes, canEdit), main);
    async function onDelete() {
        const choice = confirm("Are you sure you want to delete?");
        if(choice) {
            await deleteFact(factId);
            page.redirect('/catalog');
        }
    }
    async function onLike() {
        const data = {
            factId: factId
        }
        await likeFact(data);

        likes = await totalLikes(factId);
        console.log(likes);
        canLike = await userLikes(factId, userData._id);
        render(detailsTemplate(fact, factDetailTemplate, onDelete, onLike, canLike,likes, canEdit), main);
    }
   
}