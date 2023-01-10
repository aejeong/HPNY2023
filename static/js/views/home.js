import Header from './header.js';
import api from '../api.js';

export default class Home extends Header{
    constructor(){
        super();
        this.setDocsTitle('🎉 HPNY 2023');
    }

     async getData(){
        return await api.getHomeData().then(item=> item);
   }
    
    async getHtml(){
        const hasBackBtn = false;
        const posts = await this.getData();

        return`
        ${ this.getHeaderHtml(hasBackBtn) }
        <div class="btn-box create-btn">
         <a class="btn-primary " href="/upload" data-link>새 글 작성하기</a>
        </div>
        <ul class="container">
       ${posts.map(item => {
        return `<li class="card-item">
        <a href="/post/${item.postId}" data-link>
            <div class="card-item-img">
                <img class="item-img" src="${item.image}" alt="${item.title}"/>
            </div>
            <div class="card-item-info">
                <span class="card-item-title text-overflow">${item.title}</span>
                <p class="card-item-desc text-overflow">${item.content}</p>
            </div>
        </a>
        </li>`
    }).join('')}
        </ul>`;
    }
}