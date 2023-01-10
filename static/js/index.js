import {PATH} from './constant.js';
import Home from './views/home.js'
import Edit from './views/edit.js';
import Upload from './views/upload.js'
import Post from './views/post.js'

const router = async () => {
    const routes = [
        {
            path : PATH.HOME, view: Home
        },
        {
            path : PATH.UPLOAD, view: Upload
        },
        {
            path : PATH.POST, view: Post
        },
        {
            path : PATH.EDIT, view: Edit 
        },
        {
            path: PATH.ERROR, view: null
        }
    ];


    const pageInfo = routes.map(route=> {
        return {
           route,
           isMatch: replaceId(route.path) === location.pathname
        }
    })

    let pageMatch = pageInfo.find(match => match.isMatch);


    if(!pageMatch){
        pageMatch = {
            route: routes[routes.length - 1],
            isMatch: true
        }
    }
    console.log(pageInfo,'---pageInfo')
    const view = new pageMatch.route.view();
    document.getElementById('root').innerHTML = await view.getHtml();
    view.setElementListener();
    
}

const replaceId = (path) => {
    const hasIdRegx = path.match(/\/\:id/);
    
    const idNumReg = /\/\d+/;
   const replacedPath =  path.replace(new RegExp(/\/\:id/), window.location.pathname.match(idNumReg));
    // console.log(hasIdRegx,'---hasIdRegx???') 
//    console.log(replacedPath,'---replacedPath');
    // console.log(path,'---path');
  return hasIdRegx && hasIdRegx.length ? replacedPath : path;
}

const navigateTo = url => {
    history.pushState(null,null,url);
    router();
}

window.addEventListener('popstate',router);

document.addEventListener('DOMContentLoaded',() => {
    document.addEventListener('click', (e)=> {
        console.log(e.target.matches('[data-link]'));
            if(e.target.matches('[data-link]')){
                e.preventDefault();
                navigateTo(e.target.href);
            }
    })
  router();
})

