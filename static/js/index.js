import {render, navigateTo,} from './routes.js';

window.addEventListener('popstate',render);

document.addEventListener('DOMContentLoaded',() => {
    document.addEventListener('click', (e)=> {
            if(e.target.matches('[data-link]')){
                e.preventDefault();
                navigateTo(e.target.dataset.link, e.target.dataset.link || e.target.href);
            }
    },true)
    render();
})

