import { html, render } from '../../node_modules/lit-html/lit-html.js'
import { main } from '../app.js';
import page from '../../node_modules/page/page.mjs'
import { deleteChar, getCharById, getCharLikes, getCharLikesForUser, likeChar } from '../data/chars.js';
import { getUserData } from '../util.js';

//TODO replace w/ actual view
const detailsTemplate = (char, onDelete, onLike, hasLiked, likes) => html`
    <section id="details">
          <div id="details-wrapper">
            <img id="details-img" src="${char.imageUrl}" alt="example1" />
            <div>
            <p id="details-category">${char.category}</p>
            <div id="info-wrapper">
              <div id="details-description">
                <p id="description">
                ${char.description}
                  </p>
                   <p id ="more-info">
                   ${char.moreInfo}
                        </p>
              </div>
            </div>
              <h3>Is This Useful:<span id="likes">${likes}</span></h3>
                ${char.canEdit
        ? html`<div id="action-buttons">
            <a href="/details/${char._id}/edit" id="edit-btn">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>`
        : null}
             ${hasLiked == 0 && char.canLike===true
        ? html`<a @click=${onLike} href="javascript:void(0)" id="like-btn">Like</a>`
        : null}
          </div>
         </div>
             </div>
      </section>
`

export async function detailsPage(ctx) {
    const id = ctx.params.id;

    const requests = [
        getCharById(id),
        getCharLikes(id),
    ];
    
    const userData = getUserData();

    if (userData) {
        requests.push(getCharLikesForUser(id, userData._id))
    }

    let [char, likes, hasLiked] = await Promise.all(requests);

    if (userData) {
        char.canEdit = userData._id === char._ownerId;
        char.canLike = char.canEdit === false
    }

    function update() {
        render(detailsTemplate(char, onDelete, onLike, hasLiked, likes), main);
    }
    update()
    async function onLike() {
        await likeChar(id);
        likes = await getCharLikes(id);
        console.log(likes);
        hasLiked = await getCharLikesForUser(id, userData._id);
        char.canLike = hasLiked;
        likes++
        char.likes++
        update();
    }
    async function onDelete() {
        const choice = confirm('Are you sure you want to delete?')
        if (choice) {
            await deleteChar(id);
            page.redirect('/catalog')
        }
    } 
}