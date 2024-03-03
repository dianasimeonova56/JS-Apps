import { getUserData } from './util.js';
import { layoutTemplate } from './views/layout.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { render } from '../node_modules/lit-html/lit-html.js'
import page from '../node_modules/page/page.mjs'
import { logout } from './data/auth.js';
import { catalogPage } from './views/catalog.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { searchPage } from './views/search.js';

const root = document.querySelector('header')
export const main = document.querySelector('main')

page(decorateContext)
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/logout', logoutAction)
page('/catalog', catalogPage)
page('/create', createPage)
page('/details/:id', detailsPage)
page('/details/:id/edit', editPage)
page('/search', searchPage)

page.start();

function decorateContext(ctx, next) {
    renderView();
    next();
}

function renderView(content) {
    const userData = getUserData();
    render(layoutTemplate(userData, content), root)
}

function logoutAction() {
    logout();
    page.redirect('/')
}