if(!self.define){let e,s={};const n=(n,i)=>(n=new URL(n+".js",i).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(i,c)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(s[o])return;let r={};const f=e=>n(e,o),l={module:{uri:o},exports:r,require:f};s[o]=Promise.all(i.map((e=>l[e]||f(e)))).then((e=>(c(...e),r)))}}define(["./workbox-db5fc017"],(function(e){"use strict";e.setCacheNameDetails({prefix:"note-app"}),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"/assets/icons/icon-128x128.png",revision:"dc3309c63fac0976eeed5f87a4817513"},{url:"/assets/icons/icon-144x144.png",revision:"c589c3dc51755bffd29ce83476956edc"},{url:"/assets/icons/icon-152x152.png",revision:"f3103e60676bb973dc936e18e2fa65fb"},{url:"/assets/icons/icon-192x192.png",revision:"cc29030fbe289100b999ac45e0adf1ab"},{url:"/assets/icons/icon-384x384.png",revision:"f36d81e233c524161eb0c8fb2ddc1d0d"},{url:"/assets/icons/icon-48x48.png",revision:"cf13595ae5267909ba93da665fa887cb"},{url:"/assets/icons/icon-512x512.png",revision:"81693bbe599b432abff2c4a8fb8ea9e1"},{url:"/assets/icons/icon-72x72.png",revision:"c64fdad249257e50e6a01453c4726de8"},{url:"/assets/icons/icon-96x96.png",revision:"5c751024bf902f0856bd343c7af4ab50"},{url:"/css/app.1bf9e6d2.css",revision:null},{url:"/css/chunk-vendors.ca7ba362.css",revision:null},{url:"/fonts/element-icons.f1a45d74.ttf",revision:null},{url:"/fonts/element-icons.ff18efd1.woff",revision:null},{url:"/index.html",revision:"f6803ff88a193e23318b4ba3fce28a83"},{url:"/js/app.da076e31.js",revision:null},{url:"/js/chunk-vendors.8a5eb3a4.js",revision:null},{url:"/manifest.json",revision:"5362b2604ecb790c4b8111d59e079ef4"},{url:"/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map
