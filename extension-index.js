
console.log('runing extension-index.js');

let s1 = document.createElement("script");
s1.innerHTML = '!function(i){function e(e){for(var t,r,n=e[0],o=e[1],u=e[2],l=0,f=[];l<n.length;l++)r=n[l],Object.prototype.hasOwnProperty.call(p,r)&&p[r]&&f.push(p[r][0]),p[r]=0;for(t in o)Object.prototype.hasOwnProperty.call(o,t)&&(i[t]=o[t]);for(s&&s(e);f.length;)f.shift()();return c.push.apply(c,u||[]),a()}function a(){for(var e,t=0;t<c.length;t++){for(var r=c[t],n=!0,o=1;o<r.length;o++){var u=r[o];0!==p[u]&&(n=!1)}n&&(c.splice(t--,1),e=l(l.s=r[0]))}return e}var r={},p={1:0},c=[];function l(e){if(r[e])return r[e].exports;var t=r[e]={i:e,l:!1,exports:{}};return i[e].call(t.exports,t,t.exports,l),t.l=!0,t.exports}l.m=i,l.c=r,l.d=function(e,t,r){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},l.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(t,e){if(1&e&&(t=l(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(l.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)l.d(r,n,function(e){return t[e]}.bind(null,n));return r},l.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="/";var t=this.webpackJsonpget_node_module=this.webpackJsonpget_node_module||[],n=t.push.bind(t);t.push=e,t=t.slice();for(var o=0;o<t.length;o++)e(t[o]);var s=n;a()}([])';


let s2 = document.createElement("script");
s2.src = "http://localhost:8888/static/js/2.cbeff8ca.chunk.js";


let s3 = document.createElement('script');
s3.src = "http://localhost:8888/static/js/main.4c2fe3eb.chunk.js";



// let currentNode = document.getElementsByTagName("body")[0];


document.body.insertBefore(s1, null);
document.body.insertBefore(s2, null);
document.body.insertBefore(s3, null);


let l = document.createElement('link');
l.src = "http://localhost:8888/static/css/main.87717e52.chunk.css";

document.head.insertBefore(l,document.head.lastChild);