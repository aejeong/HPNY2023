
import { MODAL_TYPE } from "../../constant.js"; 

export default class Modal{
    constructor(){
        this.modalEle = null;
        this.modalType = {
            message: '',
            type: MODAL_TYPE.CONFIRM || MODAL_TYPE.ALERT
            }
        }

     openModal({message , type} ,callback){
            this.modalType = {
                message,
                type
            }


        this.renderModal();


        const confirmBtn = document.querySelector('.confirm-btn');
        const closeBtn = document.querySelector('.close-btn');
        
        confirmBtn && confirmBtn.addEventListener('click',  () => {
              callback(true);
            this.modalEle.remove();
        });
        closeBtn && closeBtn.addEventListener('click',  () => {
              callback(false);
            this.modalEle.remove();
        });

    }

    renderModal(){
        
        this.modalEle = this.createModalContainer();
        
        document.getElementById('root').insertAdjacentElement('beforeend',this.modalEle);
    }
    

    createModalContainer(){
        const dimmedModal = document.createElement('div');
        dimmedModal.classList.add('modal-dimmed');

        
        const modalEle = document.createElement('div');
        modalEle.classList.add('modal-container');
        modalEle.innerHTML = `<p class="modal-content">${this.modalType.message}</p>`
        
        modalEle.appendChild(this.createModalBtn(modalEle));
        dimmedModal.appendChild(modalEle);

        return dimmedModal;
    }

    createModalBtn(ele){
    
        const confirmBtn = document.createElement('button');
        confirmBtn.setAttribute('type','button');
        confirmBtn.classList.add('btn-nutral-line','confirm-btn');
        confirmBtn.innerText = '확인';

        let closeButton;

        if(this.modalType.type === MODAL_TYPE.CONFIRM){
            closeButton = document.createElement('button');
            closeButton.setAttribute('type','button');
            closeButton.classList.add('btn-nutral-line','close-btn');
            closeButton.innerText = "닫기";
        }

        const btnGroupEle = document.createElement('div');
        btnGroupEle.classList.add('modal-btn-group');

        if(this.modalType.type === MODAL_TYPE.CONFIRM){
            btnGroupEle.append(confirmBtn, closeButton)
        }else{
            btnGroupEle.append(confirmBtn)
        }

        return btnGroupEle
    }
}