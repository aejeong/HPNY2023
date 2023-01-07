const router = async () => {
    const routes = [
        {
            path : '/', view: ()=> { console.log('Home') }
        },
        {
            path : '/upload', view: ()=> { console.log('upload') }
        },
        {
            path : '/post', view: ()=> { console.log('post') }
        },
        {
            path : '/edit', view: ()=> { console.log('haha') }
        }
    ];


    const pageInfo = routes.map(route=>{
        return {
           route,
           isMath: route.path === location.pathname
        }
    })

    console.log(pageInfo);
}

document.addEventListener('DOMContentLoaded',()=>{
    router();
})