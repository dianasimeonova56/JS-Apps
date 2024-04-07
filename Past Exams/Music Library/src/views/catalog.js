import { html, render } from '../../node_modules/lit-html/lit-html.js'
import { main } from '../app.js';
import { albumTemplate } from '../constants.js/albumTemplate.js';
import { getAllAlbums } from '../data/albums.js';

//TODO replace w/ actual view
const catalogTemplate = (albums) => html`
    <section id="dashboard">
        <h2>Albums</h2>
        ${albums.length > 0
        ? html`<ul class="card-wrapper">
          ${albums.map(album => albumTemplate(album))}
        </ul>`
        : html` <h2>There are no albums added yet.</h2>`
        }
      </section>
`

export async function catalogPage() {
    const albums = await getAllAlbums();
    render(catalogTemplate(albums, albumTemplate), main);

}