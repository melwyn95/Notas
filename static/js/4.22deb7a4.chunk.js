(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{569:function(e,t,n){},572:function(e,t,n){"use strict";n.r(t);var r=n(20),a=n(0),o=n.n(a),c=n(44),l=n(25),u=n(23),i=n(471),s=n(470),d=n.n(s),b=n(537),m=n.n(b),f=n(540),p=n.n(f),v=n(541),k=n.n(v),E=n(538),g=n.n(E),j=n(539),C=n.n(j),h=n(35),y=n.n(h),w=function(e){var t=e.onClick,n=e.color;return o.a.createElement("div",{className:"container--circle-icon",style:{marginRight:10},onClick:t},o.a.createElement("div",{style:{borderRadius:"50%",backgroundColor:n,height:12,width:12}}))},O=n(46),N=function(e){var t=e.note,n=e.setNote,r=Object(a.useContext)(u.a).idb,c=O.b.filter(function(e){return e.label!==t.color});return o.a.createElement(y.a,{style:{display:"flex",padding:5}},c.map(function(e){return o.a.createElement(w,{key:e.label,color:e.circleColor,onClick:function(){return a=e.label,Object(l.i)(l.a.operation,{idb:r,setNote:n,note:t,color:a});var a}})}))},x=function(e){return{fontSize:25,color:Object(O.c)(e,"optionColor")}},B=function(e){var t=e.anchorEl,n=e.iconClick,r=e.backButtonClick,c=e.doneButtonClick,l=e.noteColor,u=e.note,s=e.setNote,b=e.editorRef,f=Object(a.useCallback)(function(e){e.preventDefault(),b.current.undo()},[]),v=Object(a.useCallback)(function(e){e.preventDefault(),b.current.redo()},[]);return o.a.createElement("div",{className:"container--header-toolbar"},o.a.createElement(m.a,{style:x(l),onClick:r}),o.a.createElement(w,{color:Object(O.c)(l,"circleColor"),onClick:function(e){return n(e,"change_color")}}),o.a.createElement(g.a,{style:Object(i.a)({},x(l),{marginRight:10}),onClick:f}),o.a.createElement(C.a,{style:Object(i.a)({},x(l),{marginRight:10}),onClick:v}),o.a.createElement(p.a,{style:Object(i.a)({},x(l),{marginRight:10,marginLeft:5}),onClick:c}),o.a.createElement(k.a,{style:x(l)}),o.a.createElement(d.a,{open:Boolean(t),anchorEl:t,placement:"bottom"},o.a.createElement(N,{note:u,setNote:s}),"s"))},R=n(179),S=n(570),q=n(181),D=n(83),I=n(562),M=n.n(I),P=n(563),z=n.n(P),T=n(564),V=n.n(T),_=n(565),F=n.n(_),J=n(566),L=n.n(J),H=n(567),K=n.n(H),A=n(568),G=n.n(A),Q="block-quote",U=["bold","italic","underlined"],W=["bold","italic","underlined","heading-two",Q,"bulleted-list","numbered-list"],X=n(561),Y={fontSize:20},Z=Object(i.a)({color:"#000"},Y),$=function(e,t){return t.blocks.some(function(t){return t.type===e})},ee=function(e,t,n){var r=t?function(e,t){return t.activeMarks.some(function(t){return t.type===e})}(e,n):$(e,n);if(["numbered-list","bulleted-list"].includes(e)){var a=n.document,c=n.blocks;if(c.size>0){var l=a.getParent(c.first().key);r=$("list-item",n)&&l&&l.type===e}}switch(e){case"bold":return o.a.createElement(M.a,{style:r?Z:Y});case"italic":return o.a.createElement(z.a,{style:r?Z:Y});case"underlined":return o.a.createElement(V.a,{style:r?Z:Y});case"heading-two":return o.a.createElement(F.a,{style:r?Z:Y});case Q:return o.a.createElement(L.a,{style:r?Z:Y});case"bulleted-list":return o.a.createElement(K.a,{style:r?Z:Y});case"numbered-list":return o.a.createElement(G.a,{style:r?Z:Y});default:return null}},te=function(e){var t=e.value,n=e.editorRef,r=e.note,c=Object(a.useMemo)(function(){return Object(O.c)(r.color,"circleColor")},[r]);return o.a.createElement(y.a,{style:{display:"flex",justifyContent:"space-around",boxShadow:"none",margin:"5px 0"}},W.map(function(e){return o.a.createElement(X.a,{key:e,style:{padding:10},onClick:function(t){return U.includes(e)?(r=e,t.preventDefault(),void n.current.toggleMark(r)):function(e,t){if(e.preventDefault(),n.current){var r=n.current.value,a=r.document;if("bulleted-list"!==t&&"numbered-list"!==t){var o=$(t,r);$("list-item",r)?n.current.setBlocks(o?"paragraph":t).unwrapBlock("bulleted-list").unwrapBlock("numbered-list"):n.current.setBlocks(o?"paragraph":t)}else{var c=$("list-item",r),l=r.blocks.some(function(e){return!!a.getClosest(e.key,function(e){return e.type===t})});c&&l?n.current.setBlocks("paragraph").unwrapBlock("bulleted-list").unwrapBlock("numbered-list"):c?n.current.unwrapBlock("bulleted-list"===t?"numbered-list":"bulleted-list").wrapBlock(t):n.current.setBlocks("list-item").wrapBlock(t)}}}(t,e);var r}},ee(e,U.includes(e),t))}),o.a.createElement("style",{dangerouslySetInnerHTML:{__html:"\n                    blockquote {\n                        border-left: 2px solid ".concat(c,";\n                    }\n                ")}}))},ne=Object(R.debounce)(function(e,t,n,r){Object(l.i)(l.h.operation,{idb:e,value:t,note:n,setNote:r})},600),re=function(e){var t=e.editorRef,n=e.value,r=e.setValue,c=e.note,l=e.wordCount,i=e.setNote,s=Object(a.useContext)(u.a).idb;return o.a.createElement(o.a.Fragment,null,o.a.createElement(te,{value:n,editorRef:t,note:c}),o.a.createElement("div",{className:"container--info"},o.a.createElement(q.a,{className:"text-view-content"},Object(D.a)(c.lastModifiedTimestamp)),o.a.createElement(q.a,{className:"text-view-content--separator"},"|"),o.a.createElement(q.a,{className:"text-view-content"},"".concat(l," words"))),o.a.createElement(S.a,{spellCheck:!0,autoFocus:!0,style:{height:"calc(100% - 50px)",padding:"5px",boxSizing:"border-box",overflow:"auto"},placeholder:"Enter your note...",ref:function(e){return t.current=e},value:n,onChange:function(e){var t=e.value;ne(s,t,c,i),r(t)},onKeyDown:function(e,t,n){return n()},renderNode:function(e,t,n){var r=e.attributes,a=e.children;switch(e.node.type){case"block-quote":return o.a.createElement("blockquote",r,a);case"bulleted-list":return o.a.createElement("ul",r,a);case"heading-two":return o.a.createElement("h2",r,a);case"list-item":return o.a.createElement("li",r,a);case"numbered-list":return o.a.createElement("ol",r,a);default:return n()}},renderMark:function(e,t,n){var r=e.children,a=e.mark,c=e.attributes;switch(a.type){case"bold":return o.a.createElement("strong",c,r);case"italic":return o.a.createElement("em",c,r);case"underlined":return o.a.createElement("u",c,r);default:return n()}}}))},ae=n(39),oe=n(180),ce=Object(oe.a)("\n    export function wordCount(noteId) {\n            \n        return new Promise(function (resolve, reject) {\n            \n            var openRequest = indexedDB.open('notas', 1);\n\n            var dbPromise = new Promise(function (resolve1, reject1) {\n                openRequest.onsuccess = function(e) {\n                    resolve1(e.target.result);\n                };\n            }).then(function (db) {\n                var transaction = db.transaction(['notes'], 'readonly');\n                var store = transaction.objectStore('notes');\n\n                var getRequest = store.get(noteId);\n                getRequest.onsuccess = function (e) {\n                    var note = e.target.result;\n                    var words = note.content.split(/\\s+/g).filter(w => w !== '');\n                    resolve(words.length);\n                }\n                getRequest.onerror = function (e) { reject(e.target.result); };\n            });\n        });\n\n    }\n");n(569),t.default=Object(c.f)(function(e){var t=e.match,n=e.history,c=Object(a.useContext)(u.a).idb,i=Object(a.useState)(null),s=Object(r.a)(i,2),d=s[0],b=s[1],m=Object(a.useState)(null),f=Object(r.a)(m,2),p=f[0],v=f[1],k=Object(a.useState)(null),E=Object(r.a)(k,2),g=E[0],j=E[1],C=Object(a.useState)(-1),h=Object(r.a)(C,2),y=h[0],w=h[1],N=Object(a.useCallback)(function(e,t){e.stopPropagation(),j(e.currentTarget)},[]),x=Object(a.useCallback)(function(){return j(null)},[]),R=Object(a.useCallback)(function(){return n.replace("/folder/".concat(d.folderId))},[d&&d.folderId]),S=Object(a.useCallback)(function(){Object(l.i)(l.h.operation,{idb:c,note:d,value:p}),n.replace("/")},[d,p]);Object(a.useEffect)(function(){var e=t.params.id;Object(l.i)(l.f.operation,{idb:c,setNote:b,setValue:v,noteId:e})},[]),Object(a.useEffect)(function(){d&&ce.wordCount(d.id).then(function(e){w(e)})},[d]);var q=Object(a.useRef)();return d?o.a.createElement("div",{className:"container--note-page",style:{backgroundColor:Object(O.c)(d.color,"value")},onClick:x},o.a.createElement(B,{anchorEl:g,iconClick:N,backButtonClick:R,doneButtonClick:S,noteColor:d.color,note:d,setNote:b,editorRef:q}),o.a.createElement("div",{className:"container--note-body"},o.a.createElement(re,{value:p,setValue:v,editorRef:q,note:d,setNote:b,wordCount:y}))):o.a.createElement(ae.a,null)})}}]);
//# sourceMappingURL=4.22deb7a4.chunk.js.map