import {PATH} from './constant.js';
import Edit from './views/edit.js'

export const render = async () => {
    const page = pageInit();

    const load = await import(page.loadPath);
    const view = new load.default();


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

    const matchedUrl = Object.keys(routes).find(key =>  replaceId(key) === location.pathname);
   
    return matchedUrl ? routes[matchedUrl] : routes[PATH.ERROR]
}

 const routes = {
    [PATH.HOME]: {
        path: PATH.HOME,
        loadPath: './views/home.js',
    },
    [PATH.UPLOAD]: {
        path : PATH.UPLOAD, 
        loadPath: './views/upload.js',
    },
    [PATH.POST]: {
        path : PATH.POST,
        loadPath: './views/post.js'},
    [PATH.EDIT]:{ 
        path : PATH.EDIT,
        loadPath: './views/edit.js' 
    },
    [PATH.ERROR]:{
        path:  PATH.ERROR,
        loadPath: './views/error.js'
        }
}

const navigate = (url) => {
    history.pushState(null, null, url);
    render();
}

const navigateTo = (data = null, url) => {
    history.pushState(data,null,url);
}

const navigateRoute = (data = null, url) => {
    navigateTo(data,url);
    render();
}


export  {navigateTo,navigateRoute,navigate, routes}


