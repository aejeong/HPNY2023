export default class Common{
    constructor(){}

    setDocsTitle(title){
        document.title = title;
    }

    scrollDown () {
        window.scrollTo(0,document.body.scrollHeight)
    }

    getPostId(){
        const idNumReg = /\/\d+/;
        return window.location.pathname.match(idNumReg)[0];
    }
}