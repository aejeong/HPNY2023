export default class Header{
    constructor(){}

    setDocsTitle(title){
        document.title = title;
    }

    getHeaderHtml(btnElement){
        return `
        <header>
        ${btnElement ?
          `  <a class="link-btn header-back-btn" href="/"  data-link="/">
            <i class="fa-solid fa-angle-left fa-xl">
                    <span class="blind">뒤로가기</span>
            </i>
            </a>` : ''
        }

        <h1 class="header-title"><a class="link-btn" href="/" data-link="/">🎉 HPNY 2023</a></h1>
    </header>
        `;
    }
}