import Header from "./component/header.js";

export default class Common {
  constructor() {}

  setHeader(btnStatus) {
    return new Header().getHeaderHtml(btnStatus);
  }

  setDocsTitle(title) {
    document.title = title;
  }

  scrollDown() {
    window.scrollTo(0, document.body.scrollHeight);
  }

  getPostId() {
    const idNumReg = /\/\d+/;
    return window.location.pathname.match(idNumReg)[0];
  }
}
