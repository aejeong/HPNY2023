import Header from './header.js';

export default class Post extends Header {
    constructor() {
        super();
        this.setDocsTitle('Post');
    }

    async getHtml() {
        const hasBackBtn = true;


        return `
        ${ this.getHeaderHtml(hasBackBtn) }
        <div class="container">
            <div class="post-box">
                <div class="edit-img-box">
                    <img class="edit-img" src="" alt=""/>
                 </div>
                <div class="input-box">
                    <h2 class="post-title">제목</h2>
                    <span class="post-date">2023.01.01</span>
                </div>
                <div class="input-box">
                    <h2 class="post-title">내용</h2>
                    <p class="post-contents">포트스틍마ㅓ언ㅁ 포스트~~</p>
                </div>

                <div class="action-btn-group">
                     <a class="btn-nutral-line" href="/edit" data-link>✏️  수정하기</a>
                     <button class="btn-nutral-solid" type="button">🗑️ 삭제하기</button>
                </div>
            </div>
            <ul class="comment-list-box">
                <li class="comment-item">
                    <span>댓글댓글댓글</span>
                    <button class="btn-nutral-line" type="button">삭제</button>
                </li>
            </ul>

            <div class="comment-input-box">
                <input class="input-primary" type="text" placeholder="댓글을 남겨보세요."/>
                <button class="btn-secondary" type="submit">댓글 남기기</button>
            </div>
        </div>
        `;
    }
}