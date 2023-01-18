import Common from './common.js';
import Modal from './component/modal.js';
import { MODAL_TYPE, PATH } from '../constant.js';
import api from '../api.js'
import { navigate } from '../routes.js';

export default class Upload extends Common {
    constructor(){
        super();
        this.setDocsTitle('upload post');

        this.modal = new Modal();

        this._idList = [{
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
            handler: this.validatePostHandler.bind(this)
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
            this.post.title = this.cleanXSS(e.target.value)
            break;
        case 'content': 
            this.post.content = this.cleanXSS(e.target.value)
        break;
        default: this.post
            break;
       }
    }

    validatePostHandler(){
        if(this.post.image === ''){
            return this.modal.openModal({
                 message: '랜덤 이미지를 추가해주세요.',
                 type: MODAL_TYPE.ALERT
             }, () => {
                 document.querySelector('[data-input="image"]').classList.add('error')
             })
         }

        if(this.post.title === ''){
           return this.modal.openModal({
                message: '제목을 입력해주세요.',
                type: MODAL_TYPE.ALERT
            }, () => {
                document.querySelector('[data-input="title"]').focus();
            })
        }

        if(this.post.content === ''){
            return this.modal.openModal({
                 message: '내용을 입력해주세요.',
                 type: MODAL_TYPE.ALERT
             }, () => {
                 document.querySelector('[data-input="content"]').focus();
             })
         }

         this.sendUploadDatas();
    }

    async sendUploadDatas(){
        return await api.createPost(this.post).then(({data: {postId}})=> {
            this.modal.openModal({
                message: '게시물이 성공적으로 등록되었습니다!',
                type: MODAL_TYPE.ALERT
            }, (modalResponse)=> {
                if(modalResponse){
                    navigate(`/post/${postId}`);
                }
            })
      }).catch(({response: {status, data : {message}}}) => {
        if(status === 400){
            this.modal.openModal({
                message,
                type: MODAL_TYPE.ALERT
            }, (modalResponse)=> {})
        }else{
            navigate(PATH.ERROR);
        }
      })
    }

    async getRandomImageHandler(e){
        if(e.target.classList.contains('error')){
            e.target.classList.remove('error')
        }
      await api.getImage().then(({urls: {regular}})=> {
          e.target.textContent = '깜짝 이미지가 추가 되었습니다. 두근두근! 🥹';
          e.target.classList.add('disabled');
          this.post.image = regular
      });
    }

    setElementListener(){
        this._idList.forEach(list=>{
            document.querySelector(list.element).addEventListener(list.eventType, list.handler)
        })
    }

    async getHtml(){
        const hasBackBtn = true;

        return `
        ${this.setHeader(hasBackBtn)}
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