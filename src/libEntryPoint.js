import {renderMainToElement} from './renderMain';
import * as myEOSCore from '@/core';
import {boundActions} from '@/store';

var hasElemInit = false;
function MyEOS(options={}){
  if(typeof options.scatterAppName==='string') {
    boundActions.setScatterAppName(options.scatterAppName);
    if(!options.appName) {
      boundActions.setMyEosTitle(options.scatterAppName);
    }
  }
  if(typeof options.anchorAppName==='string') {
    boundActions.setAnchorAppName(options.anchorAppName);
    if(!options.appName && !options.scatterAppName) {
      boundActions.setMyEosTitle(options.anchorAppName);
    }
  }
  if(typeof options.appName==='string') {
    boundActions.setMyEosTitle(options.appName);
    if(!options.scatterAppName) {
      boundActions.setScatterAppName(options.appName);
    }
    if(!options.anchorAppName) {
      boundActions.setAnchorAppName(options.appName);
    }
  }
  let conElem = options.container;
  if(!hasElemInit||options.forceReRender){
    hasElemInit = true;
    if(options.container) {
      renderMainToElement(options.container);
    }else{
      const containerElem = document.createElement("div");
      containerElem.style.position="absolute";
      document.body.appendChild(containerElem);
      renderMainToElement(containerElem);
      conElem=containerElem;

    }
  }
  const myEOSInstance = myEOSCore.init(options);
  myEOSInstance.containerElement = conElem;
  return myEOSInstance;
}
export default MyEOS;
export {MyEOS};