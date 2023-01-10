import Header from './header.js';
import api from '../api.js';

export default class Post extends Header {
    constructor() {
        super();
        this.setDocsTitle('Post');

        const idNumReg = /\/\d+/;
        // const postId = window.location.pathname.match(idNumReg)[0];
        this.postId = window.location.pathname.match(idNumReg)[0];
    }

    async getData(){
        // const idNumReg = /\/\d+/;
        // const postId = window.location.pathname.match(idNumReg)[0];
        return await api.getCardDetailData(this.postId).then(item => item);
    }

    setElementListener(){
        const idList = [{
            element: '#commentInput',
            eventType : 'keypress',
            handler : this.inputHandler.bind(this)
        }];
      
        idList.forEach(list=>{
            document.querySelector(list.element).addEventListener(list.eventType, list.handler)
        })
    }

    inputHandler(e){
        if(e.target.value === ''){
            return;
        }
        const { code , keyCode} = e;

        if(code === 'Enter' || keyCode === 13){
            this.addComment(e.target.value);
         }
    }

    async addComment(content){
       await api.createComment(this.postId, {content}).then(res=> {
        // Todo
    });

    }

    async getHtml() {
        const hasBackBtn = true;
        const {post, comments} = await this.getData();

        return `
        ${ this.getHeaderHtml(hasBackBtn) }
        <div class="container">
            <div class="post-box">
                <div class="edit-img-box">
                    <img class="edit-img" src="${post.image}" alt="${post.title}"/>
                 </div>
                <div class="input-box">
                    <h2 class="post-title">${post.title}</h2>
                    <span class="post-date">${new Date(post.createdAt).toLocaleDateString('ko-KR')}</span>
                </div>
                <div class="input-box">
                    <h2 class="post-title">내용</h2>
                    <p class="post-contents">${post.content}~~</p>
                </div>

                <div class="action-btn-group">
                     <a class="btn-nutral-line" href="/edit/${post.postId}" data-link>✏️  수정하기</a>
                     <button class="btn-nutral-solid" type="button">🗑️ 삭제하기</button>
                </div>
            </div>
            <ul class="comment-list-box">
            ${
                comments.length ? comments.map(comment => {
                    return `
                    <li class="comment-item" id="${comment.id}">
                        <div class="comment-content">
                            <span class="comment-date">${new Date(comment.createdAt).toLocaleDateString('ko-KR')}</span>
                            <span>${comment.content}</span>
                        </div>
                        <button class="btn-nutral-line" type="button">삭제</button>
                    </li>
                    `
                }).join('') : '<li><span>댓글이 없습니다. 댓글을 남겨보세요</span></li>'
            }
              
            </ul>

            <div class="comment-input-box">
                <input class="input-primary" id="commentInput" type="text" placeholder="댓글을 남겨보세요."/>
                <button class="btn-secondary" type="button">댓글 남기기</button>
            </div>
        </div>
        `;
    }
 
}