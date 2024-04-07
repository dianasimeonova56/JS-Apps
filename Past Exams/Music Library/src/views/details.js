import { html, render } from '../../node_modules/lit-html/lit-html.js'
import { main } from '../app.js';
import { deleteAlbum, getAlbumById, getAlbumLikes, getLikesForUser, likeAlbum } from '../data/albums.js';
import { getUserData } from '../util.js';
import page from '../../node_modules/page/page.mjs';

//TODO replace w/ actual view
const detailsTemplate = (album, onDelete, onLike, hasLiked, likes) => html`
     <section id="details">
        <div id="details-wrapper">
          <p id="details-title">Album Details</p>
          <div id="img-wrapper">
            <img src="${album.imageUrl}" alt="example1" />
          </div>
          <div id="info-wrapper">
            <p><strong>Band:</strong><span id="details-singer">${album.singer}</span></p>
            <p>
              <strong>Album name:</strong><span id="details-album">${album.album}</span>
            </p>
            <p><strong>Release date:</strong><span id="details-release">${album.release}</span></p>
            <p><strong>Label:</strong><span id="details-label">${album.label}</span></p>
            <p><strong>Sales:</strong><span id="details-sales">${album.sales}</span></p>
          </div>
          <div id="likes">Likes: <span id="likes-count">${likes}</span></div>

          <!--Edit and Delete are only for creator-->
          <div id="action-buttons">
            ${album.canEdit
        ? html`<a href="/details/${album._id}/edit" id="edit-btn">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>`
        : null
    }
            ${album.canLike === true && hasLiked === 0
        ? html`<a @click=${onLike} href="" id="like-btn">Like</a>`
        : null
    }
          </div>
        </div>
      </section>
`

export async function detailsPage(ctx) {
    const id = ctx.params.id;
    const userData = await getUserData();

    const requests = [
        getAlbumById(id),
        getAlbumLikes(id)
    ]

    if (userData) {
        requests.push(getLikesForUser(id, userData._id))
    }

    let [album, likes, hasLiked] = await Promise.all(requests)

    if (userData) {
        album.canEdit = userData._id === album._ownerId;
        album.canLike = album.canEdit === false;
    }
    function update() {
        render(detailsTemplate(album, onDelete, onLike, hasLiked, likes), main);
    }
    update();
    async function onDelete() {
        const choice = confirm('Are you sure you want to delete this album?');
        if (choice) {
            await deleteAlbum(id);
            page.redirect('/catalog')
        }
    }

    async function onLike() {
        await likeAlbum(id);
        likes = await getAlbumLikes(id);
        hasLiked = await getLikesForUser(id, userData._id);
        album.canLike = hasLiked;
        update();
    }
}