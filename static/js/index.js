import {PATH} from './constant.js';
import Home from './views/home.js'
import Edit from './views/edit.js';
import Upload from './views/upload.js'
import Post from './views/post.js'

const router = async () => {
    const routes = [
        {
            path : PATH.HOME, view: ()=> { return new Home().getHtml(); }
        },
        {
            path : PATH.UPLOAD, view: ()=> { return new Upload().getHtml(); }
        },
        {
            path : PATH.POST, view: ()=> { return new Post().getHtml(); }
        },
        {
            path : PATH.EDIT, view: () => { return new Edit().getHtml(); }
        },
        {
            path: PATH.ERROR, view: () => {}
        }
    ];


    const pageInfo = routes.map(route=> {
        return {
           route,
           isMatch: route.path === location.pathname
        }
    })

    let pageMatch = pageInfo.find(match => match.isMatch);

    if(!pageMatch){
        pageMatch = {
            route: routes[routes.length - 1],
            isMatch: true
        }
    }

    console.log(document.getElementById('root'));
    document.getElementById('root').innerHTML = await pageMatch.route.view();
    
}

const navigateTo = url => {
    history.pushState(null,null,url);
    router();
}

window.addEventListener('popstate',router);

document.addEventListener('DOMContentLoaded',()=>{
    document.addEventListener('click', (e)=> {
        console.log(e.target.matches('[data-link]'));
            if(e.target.matches('[data-link]')){
                e.preventDefault();
                navigateTo(e.target.href);
            }
    })
  router();
})