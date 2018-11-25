/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/APIcreate.js":
/*!*************************!*\
  !*** ./js/APIcreate.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return APIcreate; });

class APIcreate {
  constructor() {
    this.link = 'https://www.googleapis.com/youtube/v3/';
    this.settings = {
      key: 'AIzaSyALr2jfjf9uKm8zLoyQ3BNGJBVa0ELxpMU',
    };
  }

  _makeUrl(options, endpoint) {
    let url = `${this.link}${endpoint}?`;
    for (const i in this.settings) url += `${i}=${this.settings[i]}&`;
    for (const i in options) url += `${i}=${options[i]}&`;
    return url.slice(0, -1); // /////убираем & в концк урла
  }

  getResp({ endpoint, options = {} }, callback) {
    fetch(this._makeUrl(options, endpoint), { method: 'GET' })
      .then(res => res.json())
      .then(data => callback(data))
      .catch(err => console.error(err));
  }
}


/***/ }),

/***/ "./js/Pagination.js":
/*!**************************!*\
  !*** ./js/Pagination.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Pagination; });
class Pagination {
  constructor() {
    this.code = '';
    this.clickHandle = this.clickHandle.bind(this);
    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);
    this.callback = function () {};
  }

  extend(data) {
    data = data || {};
    this.size = data.size || 300;
    this.page = data.page || 1;
    this.step = data.step || 3;
    this.callback = data.callback || this.callback;
  }

  add(s, f) {
    for (let i = s; i < f; i++) {
      this.code += `<a>${i}</a>`;
    }
  }

  last() {
    this.code += `<i>...</i><a>${this.size}</a>`;
  }

  first() {
    this.code += '<a>1</a><i>...</i>';
  }

  clickHandle(e) {
    this.page = +e.srcElement.innerHTML;
    this.start();
  }

  prev() {
    this.page--;
    if (this.page < 1) {
      this.page = 1;
    }
    this.start();
  }

  next() {
    this.page++;
    if (this.page > this.size) {
      this.page = this.size;
    }
    this.start();
  }

  binding() {
    const a = this.e.getElementsByTagName('a');
    for (let i = 0; i < a.length; i++) {
      if (+a[i].innerHTML === this.page) a[i].className = 'current';
      a[i].addEventListener('click', this.clickHandle, false);
    }
  }

  finish() {
    this.e.innerHTML = this.code;
    this.code = '';
    this.binding();
    this.callback();
  }

  start() {
    if (this.size < this.step * 2 + 6) {
      this.add(1, this.size + 1);
    } else if (this.page < this.step * 2 + 1) {
      this.add(1, this.step * 2 + 4);
      this.last();
    } else if (this.page > this.size - this.step * 2) {
      this.first();
      this.add(this.size - this.step * 2 - 2, this.size + 1);
    } else {
      this.first();
      this.add(this.page - this.step, this.page + this.step + 1);
      this.last();
    }
    this.finish();
  }

  buttons(e) {
    const nav = e.getElementsByTagName('a');
    nav[0].addEventListener('click', this.prev, false);
    nav[1].addEventListener('click', this.next, false);
  }

   create(e) {
    const html = ['<a>&#9668;</a>', '<span></span>', '<a>&#9658;</a>'];
    e.innerHTML = html.join('');
    this.e = e.getElementsByTagName('span')[0];
    this.buttons(e);
  }

  init(e, data) {
    this.extend(data);
    this.create(e);
    this.start();
  }
}


/***/ }),

/***/ "./js/index.js":
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _APIcreate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./APIcreate */ "./js/APIcreate.js");
/* harmony import */ var _Pagination__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Pagination */ "./js/Pagination.js");
/* harmony import */ var _style_style_less__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../style/style.less */ "./style/style.less");
/* harmony import */ var _style_style_less__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_style_less__WEBPACK_IMPORTED_MODULE_2__);




const maxResults = 15;
let clipsStep = 3.75;

let clipsNumber = clipsStep;

let i = 0;
let x0 = null;
let locked = false;
let winWidth;
let ini;
let fin;
let requestedID = null;
let actuanlNF;
let n;
let clipnum;
let maxclipnum = null;

const pagination = new _Pagination__WEBPACK_IMPORTED_MODULE_1__["default"]();

const paginationElement = document.createElement('div');
paginationElement.className = 'pagination';

let pageTokenNext = '';
let pageTokenPrev = '';

const headerPart = document.getElementsByTagName('body');

const divFormPart = document.createElement('div');
divFormPart.className = 'div-format';

const formPart = document.createElement('form');

const fieldSearch = document.createElement('input');

const divSearch = headerPart[0].appendChild(divFormPart);

divFormPart.appendChild(formPart);

let inputValue = fieldSearch.value;

const buttonSearch = document.createElement('button');
buttonSearch.innerHTML = 'Search';
formPart.appendChild(fieldSearch);
formPart.appendChild(buttonSearch);

const newClient = new _APIcreate__WEBPACK_IMPORTED_MODULE_0__["default"]();

function paginationUpdate() {
  pagination.init(document.getElementsByClassName('pagination')[0], {
    size: Math.ceil(clipsNumber),
    page: i + 1,
    step: 1,
    callback: setpage
});
}
function clickEventHandler(e) {
  inputValue = fieldSearch.value;
  newClient.getResp({ endpoint: 'search', options: { q: inputValue, part: 'snippet', maxResults: maxResults } }, drawElement);
  e.preventDefault();
}

buttonSearch.addEventListener('click', clickEventHandler);

const partMain = document.createElement('main');
partMain.className = 'list-query';
const divMain = headerPart[0].appendChild(partMain);
const listContainer = document.createElement('div');
listContainer.className = 'container-list';
partMain.appendChild(listContainer);

