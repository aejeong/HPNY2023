import Header from './header.js';

export default class Upload extends Header{
    constructor(){
        super();
        this.setDocsTitle('upload post');
    }

    async getHtml(){
        const hasBackBtn = true;


        return `
        ${ this.getHeaderHtml(hasBackBtn) }
        <div class="container">
        <button class="btn-nutral-line" type="button">랜덤 이미지 추가하기</button>
            <div class="input-box">
            <h2 class="post-title">제목</h2>
            <input class="input-primary" type="text" max-length="50" placeholder="제목을 작성해주세요"/>
            </div>
            <div class="input-box">
            <h2 class="post-title">내용</h2>
            <textarea class="input-primary textarea" rows="5" max-length="500" placeholder="내용을 작성해주세요"></textarea>
            </div>

            <button class="btn-primary" type="button">글 올리기</button>
        </div>
        `;
    }
}