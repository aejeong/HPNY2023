import Common from './common.js';
import Header from './component/header.js'
import api from '../api.js'
import { navigateTo } from '../routes.js';

export default class Upload extends Common {
    constructor(){
        super();
        this.setDocsTitle('upload post');

        this.idList = [{
            element: '#uploadImage',
            eventType : 'click',
            handler : this.getRandomImageHandler.bind(this)
        },
        {
            element: '#uploadContainer',
            eventType: 'keyup',
            handler: this.uploadContentsHandler.bind(this)
        },
        {
            element: '#uploadBtn',
            eventType: 'click',
            handler: this.sendUploadDatas.bind(this)
        }
    ];

    this.post = {
        title: '',
        content: '',
        image: ''
    }
}

    uploadContentsHandler(e){
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

    async sendUploadDatas(){
        return await api.createPost(this.post).then(res=> {
        navigateTo(null,`/post/${res.data.postId}`);
      })
    }

    async getRandomImageHandler(e){
      await api.getImage().then(res=> {
          e.target.textContent = '깜짝 이미지가 추가 되었습니다. 두근두근! 🥹';
          e.target.disabled = true;
          const randomImgSrc = res.urls.regular;
          this.post.image = randomImgSrc
      });
    }

    setElementListener(){
        this.idList.forEach(list=>{
            document.querySelector(list.element).addEventListener(list.eventType, list.handler)
        })
    }

    async getHtml(){
        const hasBackBtn = true;

        return `
        ${new Header().getHeaderHtml(hasBackBtn)}
        <div class="container" id="uploadContainer">
        <button class="btn-nutral-line" type="button" id="uploadImage" data-input="image">랜덤 이미지 추가하기</button>
            <div class="input-box">
            <h2 class="post-title">제목</h2>
            <input class="input-primary" type="text" max-length="50" placeholder="제목을 작성해주세요" data-input="title"/>
            </div>
            <div class="input-box">
            <h2 class="post-title">내용</h2>
            <textarea class="input-primary textarea" rows="5" max-length="500" placeholder="내용을 작성해주세요" data-input="content"></textarea>
            </div>

            <button class="btn-primary" type="button" id="uploadBtn">글 올리기</button>
        </div>
        `;
    }
}