function drawElement(param) {
  pageTokenNext = param.nextPageToken ? param.nextPageToken : '';
  pageTokenPrev = param.prevPageToken ? param.prevPageToken : '';
  for (const i in param.items) {
    const clipElement = document.createElement('div');
    clipElement.classList.add(param.items[i].id.videoId);
    listContainer.appendChild(clipElement);
    clipElement.classList.add('clipElement');

    const elementTitle = document.createElement('a');
    elementTitle.href = `https://www.youtube.com/watch?v=${param.items[i].id.videoId}`;

    elementTitle.innerHTML = param.items[i].snippet.title;
    const elementImg = document.createElement('img');
    elementImg.src = param.items[i].snippet.thumbnails.high.url;
    const elementDescription = document.createElement('span');
    elementDescription.innerHTML = param.items[i].snippet.description;
    const elementPublicationData = document.createElement('span');
    elementPublicationData.innerHTML = param.items[i].snippet.publishedAt;
    newClient.getResp({
      endpoint: 'videos',
      options: { id: param.items[i].id.videoId, part: 'snippet,contentDetails,statistics' },
    }, drawVideoDetails);
    clipElement.appendChild(elementTitle);
    clipElement.appendChild(elementImg);
    clipElement.appendChild(elementDescription);
    clipElement.appendChild(elementPublicationData);
  }
  paginationUpdate ();
}

function drawVideoDetails(videoData) {
  const clipElementWithClassName = document.getElementsByClassName(videoData.items[0].id)[0]; // //div clipClient
  const elementAuthor = document.createElement('span');
  elementAuthor.innerHTML = videoData.items[0].snippet.channelTitle;
  clipElementWithClassName.appendChild(elementAuthor);
  const elementViewRate = document.createElement('span');
  elementViewRate.innerHTML = videoData.items[0].statistics.viewCount;
  clipElementWithClassName.appendChild(elementViewRate);
}

const containerList = document.querySelector('.container-list');
const listQueryContainer = document.querySelector('.list-query');

function preload(i) {
  if (i >= clipsNumber * 0.75) {
    newClient.getResp({ endpoint: 'search', options: { q: inputValue, part: 'snippet', maxResults: maxResults, pageToken: pageTokenNext} }, drawElement);
    clipsNumber += clipsStep;
    containerList.style.setProperty('--n', clipsNumber);
  }
}

function resizeEvent(type) {
   switch(type){
    case 1:
      clipnum = i * (maxResults / clipsStep);
      maxclipnum = clipsNumber / clipsStep * maxResults;
      clipsStep = 3.75;
      clipsNumber = maxclipnum / 4;
      i = clipnum / 4;
      containerList.style.setProperty('--n', clipsNumber);
      containerList.style.setProperty('--i', i);
      break;
    case 2:
      clipnum = i * (maxResults / clipsStep);
      maxclipnum = clipsNumber / clipsStep * maxResults;
      clipsStep = 7.5;
      clipsNumber = maxclipnum / 2;
      i = clipnum / 2;
      containerList.style.setProperty('--n', clipsNumber);
      containerList.style.setProperty('--i', i);
      break;
    case 3:
      clipnum = i * (maxResults / clipsStep);
      maxclipnum = clipsNumber / clipsStep * maxResults;
      clipsStep = 15;
      clipsNumber = maxclipnum;
      i = clipnum;
      containerList.style.setProperty('--n', clipsNumber);
      containerList.style.setProperty('--i', i );
      break;
  }
}

let mqlDesktop = window.matchMedia('(min-width: 1024px)');
mqlDesktop.addListener(function (e) {e.matches?resizeEvent(1):null});
(function (e) {e.matches?resizeEvent(1):null})(mqlDesktop);

let mqlTablet = window.matchMedia('(min-width: 768px) and ( max-width: 1023px)');
mqlTablet.addListener(function (e) {e.matches?resizeEvent(2):null});
(function (e) {e.matches?resizeEvent(2):null})(mqlTablet)


let mqlMobile = window.matchMedia('(min-width: 320px) and ( max-width: 767px)');
mqlMobile.addListener(function (e) {e.matches?resizeEvent(3):null});
(function (e) {e.matches?resizeEvent(3):null})(mqlMobile)


const NF = 30;

const transformFN = {
  'ease-in-out': function (k) {
    return 0.5 * (Math.sin((k - 0.5) * Math.PI) + 1);
  }
};

function stopAni() {
  cancelAnimationFrame(requestedID);
  requestedID = null;
}

function animate(currentFrame = 0) {
  let shift = (fin - ini) * transformFN['ease-in-out'](currentFrame / actuanlNF);
  if (!shift) shift =0;
  containerList.style.setProperty('--i', ini + shift);
  if (currentFrame === actuanlNF) {
    stopAni();
    preload(i);
    return;
  }
  requestedID = requestAnimationFrame(animate.bind(this, ++currentFrame));
}

function unify(e) { return e.changedTouches ? e.changedTouches[0] : e; }

function lock(e) {
  x0 = unify(e).clientX;
  locked = true;
}

function drag(e) {
  e.preventDefault();
  if (locked) {
    const dx = unify(e).clientX - x0;
    const f = +(dx / winWidth).toFixed(2);
    containerList.style.setProperty('--i', i - f);
  }
}

