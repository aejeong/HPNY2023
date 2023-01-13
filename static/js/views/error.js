export default class Error {
    constructor(){}

    getHtml(){
        return `
            <div class="error-box">
                <img src="static/styles/img/404.png" alt="error occured" />
                <p class="error-text">
                    <strong>Oooops!</strong> something wrong.<br/>
                    please try later again.
                </p>
                <a class="btn-nutral-line" href="/" data-link="/">Try to go to main page <i class="fa-solid fa-refresh"></i></a>
            </div>
        `;
    }
}