import {renderMainToElement} from './renderMain'

function initTest() {
  const rootElement = document.getElementById("root");
  renderMainToElement(rootElement);
  require('./testStart');

}
initTest();