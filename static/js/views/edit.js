import Header from './header.js';

export default class Edit extends Header{
    constructor(){
        super();
        this.setDocsTitle('edit post');
    }

    async getHtml(){
        const hasBackBtn = true;

        return `
        ${ this.getHeaderHtml(hasBackBtn) }
        <div class="container">
            <div class="edit-img-box">
                <img class="edit-img" src="" alt=""/>
            </div>
            <div class="input-box">
                <h2 class="post-title">제목</h2>
                <input class="input-primary" type="text" max-length="50"  placeholder="제목을 작성해주세요"/>
            </div>
            <div class="input-box">
                <h2 class="post-title">내용</h2>
                <textarea class="input-primary textarea" rows="5" max-length="500" placeholder="내용을 작성해주세요"></textarea>
            </div>

        <button class="btn-secondary" type="button">글 수정하기</button>
        </div>
        `;
    }
}