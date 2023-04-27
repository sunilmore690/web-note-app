(function(){"use strict";var e={5912:function(e,t,o){var n=o(7195),s=function(){var e=this,t=e._self._c;return t("div",[t("div",{style:{marginBottom:"10px"}},[t("el-dialog",{attrs:{title:"About Us",visible:e.dialogVisible,width:"90%"},on:{"update:visible":function(t){e.dialogVisible=t}}},[t("p",{style:{fontSize:"medium"}},[e._v(" Welcome to the Note App! We are a team of developers dedicated to providing you with a user-friendly and efficient note-taking experience. Our app comes equipped with a variety of features to make your note-taking experience as smooth as possible. With our app, "),t("br"),e._v(" "),t("br"),t("ul",[t("li",[e._v(" Store Notes Offline ")]),t("li",[e._v(" Sort Notes By Created and Updated Date ")]),t("li",[e._v(" Search the notes by Title or Tag ")]),t("li",[e._v(" Filter the notes by tag ")]),t("li",[e._v(" Backup and Restore your notes")])]),e._v(" To ensure that your notes are always safe and secure, our app also offers a backup and restore function. This means you can backup your notes to the cloud and restore them whenever necessary, giving you peace of mind knowing that your notes are always protected. "),t("br"),t("br"),e._v("Thank you for choosing PWA Note app. We hope our app will help you stay organized and productive! "),t("br"),t("br"),e._v(" For any query , contact "),t("a",{attrs:{href:"mailto:sunilmore690@gmail.com?subject=Note App Contact"}},[e._v("Send an email")])])]),t("el-row",[t("el-col",{attrs:{sm:10}},[t("span",{style:{fontSize:"25px",fontWeight:700}},[e._v("Take Note")]),e._v("  "),t("span",[e._v("By "),t("a",{attrs:{href:"https://sunilmore.com",target:"_blank"}},[e._v(" Sunil More")])]),e._v("    "),t("el-button",{attrs:{type:"text"},on:{click:function(t){e.dialogVisible=!0}}},[e._v("About Us")])],1),t("el-col",{attrs:{sm:2}},[e._v(" ")]),t("el-col",{attrs:{sm:6}},[t("BackupRestore")],1),t("el-col",{attrs:{sm:2}})],1)],1),t("div",[t("DashBoard",{attrs:{msg:"Hello Vue in CodeSandbox!"}})],1)])},a=[],i=function(){var e=this,t=e._self._c;return t("el-row",[t("el-col",{attrs:{span:8,xs:24}},[t("SideList",{attrs:{notes:e.notes,note:e.note,tags:e.tags},on:{setnote:e.handleSetNote,addnote:e.handleAddNote,removenote:e.handleRemoveNote}})],1),e.isMobile?t("el-col",{staticClass:"notemobile",style:{display:"view"===e.mode?"inherit":"none"},attrs:{span:16,xs:24}},[t("div",{staticStyle:{"padding-bottom":"5px"},on:{click:function(t){return e.changeMode("list")}}},[t("i",{staticClass:"el-icon-back"}),e._v(" Back ")]),t("Note",{attrs:{note:e.note,tags:e.tags},on:{savenote:e.handleSaveNote,updatetags:e.handleUpdateTags}})],1):t("el-col",{staticClass:"note",attrs:{span:16,xs:24}},[t("Note",{attrs:{note:e.note,tags:e.tags},on:{savenote:e.handleSaveNote,updatetags:e.handleUpdateTags}})],1)],1)},r=[];o(7658);const l="notes-db",c=1;function d(){return new Promise(((e,t)=>{const o=indexedDB.open(l,c);o.onupgradeneeded=e=>{const t=e.target.result,o=t.createObjectStore("notes",{keyPath:"id",autoIncrement:!0});o.createIndex("updated","updated",{unique:!1})},o.onerror=()=>{t(Error("Failed to open database"))},o.onsuccess=()=>{e(o.result)}}))}function u(e){return new Promise(((t,o)=>{d().then((n=>{const s=n.transaction(["notes"],"readwrite"),a=s.objectStore("notes"),i=a.get(e);i.onerror=()=>{o(Error("Failed to save note"))},i.onsuccess=()=>{t(i.result)}}))}))}function h(e){return new Promise(((t,o)=>{d().then((n=>{const s=n.transaction(["notes"],"readwrite"),a=s.objectStore("notes"),i=a.get(e.id);i.onerror=()=>{o(Error("Failed to save note"))},i.onsuccess=()=>{const n=i.result;if(console.log("exiexistingRecord",n),n)m(e).then(t).catch(o);else{const{id:n,...s}=e;console.debug(n),p(s).then(t).catch(o)}t(i.result)}}))}))}function p(e){return new Promise(((t,o)=>{d().then((n=>{const s=n.transaction(["notes"],"readwrite"),a=s.objectStore("notes"),i=a.add(e);i.onerror=()=>{o(Error("Failed to save note"))},i.onsuccess=()=>{t(i.result)}}))}))}function m(e){return new Promise(((t,o)=>{d().then((n=>{const s=n.transaction(["notes"],"readwrite"),a=s.objectStore("notes"),i=a.put(e);i.onerror=()=>{o(Error("Failed to save note"))},i.onsuccess=()=>{t(i.result)}}))}))}function g(){return new Promise(((e,t)=>{d().then((o=>{const n=o.transaction(["notes"],"readonly"),s=n.objectStore("notes"),a=s.getAll();a.onerror=()=>{t(Error("Failed to get notes"))},a.onsuccess=()=>{e(a.result)}}))}))}function v(e){return new Promise(((t,o)=>{d().then((n=>{const s=n.transaction(["notes"],"readwrite"),a=s.objectStore("notes"),i=a.delete(e);i.onerror=()=>{o(Error("Failed to delete note"))},i.onsuccess=()=>{t(i.result)}}))}))}var f=function(){var e=this,t=e._self._c;return t("el-row",[t("div",{staticStyle:{"margin-bottom":"10px"}},[t("el-row",[t("el-col",{attrs:{span:8}},[t("div",{staticStyle:{"text-align":"left"}},[t("el-select",{attrs:{placeholder:"Select"},model:{value:e.sortBy,callback:function(t){e.sortBy=t},expression:"sortBy"}},e._l(e.sortOptions,(function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1)]),t("el-col",{attrs:{span:8}},[t("el-select",{staticStyle:{"margin-left":"20px"},attrs:{multiple:"","collapse-tags":"",placeholder:"Tags"},on:{change:e.handleTagChange},model:{value:e.selectedTags,callback:function(t){e.selectedTags=t},expression:"selectedTags"}},e._l(e.tags,(function(e){return t("el-option",{key:e+"sidenote",attrs:{label:e,value:e}})})),1)],1),t("el-col",{attrs:{span:8}},[t("div",{staticStyle:{"text-align":"right"}},[t("el-popover",{attrs:{placement:"top",width:"160"},model:{value:e.visible,callback:function(t){e.visible=t},expression:"visible"}},[t("p",[e._v("Are you sure to delete this?")]),t("div",{staticStyle:{"text-align":"right",margin:"0"}},[t("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(t){e.visible=!1}}},[e._v("cancel")]),t("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){e.handleRemove(e.note),e.visible=!1}}},[e._v("confirm")])],1),t("el-button",{attrs:{slot:"reference",icon:"el-icon-delete",round:"",size:"mini"},slot:"reference"})],1),t("span",{staticStyle:{"padding-left":"10px","padding-right":"20px"}},[e._v(e._s(e.mynotes.length)+" / "+e._s(e.notes.length)+" Notes")]),t("el-button",{staticClass:"add-note-btn",attrs:{size:"small",round:""},on:{click:function(t){return e.addNote()}}},[e._v("+ Add Note")])],1)])],1)],1),t("div",{staticStyle:{"margin-bottom":"10px"}},[t("el-input",{attrs:{placeholder:"search notes ...",clearable:""},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}})],1),t("div",{staticStyle:{"max-height":"70vh","overflow-y":"auto"}},e._l(e.mynotes,(function(o){return t("div",{key:o.id,on:{click:function(t){return t.preventDefault(),e.setNote(o)}}},[t("note-unit",{attrs:{noteobj:o,note:e.note},on:{removenote:e.handleRemove}})],1)})),0)])},y=[],b=function(){var e=this,t=e._self._c;return t("div",{staticStyle:{"margin-bottom":"8px"},on:{mouseenter:e.handleMouseEnter,mouseleave:function(t){e.close=!1},contextmenu:function(t){e.close=!0,t.preventDefault()}}},[t("el-card",{staticClass:"box-card note-list-unit",class:{active:e.note.id===e.noteobj.id}},[t("div",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],staticStyle:{position:"absolute"}},[t("el-popover",{attrs:{placement:"top",width:"160"},model:{value:e.visible,callback:function(t){e.visible=t},expression:"visible"}},[t("p",[e._v("Are you sure to delete this?")]),t("div",{staticStyle:{"text-align":"right",margin:"0"}},[t("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(t){e.visible=!1}}},[e._v("cancel")]),t("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){e.handleDeleteNote(e.note),e.visible=!1}}},[e._v("confirm")])],1),t("el-button",{attrs:{slot:"reference",type:"danger",size:"large",round:""},on:{click:function(e){e.stopPropagation()}},slot:"reference"},[e._v("X")])],1)],1),t("span",{staticStyle:{"font-weight":"bold"}},[e._v(e._s(e._f("trim")(e.noteobj.title,40)))]),t("el-row",{staticStyle:{"font-size":"smaller","padding-top":"10px"}},[t("el-col",{attrs:{span:12}},[e._v("Created :"+e._s(e._f("updatedFormatDate")(e.noteobj.created)))]),t("el-col",{attrs:{span:12}},[e._v("Updated : "+e._s(e._f("updatedFormatDate")(e.noteobj.updated)))])],1)],1)],1)},w=[],S={props:["noteobj","note"],data(){return{close:!1,visible:!1}},methods:{handleDeleteNote(e){this.$emit("removenote",e)},handleMouseEnter(){window.isMobile||(this.close=!0)}},filters:{trim(e="",t=10){return e.length<=30?e:e.slice(0,t)+"..."},updatedFormatDate(e){const t=new Date(e),o=new Date,n=(o.getTime()-t.getTime())/1e3;if(n<60)return Math.floor(n)+" seconds ago";if(n<3600){const e=Math.floor(n/60);return 1===e?"1 minute ago":e+" minutes ago"}if(n<86400){const e=Math.floor(n/3600);return 1===e?"1 hour ago":e+" hours ago"}if(n<432e3){const e=Math.floor(n/86400);return 1===e?"1 day ago":e+" days ago"}{const e={year:"numeric",month:"long",day:"numeric"};return t.toLocaleDateString("en-US",e)}},formatDate(e){try{e||(e=new Date);let t=e.toLocaleString("default",{month:"short"});return`${e.getDate()}-${t}-${e.getFullYear()}`}catch(t){e=new Date;let o=e.toLocaleString("default",{month:"short"});return`${e.getDate()}-${o}-${e.getFullYear()}`}}}},_=S,N=o(1001),x=(0,N.Z)(_,b,w,!1,null,"0d7189fc",null),k=x.exports,T={props:["notes","note","tags"],data(){return{visible:!1,mynotes:[],sortOptions:[{label:"Last Updated Notes",value:"updatedDesc"},{label:"Old Created Notes",value:"createdAsc"},{label:"Oldest  Updated Notes",value:"updatedAsc"},{label:"Latest  Created Notes",value:"createdDesc"}],search:"",close:!1,sortBy:"updatedDesc",selectedTags:[]}},watch:{notes(){this.mynotes=this.notes},sortBy(){this.sortNotes()},search(){this.search?this.search.trim()&&(this.search.length<3||(this.mynotes=this.mynotes.filter((e=>{const t=e.title||"";return t.match(new RegExp(this.search,"i"))||Array.isArray(e.tags)&&e.tags.includes(this.search)})))):this.mynotes=this.notes}},methods:{addNote(){this.$emit("addnote")},sortNotes(){this.mynotes=this.mynotes.sort(((e,t)=>(e.created=e.created?new Date(e.created):new Date,e.updated=e.updated?new Date(e.updated):new Date,t.updated=t.updated?new Date(t.updated):new Date,t.created=t.created?new Date(t.created):new Date,"createdAsc"===this.sortBy?e.created.getTime()-t.created.getTime():"createdDesc"===this.sortBy?t.created.getTime()-e.created.getTime():"updatedAsc"===this.sortBy?e.updated.getTime()-t.updated.getTime():"updatedDesc"===this.sortBy?t.updated.getTime()-e.updated.getTime():e.title)))},setNote(e){this.$emit("setnote",e)},handleRemove(e){console.log("handleRemove",e),this.$emit("removenote",e)},handleTagChange(){this.selectedTags.length?this.mynotes=this.mynotes.filter((e=>Array.isArray(e.tags)&&e.tags.some((e=>this.selectedTags.includes(e))))):this.mynotes=this.notes}},mounted(){this.sortNotes()},components:{NoteUnit:k}},D=T,A=(0,N.Z)(D,f,y,!1,null,"055a454c",null),O=A.exports,j=function(){var e=this,t=e._self._c;return t("el-row",[e.editMode?t("div",[t("div",{staticStyle:{"margin-bottom":"10px"}},[t("el-input",{attrs:{placeholder:"Title goes here ..."},on:{change:e.saveNote},model:{value:e.mynote.title,callback:function(t){e.$set(e.mynote,"title",t)},expression:"mynote.title"}})],1),t("div",{staticStyle:{"margin-bottom":"10px"}},[t("el-select",{staticStyle:{width:"100%"},attrs:{multiple:"",filterable:"","allow-create":"","default-first-option":"",placeholder:"Enter your tags here..."},on:{change:e.saveNote},model:{value:e.mynote.tags,callback:function(t){e.$set(e.mynote,"tags",t)},expression:"mynote.tags"}},e._l(e.tags||[],(function(e){return t("el-option",{key:e,attrs:{label:e,value:e}})})),1)],1),t("vue-editor",{ref:"editor",staticClass:"margin-bottom10",staticStyle:{height:"700px","overflow-y":"scroll"},model:{value:e.mynote.body,callback:function(t){e.$set(e.mynote,"body",t)},expression:"mynote.body"}})],1):t("div")])},B=[],C=o(5335),M={props:["note","tags"],data(){return{mynote:{},editMode:!0,saveTimeout:null,isMobile:/iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent)}},components:{VueEditor:C.bR},watch:{note(){console.log("this.mynote",this.mynote),console.log("this.note",this.note),this.mynote=Object.assign({},this.note)}},methods:{startSaveTimeout(){null===this.saveTimeout&&(this.saveTimeout=setInterval((()=>{this.mynote.body!==this.note.body&&this.saveNote()}),1e3))},clearSaveTimeout(){clearInterval(this.saveTimeout),this.saveTimeout=null},saveNote(){this.$emit("savenote",{...this.mynote}),this.saveTags()},saveTags(){this.$emit("updatetags",this.mynote.tags)}},mounted(){this.startSaveTimeout()},destroyed(){this.clearSaveTimeout(),this.$emit("")}},F=M,$=(0,N.Z)(F,j,B,!1,null,null,null),P=$.exports;const R={id:1,title:"New Title",body:"content Goes Here",lastSaved:null};var z={data(){return{note:{},notetemp:{},mode:"list",notes:[],tags:[],isMobile:window.isMobile}},components:{SideList:O,Note:P},methods:{changeMode(e){this.mode=e},handleSetNote(e){this.note=e,this.mode="view"},handleAddNote(){var e="id"+Math.random().toString(16).slice(2);this.note={...R,id:e,created:new Date,updated:new Date},this.notes.push({...this.note}),this.saveOrUpdateNote({...this.note})},saveOrUpdateNote(e){console.log("note",e),u(e.id).then((t=>(console.log("obj",t),t?m(e):p(e)))).then((e=>{console.log("done",e)}))},handleSaveNote(e){this.notetemp={...e,created:e.created||new Date,updated:new Date};const t={...this.notetemp};this.notes=this.notes.map((e=>e.id===t.id?t:e)),this.saveOrUpdateNote(t)},storeNotes(){localStorage.setItem("notes",JSON.stringify(this.notes))},async handleRemoveNote(e){console.log("delete note",e,this.notes),this.notes=this.notes.filter((t=>t.id!==e.id)),this.note.id===e.id&&(this.notes.length?this.handleSetNote(this.notes[0]):this.handleAddNote()),await v(e.id)},handleUpdateTags(e){e=[...this.tags,...e],this.tags=[...new Set(e)],localStorage.setItem("tags",JSON.stringify(this.tags))}},async mounted(){try{let e=await g(),t=localStorage.getItem("tags");t&&(this.tags=JSON.parse(t)),e||this.handleAddNote(),this.notes=e,this.notes.length?this.isMobile||this.handleSetNote(this.notes[0]):this.handleAddNote()}catch(e){this.notes=[]}}},U=z,E=(0,N.Z)(U,i,r,!1,null,"5434fb88",null),I=E.exports,L=function(){var e=this,t=e._self._c;return t("div",[t("el-button",{attrs:{round:"",size:"medium"},on:{click:e.backup}},[t("i",{staticClass:"el-icon-download"}),e._v(" Backup")]),t("input",{ref:"fileInput",staticStyle:{display:"none"},attrs:{type:"file"},on:{change:e.uploadBackup}}),e._v("  "),t("el-popover",{attrs:{placement:"top",width:"160"},model:{value:e.visible,callback:function(t){e.visible=t},expression:"visible"}},[t("p",[e._v("Are you sure to Restore this?")]),t("div",{staticStyle:{"text-align":"right",margin:"0"}},[t("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(t){e.visible=!1}}},[e._v("cancel")]),t("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){e.openFileInput(),e.visible=!1}}},[e._v("confirm")])],1),t("el-button",{attrs:{slot:"reference",round:"",size:"medium"},slot:"reference"},[t("i",{staticClass:"el-icon-upload"}),e._v("  Restore")])],1)],1)},J=[],Z={data(){return{visible:!1}},methods:{async backup(){const e=await g(),t=JSON.parse(window.localStorage.getItem("tags")),o=new Blob([JSON.stringify({notes:e,tags:t})],{type:"application/json"}),n=URL.createObjectURL(o),s=document.createElement("a");s.href=n,s.download="noteapp.sunilmore.json",document.body.appendChild(s),s.click(),document.body.removeChild(s)},async uploadBackup(){const e=this.$refs.fileInput.files[0];if(!e)return;const t=new FileReader;t.onload=async()=>{try{const{notes:e,tags:o}=JSON.parse(t.result);console.log("notes",e),console.log("tags",o),Array.isArray(e)&&await Promise.all(e.map((e=>h(e)))),Array.isArray(o)&&window.localStorage.setItem("tags",JSON.stringify(o)),alert("Restore done"),window.location.reload()}catch(e){console.error(e),alert("Something went wrong whiel doing restore")}},t.readAsText(e)},openFileInput(){this.$refs.fileInput.click()}}},V=Z,W=(0,N.Z)(V,L,J,!1,null,null,null),q=W.exports,H={name:"App",data(){return{dialogVisible:!1}},components:{DashBoard:I,BackupRestore:q}},Y=H,G=(0,N.Z)(Y,s,a,!1,null,null,null),X=G.exports,K=o(4337);(0,K.z)("/service-worker.js",{ready(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered(){console.log("Service worker has been registered.")},cached(){console.log("Content has been cached for offline use.")},updatefound(){console.log("New content is downloading.")},updated(){console.log("New content is available; please refresh.")},offline(){console.log("No internet connection found. App is running in offline mode.")},error(e){console.error("Error during service worker registration:",e)}});var Q=o(5114),ee=o.n(Q),te=o(8596);n["default"].use(ee(),{locale:te.Z}),n["default"].config.productionTip=!1,new n["default"]({render:e=>e(X)}).$mount("#app")}},t={};function o(n){var s=t[n];if(void 0!==s)return s.exports;var a=t[n]={exports:{}};return e[n].call(a.exports,a,a.exports,o),a.exports}o.m=e,function(){var e=[];o.O=function(t,n,s,a){if(!n){var i=1/0;for(d=0;d<e.length;d++){n=e[d][0],s=e[d][1],a=e[d][2];for(var r=!0,l=0;l<n.length;l++)(!1&a||i>=a)&&Object.keys(o.O).every((function(e){return o.O[e](n[l])}))?n.splice(l--,1):(r=!1,a<i&&(i=a));if(r){e.splice(d--,1);var c=s();void 0!==c&&(t=c)}}return t}a=a||0;for(var d=e.length;d>0&&e[d-1][2]>a;d--)e[d]=e[d-1];e[d]=[n,s,a]}}(),function(){o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,{a:t}),t}}(),function(){o.d=function(e,t){for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}}(),function(){o.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){var e={143:0};o.O.j=function(t){return 0===e[t]};var t=function(t,n){var s,a,i=n[0],r=n[1],l=n[2],c=0;if(i.some((function(t){return 0!==e[t]}))){for(s in r)o.o(r,s)&&(o.m[s]=r[s]);if(l)var d=l(o)}for(t&&t(n);c<i.length;c++)a=i[c],o.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return o.O(d)},n=self["webpackChunknote_app"]=self["webpackChunknote_app"]||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var n=o.O(void 0,[998],(function(){return o(5912)}));n=o.O(n)})();
//# sourceMappingURL=app.1104c615.js.map