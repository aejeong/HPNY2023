import {render, navigateTo, navigateRoute} from './routes.js';

const domContentLoadedHandler = () => {
    render();
    setEventListerner();
}

const setEventListerner = () => {
    window.addEventListener('popstate',render);
    document.addEventListener('click', documentHandler ,true)
}

const documentHandler = (e) => {
    const {dataset: {link}, href} = e.target;

    if(e.target.matches('[data-link]')){
        e.preventDefault();
        navigateRoute(link, link || href);
    }
}

document.addEventListener('DOMContentLoaded',domContentLoadedHandler)
