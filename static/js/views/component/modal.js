
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

        this.modalEle.addEventListener('click', (e) => this.modalHandler(e, callback))
    }

    modalHandler({target},callback){

        if(target.classList.contains('confirm-btn')){
            callback(true)
        }else if(target.classList.contains('close-btn')){
            callback(false)
        }
        
        this.modalEle.remove();
        this.modalEle.removeEventListener('click', this.modalHandler);
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
        
        modalEle.appendChild(this.createModalBtn());
        dimmedModal.appendChild(modalEle);

        return dimmedModal;
    }

    createModalBtn(){
        const btnGroupEle = document.createElement('div');
        btnGroupEle.classList.add('modal-btn-group');

        const confirmBtn = `<button class="btn-nutral-line confirm-btn" type="button">확인</button>`
        const closeBtn = `<button class="btn-nutral-line close-btn" type="button">닫기</button>`

        if(this.modalType.type === MODAL_TYPE.CONFIRM){
            btnGroupEle.insertAdjacentHTML('beforeend', `${confirmBtn} ${closeBtn}`)
        }else{
            btnGroupEle.insertAdjacentHTML('beforeend', `${confirmBtn}`)
        }

        return btnGroupEle
    }
}