import Common from './common.js';
import Header from './component/header.js'
import api from '../api.js';
import {navigateTo} from '../routes.js'

export default class Edit extends Common{
    constructor(){
        super();
        this.setDocsTitle('edit post');

        if(!history.state){
            console.log('잘못된 접근입니다')
           return navigateTo(null, `/`);
        }

        this.idList = [
            {
                element: '#editContainer',
                eventType: 'keyup',
                handler: this.editContentsHandler.bind(this)
            },{
            element: '#editBtn',
            eventType: 'click',
            handler : this.updatePostHandler.bind(this)
        }]

        const idNumReg = /\/\d+/;
        this.postId = window.location.pathname.match(idNumReg)[0];

        this.post = {}
    }

    editContentsHandler(e){
        switch (e.target.dataset.input) {
         case 'title':
             this.post.title = e.target.value
             break;
         case 'content': 
             this.post.content = e.target.value
         break;
         default: this.post
             break;
        }
    }

    setElementListener(){
        this.idList.forEach(list=>{
            document.querySelector(list.element).addEventListener(list.eventType, list.handler)
        })
    }

    async updatePostHandler(){
        await api.updatePost(this.postId, this.post).then(({data}) => navigateTo(null,`/post/${data.post.postId}`));
    }

    async getData(){
        return await api.getCardDetailData(this.postId).then(item=> item.post);
    }

    async getHtml(){
        const hasBackBtn = true;
        this.post = await this.getData();

        return `
        ${new Header().getHeaderHtml(hasBackBtn)}
        <div class="container" id="editContainer">
            <div class="edit-img-box">
                <img class="edit-img" src="${this.post.image}" alt="${this.post.title}"/>
            </div>
            <div class="input-box">
                <h2 class="post-title">제목</h2>
                <input class="input-primary" type="text" max-length="50"  placeholder="제목을 작성해주세요" value="${this.post.title}" data-input="title"/>
            </div>
            <div class="input-box">
                <h2 class="post-title">내용</h2>
                <textarea class="input-primary textarea" rows="5" max-length="500" placeholder="내용을 작성해주세요" data-input="content">${this.post.content}</textarea>
            </div>

        <button class="btn-secondary" type="button" id="editBtn">글 수정하기</button>
        </div>
        `;
    }
}