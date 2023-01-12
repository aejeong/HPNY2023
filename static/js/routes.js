import {PATH} from './constant.js';
import Home from './views/home.js'
import Edit from './views/edit.js';
import Upload from './views/upload.js'
import Post from './views/post.js'
import Error from './views/error.js'

export const router = async () => {
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
            path: PATH.ERROR, view: Error
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

    const view = new pageMatch.route.view();
    document.getElementById('root').innerHTML = await view.getHtml();
    if(document.getElementById('root').children.length){
        view.setElementListener && view.setElementListener();
    }
}

export const navigateTo = (data, url) => {
    history.pushState(data,null,url);
    router();
}

 const replaceId = (path) => {
    const hasIdRegx = path.match(/\/\:id/);
    
    const idNumReg = /\/\d+/;
   const replacedPath =  path.replace(new RegExp(/\/\:id/), window.location.pathname.match(idNumReg));
  return hasIdRegx && hasIdRegx.length ? replacedPath : path;
}

