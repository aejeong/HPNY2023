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

  cleanXSS(value) {
    let returnVal = value;
    returnVal = returnVal.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
    returnVal = returnVal.replaceAll("\\(", "&#40;").replaceAll("\\)", "&#41;");
    returnVal = returnVal.replaceAll("'", "&#39;");
    returnVal = returnVal.replaceAll("eval\\((.*)\\)", "");
    returnVal = returnVal.replaceAll("[\\\"\\\'][\\s]*javascript:(.*)[\\\"\\\']", "\"\"");
    returnVal = returnVal.replaceAll("script", "");
    returnVal = returnVal.replaceAll("iframe", "");
    returnVal = returnVal.replaceAll("embed", "");
    return returnVal;
  }

  getPostId() {
    const idNumReg = /\/\d+/;
    return window.location.pathname.match(idNumReg)[0];
  }
}
