import Common from "./common.js";
import Modal from "./component/modal.js";
import api from "../api.js";
import { MODAL_TYPE } from "../constant.js";
import { navigate } from "../routes.js";

export default class Edit extends Common {
  constructor() {
    super();

    this.setDocsTitle("edit post");
    this.modal = new Modal();

    this._idList = [
      {
        element: "#editContainer",
        eventType: "keyup",
        handler: this.editContentsHandler.bind(this),
      },
      {
        element: "#editBtn",
        eventType: "click",
        handler: this.validatePostHandler.bind(this),
      },
    ];

    this.postId = this.getPostId();

    this.post = {};
  }

  editContentsHandler({ target }) {
    if (target.dataset.input === "title") {
      return (this.post.title = this.cleanXSS(target.value));
    }
    if (target.dataset.input === "content") {
      return (this.post.content = this.cleanXSS(target.value));
    }
  }

  setElementListener() {
    this._idList.forEach((list) => {
      document
        .querySelector(list.element)
        .addEventListener(list.eventType, list.handler);
    });
  }

  validatePostHandler() {
    if (this.post.title === "") {
      return this.modal.openModal(
        {
          message: "제목을 입력해주세요.",
          type: MODAL_TYPE.ALERT,
        },
        () => {
          document.querySelector('[data-input="title"]').focus();
        }
      );
    }

    if (this.post.content === "") {
      return this.modal.openModal(
        {
          message: "내용을 입력해주세요.",
          type: MODAL_TYPE.ALERT,
        },
        () => {
          document.querySelector('[data-input="content"]').focus();
        }
      );
    }

    return this.updatePostHandler();
  }

  async updatePostHandler() {
    await api
      .updatePost(this.postId, this.post)
      .then(({ post }) => navigate(`/post/${post.postId}`))
      .catch((err) => {
        this.modal.openModal(
          {
            message: err.message,
            type: MODAL_TYPE.ALERT,
          },
          () => {}
        );
      });
  }

  async getData() {
    return await api.getPostDetail(this.postId).then((item) => item.post);
  }

  async getHtml() {
    const hasBackBtn = true;
    this.post = await this.getData();

    return `
    ${this.setHeader(hasBackBtn)}
        <div class="container" id="editContainer">
            <div class="edit-img-box">
                <img class="edit-img" src="${this.post.image}" alt="${
      this.post.title
    }"/>
            </div>
            <div class="input-box">
                <h2 class="post-title">제목</h2>
                <input class="input-primary" type="text" max-length="50"  placeholder="제목을 작성해주세요" value="${
                  this.post.title
                }" data-input="title"/>
            </div>
            <div class="input-box">
                <h2 class="post-title">내용</h2>
                <textarea class="input-primary textarea" rows="5" max-length="500" placeholder="내용을 작성해주세요" data-input="content">${
                  this.post.content
                }</textarea>
            </div>

        <button class="btn-secondary" type="button" id="editBtn">글 수정하기</button>
        </div>
        `;
  }
}
