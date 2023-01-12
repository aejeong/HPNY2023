import {router, navigateTo,} from './routes.js';

window.addEventListener('popstate',router);

document.addEventListener('DOMContentLoaded',() => {
    document.addEventListener('click', (e)=> {
            if(e.target.matches('[data-link]')){
                e.preventDefault();
                navigateTo(e.target.dataset.link, e.target.dataset.link || e.target.href);
            }
    },true)
    router();
})