function move(e) {
  if (locked) {
    const dx = unify(e).clientX - x0;
    const s = Math.sign(dx);
    let f = +(s * dx / winWidth).toFixed(2);
    ini = i - s * f;
    if ((i > 0 || s < 0) && (i < clipsNumber - 1 || s > 0) && f > 0.2) {
      i -= s;
      f = 1 - f;
    }
    fin = i;
    actuanlNF = Math.round(f * NF);
    n = 2 + Math.round(f);
    animate();
    x0 = null;
    locked = false;
    setTimeout(paginationUpdate,300);
  }
}

function setpage() {
  let page = pagination.page - 1;
  ini = i;
  fin = page;
  i = page;
  actuanlNF = 30;
  animate();
}
setpage = setpage.bind(undefined);

function size() { winWidth = window.innerWidth; }
size();

containerList.style.setProperty('--n', clipsNumber);
listQueryContainer.addEventListener('resize', size, false);

listQueryContainer.addEventListener('mousedown', lock, false);
listQueryContainer.addEventListener('touchstart', lock, false);

listQueryContainer.addEventListener('mousemove', drag, false);
listQueryContainer.addEventListener('touchmove', drag, false);

listQueryContainer.addEventListener('mouseup', move, false);
listQueryContainer.addEventListener('touchend', move, false);

headerPart[0].appendChild(paginationElement);

function globalInit (e, psize = 30, ppage = 1, pstep = 1) {
  pagination.init(document.getElementsByClassName('pagination')[0], {
    size: psize, // pages size
    page: ppage, // selected page
    step: pstep, // pages before and after current
    callback: setpage
  });
};

//document.addEventListener('DOMContentLoaded', globalInit, false);




/***/ }),

