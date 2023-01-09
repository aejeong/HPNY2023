import Header from './header.js';

export default class Home extends Header{
    constructor(){
        super();
        this.setDocsTitle('🎉 HPNY 2023');
    }
    
    async getHtml(){
        const hasBackBtn = false;

        return `
        ${ this.getHeaderHtml(hasBackBtn) }
        <a class="btn-primary" href="/upload" data-link>새 글 작성하기</a>

        <ul class="container">
           <li class="card-item">
           <a href="/post" data-link>
           <div class="card-item-img">
           <img class=“item-img” src="" alt=""/>
       </div>
       <div class="card-item-info">
           <span class="card-item-title text-overflow">title</span>
           <p class="card-item-desc text-overflow">description description description description...</p>
       </div>
           </a>
           </li>
        </ul>
    
        `;
    }
}