import page from '../../node_modules/page/page.mjs';
import { render } from '../../node_modules/lit-html/lit-html.js'
import { getUserData } from './util.js';
import { layoutTemplate } from './views/layout.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { logout } from './data/auth.js';
import { catalogPage } from './views/catalog.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { searchPage } from './views/search.js';

//TODO change render root depending on projetc HTML structure
export const main = document.querySelector('main')
const root = document.querySelector('header')

page(decorateContext)
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/logout', logoutAction);
page('/catalog', catalogPage);
page('/create', createPage);
page('/details/:id', detailsPage);
page('/details/:id/edit', editPage);
page('/search', searchPage);

page.start();

function decorateContext(ctx, next) {
    renderView();
    next();
}
//TODO inject dependencies
function renderView() {
    const userData = getUserData();
    render(layoutTemplate(userData), root)
}

function logoutAction(ctx) {
    logout();
    ctx.page.redirect('/');
}