/***/ "./style/style.less":
/*!**************************!*\
  !*** ./style/style.less ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vanMvQVBJY3JlYXRlLmpzIiwid2VicGFjazovLy8uL2pzL1BhZ2luYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vanMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3R5bGUvc3R5bGUubGVzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDakZlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCLFVBQVUsRUFBRSxTQUFTO0FBQ3RDLDZDQUE2QyxFQUFFLEdBQUcsaUJBQWlCO0FBQ25FLHVDQUF1QyxFQUFFLEdBQUcsV0FBVztBQUN2RCw0QkFBNEI7QUFDNUI7O0FBRUEsV0FBVyx1QkFBdUIsRUFBRTtBQUNwQyw2Q0FBNkMsZ0JBQWdCO0FBQzdEO0FBQ0E7QUFDQTtB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixTQUFJOztBQUUzQixpQkFBaUIsOEJBQThCO0FBQy9DOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBOzs7Ozs7Ozs7Ozs7OztBQzdRQSx5QyIsImZpbGUiOiIuL3JlbGVhc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2pzL2luZGV4LmpzXCIpO1xuIiwiXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBUEljcmVhdGUge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmxpbmsgPSAnaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20veW91dHViZS92My8nO1xuICAgIHRoaXMuc2V0dGluZ3MgPSB7XG4gICAgICBrZXk6ICdBSXphU3lBTHIyamZqZjl1S204ekxveVEzQk5HSkJWYTBFTHhwTVUnLFxuICAgIH07XG4gIH1cblxuICBfbWFrZVVybChvcHRpb25zLCBlbmRwb2ludCkge1xuICAgIGxldCB1cmwgPSBgJHt0aGlzLmxpbmt9JHtlbmRwb2ludH0/YDtcbiAgICBmb3IgKGNvbnN0IGkgaW4gdGhpcy5zZXR0aW5ncykgdXJsICs9IGAke2l9PSR7dGhpcy5zZXR0aW5nc1tpXX0mYDtcbiAgICBmb3IgKGNvbnN0IGkgaW4gb3B0aW9ucykgdXJsICs9IGAke2l9PSR7b3B0aW9uc1tpXX0mYDtcbiAgICByZXR1cm4gdXJsLnNsaWNlKDAsIC0xKTsgLy8gLy8vLy/Rg9Cx0LjRgNCw0LXQvCAmINCyINC60L7QvdGG0Log0YPRgNC70LBcbiAgfVxuXG4gIGdldFJlc3AoeyBlbmRwb2ludCwgb3B0aW9ucyA9IHt9IH0sIGNhbGxiYWNrKSB7XG4gICAgZmV0Y2godGhpcy5fbWFrZVVybChvcHRpb25zLCBlbmRwb2ludCksIHsgbWV0aG9kOiAnR0VUJyB9KVxuICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXG4gICAgICAudGhlbihkYXRhID0+IGNhbGxiYWNrKGRhdGEpKVxuICAgICAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmVycm9yKGVycikpO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBQYWdpbmF0aW9uIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5jb2RlID0gJyc7XG4gICAgdGhpcy5jbGlja0hhbmRsZSA9IHRoaXMuY2xpY2tIYW5kbGUuYmluZCh0aGlzKTtcbiAgICB0aGlzLnByZXYgPSB0aGlzLnByZXYuYmluZCh0aGlzKTtcbiAgICB0aGlzLm5leHQgPSB0aGlzLm5leHQuYmluZCh0aGlzKTtcbiAgICB0aGlzLmNhbGxiYWNrID0gZnVuY3Rpb24gKCkge307XG4gIH1cblxuICBleHRlbmQoZGF0YSkge1xuICAgIGRhdGEgPSBkYXRhIHx8IHt9O1xuICAgIHRoaXMuc2l6ZSA9IGRhdGEuc2l6ZSB8fCAzMDA7XG4gICAgdGhpcy5wYWdlID0gZGF0YS5wYWdlIHx8IDE7XG4gICAgdGhpcy5zdGVwID0gZGF0YS5zdGVwIHx8IDM7XG4gICAgdGhpcy5jYWxsYmFjayA9IGRhdGEuY2FsbGJhY2sgfHwgdGhpcy5jYWxsYmFjaztcbiAgfVxuXG4gIGFkZChzLCBmKSB7XG4gICAgZm9yIChsZXQgaSA9IHM7IGkgPCBmOyBpKyspIHtcbiAgICAgIHRoaXMuY29kZSArPSBgPGE+JHtpfTwvYT5gO1xuICAgIH1cbiAgfVxuXG4gIGxhc3QoKSB7XG4gICAgdGhpcy5jb2RlICs9IGA8aT4uLi48L2k+PGE+JHt0aGlzLnNpemV9PC9hPmA7XG4gIH1cblxuICBmaXJzdCgpIHtcbiAgICB0aGlzLmNvZGUgKz0gJzxhPjE8L2E+PGk+Li4uPC9pPic7XG4gIH1cblxuICBjbGlja0hhbmRsZShlKSB7XG4gICAgdGhpcy5wYWdlID0gK2Uuc3JjRWxlbWVudC5pbm5lckhUTUw7XG4gICAgdGhpcy5zdGFydCgpO1xuICB9XG5cbiAgcHJldigpIHtcbiAgICB0aGlzLnBhZ2UtLTtcbiAgICBpZiAodGhpcy5wYWdlIDwgMSkge1xuICAgICAgdGhpcy5wYWdlID0gMTtcbiAgICB9XG4gICAgdGhpcy5zdGFydCgpO1xuICB9XG5cbiAgbmV4dCgpIHtcbiAgICB0aGlzLnBhZ2UrKztcbiAgICBpZiAodGhpcy5wYWdlID4gdGhpcy5zaXplKSB7XG4gICAgICB0aGlzLnBhZ2UgPSB0aGlzLnNpemU7XG4gICAgfVxuICAgIHRoaXMuc3RhcnQoKTtcbiAgfVxuXG4gIGJpbmRpbmcoKSB7XG4gICAgY29uc3QgYSA9IHRoaXMuZS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYScpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYS5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKCthW2ldLmlubmVySFRNTCA9PT0gdGhpcy5wYWdlKSBhW2ldLmNsYXNzTmFtZSA9ICdjdXJyZW50JztcbiAgICAgIGFbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsaWNrSGFuZGxlLCBmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgZmluaXNoKCkge1xuICAgIHRoaXMuZS5pbm5lckhUTUwgPSB0aGlzLmNvZGU7XG4gICAgdGhpcy5jb2RlID0gJyc7XG4gICAgdGhpcy5iaW5kaW5nKCk7XG4gICAgdGhpcy5jYWxsYmFjaygpO1xuICB9XG5cbiAgc3RhcnQoKSB7XG4gICAgaWYgKHRoaXMuc2l6ZSA8IHRoaXMuc3RlcCAqIDIgKyA2KSB7XG4gICAgICB0aGlzLmFkZCgxLCB0aGlzLnNpemUgKyAxKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMucGFnZSA8IHRoaXMuc3RlcCAqIDIgKyAxKSB7XG4gICAgICB0aGlzLmFkZCgxLCB0aGlzLnN0ZXAgKiAyICsgNCk7XG4gICAgICB0aGlzLmxhc3QoKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMucGFnZSA+IHRoaXMuc2l6ZSAtIHRoaXMuc3RlcCAqIDIpIHtcbiAgICAgIHRoaXMuZmlyc3QoKTtcbiAgICAgIHRoaXMuYWRkKHRoaXMuc2l6ZSAtIHRoaXMuc3RlcCAqIDIgLSAyLCB0aGlzLnNpemUgKyAxKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5maXJzdCgpO1xuICAgICAgdGhpcy5hZGQodGhpcy5wYWdlIC0gdGhpcy5zdGVwLCB0aGlzLnBhZ2UgKyB0aGlzLnN0ZXAgKyAxKTtcbiAgICAgIHRoaXMubGFzdCgpO1xuICAgIH1cbiAgICB0aGlzLmZpbmlzaCgpO1xuICB9XG5cbiAgYnV0dG9ucyhlKSB7XG4gICAgY29uc3QgbmF2ID0gZS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYScpO1xuICAgIG5hdlswXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMucHJldiwgZmFsc2UpO1xuICAgIG5hdlsxXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMubmV4dCwgZmFsc2UpO1xuICB9XG5cbiAgIGNyZWF0ZShlKSB7XG4gICAgY29uc3QgaHRtbCA9IFsnPGE+JiM5NjY4OzwvYT4nLCAnPHNwYW4+PC9zcGFuPicsICc8YT4mIzk2NTg7PC9hPiddO1xuICAgIGUuaW5uZXJIVE1MID0gaHRtbC5qb2luKCcnKTtcbiAgICB0aGlzLmUgPSBlLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzcGFuJylbMF07XG4gICAgdGhpcy5idXR0b25zKGUpO1xuICB9XG5cbiAgaW5pdChlLCBkYXRhKSB7XG4gICAgdGhpcy5leHRlbmQoZGF0YSk7XG4gICAgdGhpcy5jcmVhdGUoZSk7XG4gICAgdGhpcy5zdGFydCgpO1xuICB9XG59XG4iLCJpbXBvcnQgQVBJY3JlYXRlIGZyb20gJy4vQVBJY3JlYXRlJztcbmltcG9ydCBQYWdpbmF0aW9uIGZyb20gJy4vUGFnaW5hdGlvbic7XG5pbXBvcnQgJy4uL3N0eWxlL3N0eWxlLmxlc3MnO1xuXG5jb25zdCBtYXhSZXN1bHRzID0gMTU7XG5sZXQgY2xpcHNTdGVwID0gMy43NTtcblxubGV0IGNsaXBzTnVtYmVyID0gY2xpcHNTdGVwO1xuXG5sZXQgaSA9IDA7XG5sZXQgeDAgPSBudWxsO1xubGV0IGxvY2tlZCA9IGZhbHNlO1xubGV0IHdpbldpZHRoO1xubGV0IGluaTtcbmxldCBmaW47XG5sZXQgcmVxdWVzdGVkSUQgPSBudWxsO1xubGV0IGFjdHVhbmxORjtcbmxldCBuO1xubGV0IGNsaXBudW07XG5sZXQgbWF4Y2xpcG51bSA9IG51bGw7XG5cbmNvbnN0IHBhZ2luYXRpb24gPSBuZXcgUGFnaW5hdGlvbigpO1xuXG5jb25zdCBwYWdpbmF0aW9uRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xucGFnaW5hdGlvbkVsZW1lbnQuY2xhc3NOYW1lID0gJ3BhZ2luYXRpb24nO1xuXG5sZXQgcGFnZVRva2VuTmV4dCA9ICcnO1xubGV0IHBhZ2VUb2tlblByZXYgPSAnJztcblxuY29uc3QgaGVhZGVyUGFydCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5Jyk7XG5cbmNvbnN0IGRpdkZvcm1QYXJ0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5kaXZGb3JtUGFydC5jbGFzc05hbWUgPSAnZGl2LWZvcm1hdCc7XG5cbmNvbnN0IGZvcm1QYXJ0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xuXG5jb25zdCBmaWVsZFNlYXJjaCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG5cbmNvbnN0IGRpdlNlYXJjaCA9IGhlYWRlclBhcnRbMF0uYXBwZW5kQ2hpbGQoZGl2Rm9ybVBhcnQpO1xuXG5kaXZGb3JtUGFydC5hcHBlbmRDaGlsZChmb3JtUGFydCk7XG5cbmxldCBpbnB1dFZhbHVlID0gZmllbGRTZWFyY2gudmFsdWU7XG5cbmNvbnN0IGJ1dHRvblNlYXJjaCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuYnV0dG9uU2VhcmNoLmlubmVySFRNTCA9ICdTZWFyY2gnO1xuZm9ybVBhcnQuYXBwZW5kQ2hpbGQoZmllbGRTZWFyY2gpO1xuZm9ybVBhcnQuYXBwZW5kQ2hpbGQoYnV0dG9uU2VhcmNoKTtcblxuY29uc3QgbmV3Q2xpZW50ID0gbmV3IEFQSWNyZWF0ZSgpO1xuXG5mdW5jdGlvbiBwYWdpbmF0aW9uVXBkYXRlKCkge1xuICBwYWdpbmF0aW9uLmluaXQoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncGFnaW5hdGlvbicpWzBdLCB7XG4gICAgc2l6ZTogTWF0aC5jZWlsKGNsaXBzTnVtYmVyKSxcbiAgICBwYWdlOiBpICsgMSxcbiAgICBzdGVwOiAxLFxuICAgIGNhbGxiYWNrOiBzZXRwYWdlXG59KTtcbn1cbmZ1bmN0aW9uIGNsaWNrRXZlbnRIYW5kbGVyKGUpIHtcbiAgaW5wdXRWYWx1ZSA9IGZpZWxkU2VhcmNoLnZhbHVlO1xuICBuZXdDbGllbnQuZ2V0UmVzcCh7IGVuZHBvaW50OiAnc2VhcmNoJywgb3B0aW9uczogeyBxOiBpbnB1dFZhbHVlLCBwYXJ0OiAnc25pcHBldCcsIG1heFJlc3VsdHM6IG1heFJlc3VsdHMgfSB9LCBkcmF3RWxlbWVudCk7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbn1cblxuYnV0dG9uU2VhcmNoLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xpY2tFdmVudEhhbmRsZXIpO1xuXG5jb25zdCBwYXJ0TWFpbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ21haW4nKTtcbnBhcnRNYWluLmNsYXNzTmFtZSA9ICdsaXN0LXF1ZXJ5JztcbmNvbnN0IGRpdk1haW4gPSBoZWFkZXJQYXJ0WzBdLmFwcGVuZENoaWxkKHBhcnRNYWluKTtcbmNvbnN0IGxpc3RDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbmxpc3RDb250YWluZXIuY2xhc3NOYW1lID0gJ2NvbnRhaW5lci1saXN0JztcbnBhcnRNYWluLmFwcGVuZENoaWxkKGxpc3RDb250YWluZXIpO1xuXG5mdW5jdGlvbiBkcmF3RWxlbWVudChwYXJhbSkge1xuICBwYWdlVG9rZW5OZXh0ID0gcGFyYW0ubmV4dFBhZ2VUb2tlbiA/IHBhcmFtLm5leHRQYWdlVG9rZW4gOiAnJztcbiAgcGFnZVRva2VuUHJldiA9IHBhcmFtLnByZXZQYWdlVG9rZW4gPyBwYXJhbS5wcmV2UGFnZVRva2VuIDogJyc7XG4gIGZvciAoY29uc3QgaSBpbiBwYXJhbS5pdGVtcykge1xuICAgIGNvbnN0IGNsaXBFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY2xpcEVsZW1lbnQuY2xhc3NMaXN0LmFkZChwYXJhbS5pdGVtc1tpXS5pZC52aWRlb0lkKTtcbiAgICBsaXN0Q29udGFpbmVyLmFwcGVuZENoaWxkKGNsaXBFbGVtZW50KTtcbiAgICBjbGlwRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdjbGlwRWxlbWVudCcpO1xuXG4gICAgY29uc3QgZWxlbWVudFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGVsZW1lbnRUaXRsZS5ocmVmID0gYGh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL3dhdGNoP3Y9JHtwYXJhbS5pdGVtc1tpXS5pZC52aWRlb0lkfWA7XG5cbiAgICBlbGVtZW50VGl0bGUuaW5uZXJIVE1MID0gcGFyYW0uaXRlbXNbaV0uc25pcHBldC50aXRsZTtcbiAgICBjb25zdCBlbGVtZW50SW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgZWxlbWVudEltZy5zcmMgPSBwYXJhbS5pdGVtc1tpXS5zbmlwcGV0LnRodW1ibmFpbHMuaGlnaC51cmw7XG4gICAgY29uc3QgZWxlbWVudERlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGVsZW1lbnREZXNjcmlwdGlvbi5pbm5lckhUTUwgPSBwYXJhbS5pdGVtc1tpXS5zbmlwcGV0LmRlc2NyaXB0aW9uO1xuICAgIGNvbnN0IGVsZW1lbnRQdWJsaWNhdGlvbkRhdGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgZWxlbWVudFB1YmxpY2F0aW9uRGF0YS5pbm5lckhUTUwgPSBwYXJhbS5pdGVtc1tpXS5zbmlwcGV0LnB1Ymxpc2hlZEF0O1xuICAgIG5ld0NsaWVudC5nZXRSZXNwKHtcbiAgICAgIGVuZHBvaW50OiAndmlkZW9zJyxcbiAgICAgIG9wdGlvbnM6IHsgaWQ6IHBhcmFtLml0ZW1zW2ldLmlkLnZpZGVvSWQsIHBhcnQ6ICdzbmlwcGV0LGNvbnRlbnREZXRhaWxzLHN0YXRpc3RpY3MnIH0sXG4gICAgfSwgZHJhd1ZpZGVvRGV0YWlscyk7XG4gICAgY2xpcEVsZW1lbnQuYXBwZW5kQ2hpbGQoZWxlbWVudFRpdGxlKTtcbiAgICBjbGlwRWxlbWVudC5hcHBlbmRDaGlsZChlbGVtZW50SW1nKTtcbiAgICBjbGlwRWxlbWVudC5hcHBlbmRDaGlsZChlbGVtZW50RGVzY3JpcHRpb24pO1xuICAgIGNsaXBFbGVtZW50LmFwcGVuZENoaWxkKGVsZW1lbnRQdWJsaWNhdGlvbkRhdGEpO1xuICB9XG4gIHBhZ2luYXRpb25VcGRhdGUgKCk7XG59XG5cbmZ1bmN0aW9uIGRyYXdWaWRlb0RldGFpbHModmlkZW9EYXRhKSB7XG4gIGNvbnN0IGNsaXBFbGVtZW50V2l0aENsYXNzTmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUodmlkZW9EYXRhLml0ZW1zWzBdLmlkKVswXTsgLy8gLy9kaXYgY2xpcENsaWVudFxuICBjb25zdCBlbGVtZW50QXV0aG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICBlbGVtZW50QXV0aG9yLmlubmVySFRNTCA9IHZpZGVvRGF0YS5pdGVtc1swXS5zbmlwcGV0LmNoYW5uZWxUaXRsZTtcbiAgY2xpcEVsZW1lbnRXaXRoQ2xhc3NOYW1lLmFwcGVuZENoaWxkKGVsZW1lbnRBdXRob3IpO1xuICBjb25zdCBlbGVtZW50Vmlld1JhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gIGVsZW1lbnRWaWV3UmF0ZS5pbm5lckhUTUwgPSB2aWRlb0RhdGEuaXRlbXNbMF0uc3RhdGlzdGljcy52aWV3Q291bnQ7XG4gIGNsaXBFbGVtZW50V2l0aENsYXNzTmFtZS5hcHBlbmRDaGlsZChlbGVtZW50Vmlld1JhdGUpO1xufVxuXG5jb25zdCBjb250YWluZXJMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRhaW5lci1saXN0Jyk7XG5jb25zdCBsaXN0UXVlcnlDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGlzdC1xdWVyeScpO1xuXG5mdW5jdGlvbiBwcmVsb2FkKGkpIHtcbiAgaWYgKGkgPj0gY2xpcHNOdW1iZXIgKiAwLjc1KSB7XG4gICAgbmV3Q2xpZW50LmdldFJlc3AoeyBlbmRwb2ludDogJ3NlYXJjaCcsIG9wdGlvbnM6IHsgcTogaW5wdXRWYWx1ZSwgcGFydDogJ3NuaXBwZXQnLCBtYXhSZXN1bHRzOiBtYXhSZXN1bHRzLCBwYWdlVG9rZW46IHBhZ2VUb2tlbk5leHR9IH0sIGRyYXdFbGVtZW50KTtcbiAgICBjbGlwc051bWJlciArPSBjbGlwc1N0ZXA7XG4gICAgY29udGFpbmVyTGlzdC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1uJywgY2xpcHNOdW1iZXIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlc2l6ZUV2ZW50KHR5cGUpIHtcbiAgIHN3aXRjaCh0eXBlKXtcbiAgICBjYXNlIDE6XG4gICAgICBjbGlwbnVtID0gaSAqIChtYXhSZXN1bHRzIC8gY2xpcHNTdGVwKTtcbiAgICAgIG1heGNsaXBudW0gPSBjbGlwc051bWJlciAvIGNsaXBzU3RlcCAqIG1heFJlc3VsdHM7XG4gICAgICBjbGlwc1N0ZXAgPSAzLjc1O1xuICAgICAgY2xpcHNOdW1iZXIgPSBtYXhjbGlwbnVtIC8gNDtcbiAgICAgIGkgPSBjbGlwbnVtIC8gNDtcbiAgICAgIGNvbnRhaW5lckxpc3Quc3R5bGUuc2V0UHJvcGVydHkoJy0tbicsIGNsaXBzTnVtYmVyKTtcbiAgICAgIGNvbnRhaW5lckxpc3Quc3R5bGUuc2V0UHJvcGVydHkoJy0taScsIGkpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAyOlxuICAgICAgY2xpcG51bSA9IGkgKiAobWF4UmVzdWx0cyAvIGNsaXBzU3RlcCk7XG4gICAgICBtYXhjbGlwbnVtID0gY2xpcHNOdW1iZXIgLyBjbGlwc1N0ZXAgKiBtYXhSZXN1bHRzO1xuICAgICAgY2xpcHNTdGVwID0gNy41O1xuICAgICAgY2xpcHNOdW1iZXIgPSBtYXhjbGlwbnVtIC8gMjtcbiAgICAgIGkgPSBjbGlwbnVtIC8gMjtcbiAgICAgIGNvbnRhaW5lckxpc3Quc3R5bGUuc2V0UHJvcGVydHkoJy0tbicsIGNsaXBzTnVtYmVyKTtcbiAgICAgIGNvbnRhaW5lckxpc3Quc3R5bGUuc2V0UHJvcGVydHkoJy0taScsIGkpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAzOlxuICAgICAgY2xpcG51bSA9IGkgKiAobWF4UmVzdWx0cyAvIGNsaXBzU3RlcCk7XG4gICAgICBtYXhjbGlwbnVtID0gY2xpcHNOdW1iZXIgLyBjbGlwc1N0ZXAgKiBtYXhSZXN1bHRzO1xuICAgICAgY2xpcHNTdGVwID0gMTU7XG4gICAgICBjbGlwc051bWJlciA9IG1heGNsaXBudW07XG4gICAgICBpID0gY2xpcG51bTtcbiAgICAgIGNvbnRhaW5lckxpc3Quc3R5bGUuc2V0UHJvcGVydHkoJy0tbicsIGNsaXBzTnVtYmVyKTtcbiAgICAgIGNvbnRhaW5lckxpc3Quc3R5bGUuc2V0UHJvcGVydHkoJy0taScsIGkgKTtcbiAgICAgIGJyZWFrO1xuICB9XG59XG5cbmxldCBtcWxEZXNrdG9wID0gd2luZG93Lm1hdGNoTWVkaWEoJyhtaW4td2lkdGg6IDEwMjRweCknKTtcbm1xbERlc2t0b3AuYWRkTGlzdGVuZXIoZnVuY3Rpb24gKGUpIHtlLm1hdGNoZXM/cmVzaXplRXZlbnQoMSk6bnVsbH0pO1xuKGZ1bmN0aW9uIChlKSB7ZS5tYXRjaGVzP3Jlc2l6ZUV2ZW50KDEpOm51bGx9KShtcWxEZXNrdG9wKTtcblxubGV0IG1xbFRhYmxldCA9IHdpbmRvdy5tYXRjaE1lZGlhKCcobWluLXdpZHRoOiA3NjhweCkgYW5kICggbWF4LXdpZHRoOiAxMDIzcHgpJyk7XG5tcWxUYWJsZXQuYWRkTGlzdGVuZXIoZnVuY3Rpb24gKGUpIHtlLm1hdGNoZXM/cmVzaXplRXZlbnQoMik6bnVsbH0pO1xuKGZ1bmN0aW9uIChlKSB7ZS5tYXRjaGVzP3Jlc2l6ZUV2ZW50KDIpOm51bGx9KShtcWxUYWJsZXQpXG5cblxubGV0IG1xbE1vYmlsZSA9IHdpbmRvdy5tYXRjaE1lZGlhKCcobWluLXdpZHRoOiAzMjBweCkgYW5kICggbWF4LXdpZHRoOiA3NjdweCknKTtcbm1xbE1vYmlsZS5hZGRMaXN0ZW5lcihmdW5jdGlvbiAoZSkge2UubWF0Y2hlcz9yZXNpemVFdmVudCgzKTpudWxsfSk7XG4oZnVuY3Rpb24gKGUpIHtlLm1hdGNoZXM/cmVzaXplRXZlbnQoMyk6bnVsbH0pKG1xbE1vYmlsZSlcblxuXG5jb25zdCBORiA9IDMwO1xuXG5jb25zdCB0cmFuc2Zvcm1GTiA9IHtcbiAgJ2Vhc2UtaW4tb3V0JzogZnVuY3Rpb24gKGspIHtcbiAgICByZXR1cm4gMC41ICogKE1hdGguc2luKChrIC0gMC41KSAqIE1hdGguUEkpICsgMSk7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIHN0b3BBbmkoKSB7XG4gIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHJlcXVlc3RlZElEKTtcbiAgcmVxdWVzdGVkSUQgPSBudWxsO1xufVxuXG5mdW5jdGlvbiBhbmltYXRlKGN1cnJlbnRGcmFtZSA9IDApIHtcbiAgbGV0IHNoaWZ0ID0gKGZpbiAtIGluaSkgKiB0cmFuc2Zvcm1GTlsnZWFzZS1pbi1vdXQnXShjdXJyZW50RnJhbWUgLyBhY3R1YW5sTkYpO1xuICBpZiAoIXNoaWZ0KSBzaGlmdCA9MDtcbiAgY29udGFpbmVyTGlzdC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1pJywgaW5pICsgc2hpZnQpO1xuICBpZiAoY3VycmVudEZyYW1lID09PSBhY3R1YW5sTkYpIHtcbiAgICBzdG9wQW5pKCk7XG4gICAgcHJlbG9hZChpKTtcbiAgICByZXR1cm47XG4gIH1cbiAgcmVxdWVzdGVkSUQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZS5iaW5kKHRoaXMsICsrY3VycmVudEZyYW1lKSk7XG59XG5cbmZ1bmN0aW9uIHVuaWZ5KGUpIHsgcmV0dXJuIGUuY2hhbmdlZFRvdWNoZXMgPyBlLmNoYW5nZWRUb3VjaGVzWzBdIDogZTsgfVxuXG5mdW5jdGlvbiBsb2NrKGUpIHtcbiAgeDAgPSB1bmlmeShlKS5jbGllbnRYO1xuICBsb2NrZWQgPSB0cnVlO1xufVxuXG5mdW5jdGlvbiBkcmFnKGUpIHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBpZiAobG9ja2VkKSB7XG4gICAgY29uc3QgZHggPSB1bmlmeShlKS5jbGllbnRYIC0geDA7XG4gICAgY29uc3QgZiA9ICsoZHggLyB3aW5XaWR0aCkudG9GaXhlZCgyKTtcbiAgICBjb250YWluZXJMaXN0LnN0eWxlLnNldFByb3BlcnR5KCctLWknLCBpIC0gZik7XG4gIH1cbn1cblxuZnVuY3Rpb24gbW92ZShlKSB7XG4gIGlmIChsb2NrZWQpIHtcbiAgICBjb25zdCBkeCA9IHVuaWZ5KGUpLmNsaWVudFggLSB4MDtcbiAgICBjb25zdCBzID0gTWF0aC5zaWduKGR4KTtcbiAgICBsZXQgZiA9ICsocyAqIGR4IC8gd2luV2lkdGgpLnRvRml4ZWQoMik7XG4gICAgaW5pID0gaSAtIHMgKiBmO1xuICAgIGlmICgoaSA+IDAgfHwgcyA8IDApICYmIChpIDwgY2xpcHNOdW1iZXIgLSAxIHx8IHMgPiAwKSAmJiBmID4gMC4yKSB7XG4gICAgICBpIC09IHM7XG4gICAgICBmID0gMSAtIGY7XG4gICAgfVxuICAgIGZpbiA9IGk7XG4gICAgYWN0dWFubE5GID0gTWF0aC5yb3VuZChmICogTkYpO1xuICAgIG4gPSAyICsgTWF0aC5yb3VuZChmKTtcbiAgICBhbmltYXRlKCk7XG4gICAgeDAgPSBudWxsO1xuICAgIGxvY2tlZCA9IGZhbHNlO1xuICAgIHNldFRpbWVvdXQocGFnaW5hdGlvblVwZGF0ZSwzMDApO1xuICB9XG59XG5cbmZ1bmN0aW9uIHNldHBhZ2UoKSB7XG4gIGxldCBwYWdlID0gcGFnaW5hdGlvbi5wYWdlIC0gMTtcbiAgaW5pID0gaTtcbiAgZmluID0gcGFnZTtcbiAgaSA9IHBhZ2U7XG4gIGFjdHVhbmxORiA9IDMwO1xuICBhbmltYXRlKCk7XG59XG5zZXRwYWdlID0gc2V0cGFnZS5iaW5kKHRoaXMpO1xuXG5mdW5jdGlvbiBzaXplKCkgeyB3aW5XaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoOyB9XG5zaXplKCk7XG5cbmNvbnRhaW5lckxpc3Quc3R5bGUuc2V0UHJvcGVydHkoJy0tbicsIGNsaXBzTnVtYmVyKTtcbmxpc3RRdWVyeUNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBzaXplLCBmYWxzZSk7XG5cbmxpc3RRdWVyeUNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBsb2NrLCBmYWxzZSk7XG5saXN0UXVlcnlDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIGxvY2ssIGZhbHNlKTtcblxubGlzdFF1ZXJ5Q29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGRyYWcsIGZhbHNlKTtcbmxpc3RRdWVyeUNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBkcmFnLCBmYWxzZSk7XG5cbmxpc3RRdWVyeUNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgbW92ZSwgZmFsc2UpO1xubGlzdFF1ZXJ5Q29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgbW92ZSwgZmFsc2UpO1xuXG5oZWFkZXJQYXJ0WzBdLmFwcGVuZENoaWxkKHBhZ2luYXRpb25FbGVtZW50KTtcblxuZnVuY3Rpb24gZ2xvYmFsSW5pdCAoZSwgcHNpemUgPSAzMCwgcHBhZ2UgPSAxLCBwc3RlcCA9IDEpIHtcbiAgcGFnaW5hdGlvbi5pbml0KGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3BhZ2luYXRpb24nKVswXSwge1xuICAgIHNpemU6IHBzaXplLCAvLyBwYWdlcyBzaXplXG4gICAgcGFnZTogcHBhZ2UsIC8vIHNlbGVjdGVkIHBhZ2VcbiAgICBzdGVwOiBwc3RlcCwgLy8gcGFnZXMgYmVmb3JlIGFuZCBhZnRlciBjdXJyZW50XG4gICAgY2FsbGJhY2s6IHNldHBhZ2VcbiAgfSk7XG59O1xuXG4vL2RvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBnbG9iYWxJbml0LCBmYWxzZSk7XG5cblxuIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW4iXSwic291cmNlUm9vdCI6IiJ9