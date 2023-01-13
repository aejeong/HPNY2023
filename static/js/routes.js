import {PATH} from './constant.js';
import Home from './views/home.js'
import Edit from './views/edit.js';
import Upload from './views/upload.js'
import Post from './views/post.js'
import Error from './views/error.js'

export const render = async () => {
    const page = pageInit();
    const view = new page.route.view();
    
    document.getElementById('root').innerHTML = await view.getHtml();

    if(document.getElementById('root').children.length){
        view.setElementListener && view.setElementListener();
    }
}

const pageInit = () => {
    const replaceId = (path) => {
        const hasIdRegx = path.match(/\/\:id/);
        const idNumReg = /\/\d+/;
        const replacedPath =  path.replace(new RegExp(/\/\:id/), location.pathname.match(idNumReg));
        
       return hasIdRegx && hasIdRegx.length ? replacedPath : path;
    }

    const matched = Object.keys(routes).find(key =>  replaceId(key) === location.pathname);

    const pageInfo = {
        route: matched ? routes[matched] : routes[PATH.ERROR],
        isMatch: true
    }

    return pageInfo;
}

 const routes = {
    [PATH.HOME]: {
        path: PATH.HOME,
        view: Home,
    },
    [PATH.UPLOAD]: {
        path : PATH.UPLOAD, 
        view: Upload,
    },
    [PATH.POST]: {
        path : PATH.POST,
         view: Post},
    [PATH.EDIT]:{ 
        path : PATH.EDIT,
         view: Edit 
    },
    [PATH.ERROR]:{
        path:  PATH.ERROR,
         view: Error
        }
}

const navigateTo = (data, url) => {
    history.pushState(data,null,url);
    render();
}


export  {navigateTo, routes}


