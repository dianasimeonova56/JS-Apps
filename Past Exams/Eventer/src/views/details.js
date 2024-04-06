import { html, render } from '../../node_modules/lit-html/lit-html.js'
import { getUserData } from '../util.js';
import { main } from '../app.js';
import page from '../../node_modules/page/page.mjs'
import { deleteEvent, getEventById, getEventGoing, getEventGoingForUser, goingEvent } from '../data/events.js';
//import { eventDetailsTemplate } from '../constants/eventTemplate.js';

//TODO replace w/ actual view
const detailsTemplate = (event, onDelete, onGoing, isGoing, going) => html`
    
    <section id="details">
    <div id="details-wrapper">
            <img id="details-img" src="${event.imageUrl}" alt="example1" />
            <p id="details-title">${event.name}</p>
            <p id="details-category">
              Category: <span id="categories">${event.category}</span>
            </p>
            <p id="details-date">
              Date:<span id="date">${event.date}</span></p>
            <div id="info-wrapper">
              <div id="details-description">
                <span
                  >${event.description}</span>
              </div>
            </div>
          ${event.canEdit
    ? html` <div id="action-buttons">
              <a href="/details/${event._id}/edit" id="edit-btn">Edit</a>
              <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>` : null}

              ${event.canGo === true && isGoing === 0
    ? html`<a href="" id="go-btn">Going</a>` : null}

            <h3>Going: <span id="go">${going}</span> times.</h3>
            </div>
          </div>
        </section>
`

export async function detailsPage(ctx) {
  const id = ctx.params.id;

  const requests = [
    getEventById(id),
    getEventGoing(id)
  ]

  const userData = await getUserData();

  if (userData) {
    requests.push(getEventGoingForUser(id, userData._id));
  }

  let [event, going, isGoing] = await Promise.all(requests);

  if (userData) {
    event.canEdit = userData._id === event._ownerId;
    event.canGo = event.canEdit === false;
  }

  function update() {
    render(detailsTemplate(event, onDelete, onGoing, isGoing, going), main);
  }
  update();

  async function onDelete() {
    const choice = confirm('Are you sure you want to delete?');
    if (choice) {
      await deleteEvent(id);
      page.redirect('/catalog');
    }
  }

  async function onGoing() {
    await goingEvent(id);
    going = await getEventGoing(id);
    isGoing = await getEventGoingForUser(id, userData._id);
    event.canGo = isGoing;
    update();
  }
}