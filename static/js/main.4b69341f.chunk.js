(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{181:function(e,t,n){"use strict";var r=n(0),o=n.n(r);t.a=function(e){var t=e.children,n=e.style,r=e.className;return o.a.createElement("span",{style:n,className:r},t)}},187:function(e){e.exports={document:{nodes:[{object:"block",type:"paragraph",nodes:[]}]}}},221:function(e,t,n){e.exports=n(469)},226:function(e,t,n){},23:function(e,t,n){"use strict";var r=n(0),o=Object(r.createContext)();t.a=o},25:function(e,t,n){"use strict";n.d(t,"b",function(){return u}),n.d(t,"d",function(){return d}),n.d(t,"c",function(){return p}),n.d(t,"g",function(){return f}),n.d(t,"f",function(){return m}),n.d(t,"a",function(){return b}),n.d(t,"h",function(){return h}),n.d(t,"e",function(){return v});var r=n(6),o=n.n(r),a=n(16),c=n(43),s=n(84),i=n(187),l=n(46),u={operation:"create_note"},d={operation:"get_all_notes"},p={operation:"delete_notes"},f={operation:"move_notes"},m={operation:"get_note_by_id"},b={operation:"change_note_color"},h={operation:"save_note"},v={operation:"get_notes_by_ids"},w=function(){var e=Object(a.a)(o.a.mark(function e(t,n,r){var a,c,s;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.transaction("folders","readonly"),c=a.objectStore("folders"),e.next=4,c.get(n);case 4:s=e.sent,r(s);case 6:case"end":return e.stop()}},e,this)}));return function(t,n,r){return e.apply(this,arguments)}}();t.i=function(e,t){switch(e){case u.operation:var n=t.idb,r=t.openedFolder,O=t.setOpenedFolder,j=t.changeRoute,g=(new Date).getTime();n.then(function(){var e=Object(a.a)(o.a.mark(function e(t){var n,a,c,s;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.transaction(["notes","folders"],"readwrite"),a=n.objectStore("notes"),c=n.objectStore("folders"),e.next=5,c.get(r.id);case 5:return(s=e.sent).count+=1,c.put(s),a.add({color:l.a.label,content:"",previewContent:"",structuredContent:i,heading:"",folderId:r.id,creationTimestamp:g,lastModifiedTimestamp:g}),e.abrupt("return",n.complete);case 10:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()).then(function(){O(r),n.then(function(){var e=Object(a.a)(o.a.mark(function e(t){var n,r,a,c;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.transaction(["notes"],"readonly"),r=n.objectStore("notes"),a=r.index("notesCreationTimestamp"),e.next=5,a.get(g);case 5:c=e.sent,j(c.id);case 7:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}())});break;case d.operation:var E=t.idb,x=t.openedFolder,y=t.setFetching,k=t.setNotes,S=[];x&&E.then(function(e){y(!0);var t=e.transaction("notes","readonly").objectStore("notes").index("notesFolderId"),n=IDBKeyRange.only(x.id);return 1===x.id&&(n=void 0),t.openCursor(n)}).then(function e(t){if(t){if(2===t.value.folderId&&2!==x.id)return t.continue().then(e);var n=t.value;return S.push(n),t.continue().then(e)}}).then(function(){k(S),y(!1)});break;case p.operation:var C=t.idb,F=t.selection,N=t.openedFolder,I=t.setOpenedFolder;C.then(function(){var e=Object(a.a)(o.a.mark(function e(t){var n,r,c,s,i,l;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=(new Date).getTime(),r=t.transaction(["notes","folders"],"readwrite"),c=r.objectStore("notes"),s=r.objectStore("folders"),e.next=6,s.get(2);case 6:return i=e.sent,2===N.id?(F.map(function(e){return c.delete(e)}),i.count-=F.length):(l={},Promise.all(F.map(function(){var e=Object(a.a)(o.a.mark(function e(t){var n;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c.get(+t);case 2:n=e.sent,l[n.folderId]?l[n.folderId]+=1:l[n.folderId]=1,n.folderId=2,c.put(n);case 6:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}())).then(function(){l[1]=F.length,Object.keys(l).map(function(){var e=Object(a.a)(o.a.mark(function e(t){var r;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s.get(+t);case 2:(r=e.sent).count-=l[t],r.timestamp=n,s.put(r);case 6:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()),i.count+=F.length,i.timestamp=n,s.put(i)})),e.abrupt("return",r.complete);case 9:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()).then(function(){C.then(function(e){return w(e,N.id,I)})});break;case f.operation:var D=t.idb,T=t.selection,_=t.openedFolder,P=t.setOpenedFolder,R=t.moveToFolderId;D.then(function(){var e=Object(a.a)(o.a.mark(function e(t){var n,r,c,s,i,l;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=(new Date).getTime(),r=t.transaction(["folders","notes"],"readwrite"),c=r.objectStore("notes"),s=r.objectStore("folders"),i={},e.next=7,s.get(+R);case 7:return l=e.sent,e.next=10,Promise.all(T.map(function(){var e=Object(a.a)(o.a.mark(function e(t){var n;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c.get(+t);case 2:return n=e.sent,i[n.folderId]?i[n.folderId]+=1:i[n.folderId]=1,n.folderId=l.id,e.abrupt("return",c.put(n));case 6:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()));case 10:return 2===+R?i[1]=T.length:delete i[1],e.next=13,Promise.all(Object.keys(i).map(function(){var e=Object(a.a)(o.a.mark(function e(t){var r;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s.get(+t);case 2:return(r=e.sent).count-=i[t],r.timestamp=n,e.abrupt("return",s.put(r));case 6:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()));case 13:return l.count+=T.length,l.timestamp=n,s.put(l),e.abrupt("return",r.complete);case 17:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()).then(function(){D.then(function(e){return w(e,_.id,P)})});break;case m.operation:var z=t.noteId,A=t.idb,M=t.setNote,B=t.setValue;return A.then(function(){var e=Object(a.a)(o.a.mark(function e(t){var n,r,a;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.transaction(["notes"],"readonly"),r=n.objectStore("notes"),e.next=4,r.get(Number.parseInt(z));case 4:a=e.sent,B(c.m.fromJSON(a.structuredContent)),M(a);case 7:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}());case b.operation:var J=t.note,H=t.idb,L=t.setNote,W=t.color;return H.then(function(){var e=Object(a.a)(o.a.mark(function e(t){var n,r,a;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.transaction(["notes"],"readwrite"),r=n.objectStore("notes"),e.next=4,r.get(J.id);case 4:return(a=e.sent).color=W,r.put(a),e.abrupt("return",n.complete);case 8:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()).then(function(){H.then(function(){var e=Object(a.a)(o.a.mark(function e(t){var n,r,a;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.transaction(["notes"],"readwrite"),r=n.objectStore("notes"),e.next=4,r.get(J.id);case 4:a=e.sent,L(a);case 6:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}())});case h.operation:var V=t.idb,q=t.note,K=q.id,U=q.folderId,$=t.value,G=t.setNote,Q=s.a.serialize($);return V.then(function(){var e=Object(a.a)(o.a.mark(function e(t){var n,r,a,c,s,i;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.transaction(["notes","folders"],"readwrite"),r=n.objectStore("notes"),a=n.objectStore("folders"),e.next=5,r.get(K);case 5:return c=e.sent,e.next=8,a.get(U);case 8:return s=e.sent,i=(new Date).getTime(),c.content=Q,c.previewContent=Q.substr(0,80),c.structuredContent=$.toJSON(),c.lastModifiedTimestamp=i,s.timestamp=i,r.put(c),a.put(s),e.abrupt("return",n.complete);case 18:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()).then(function(){V.then(function(){var e=Object(a.a)(o.a.mark(function e(t){var n,r,a;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.transaction(["notes"],"readonly"),r=n.objectStore("notes"),e.next=4,r.get(K);case 4:a=e.sent,G(a);case 6:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}())});case v.operation:var X=t.idb,Y=t.noteIds,Z=t.setNotes;return X.then(function(e){var t=e.transaction(["notes"],"readonly").objectStore("notes");Promise.all(Y.map(function(e){return t.get(e)})).then(function(e){return Z(e)})});default:console.log("INVALID_OPERATION")}}},287:function(e,t,n){},39:function(e,t,n){"use strict";var r=n(0),o=n.n(r),a=n(21),c=n(125),s=n.n(c);t.a=Object(a.withStyles)(function(e){return{root:{color:"#969696"}}})(function(e){var t=e.classes;return o.a.createElement("div",{style:{width:"100%",height:"50vh",display:"flex",justifyContent:"center",alignItems:"center"}},o.a.createElement(s.a,Object.assign({className:t.root},e)))})},46:function(e,t,n){"use strict";n.d(t,"a",function(){return r}),n.d(t,"c",function(){return a});var r={label:"white",value:"#f5f5f5",circleColor:"#e0e0e0",optionColor:"#fbc02d"},o=[r,{label:"red",value:"#ef9a9a",circleColor:"#ef5350",optionColor:"#ef5350"},{label:"green",value:"#a5d6a7",circleColor:"#43a047",optionColor:"#43a047"},{label:"blue",value:"#90caf9",circleColor:"#1e88e5",optionColor:"#1e88e5"},{label:"yellow",value:"#fff59d",circleColor:"#fbc02d",optionColor:"#fbc02d"}],a=function(e,t){var n=o.filter(function(t){return t.label===e})[0];return n?n[t]:r.value};t.b=o},469:function(e,t,n){"use strict";n.r(t);var r=n(0),o=n.n(r),a=n(24),c=n.n(a),s=(n(226),n(182)),i=n(183),l=n(201),u=n(184),d=n(202),p=n(57),f=n(44),m=n(20),b=n(131),h=n.n(b),v=n(39),w=(n(287),n(23)),O=n(83),j={operation:"delete",label:"Delete"},g={operation:"move",label:"Move"},E={operation:"restore",label:"Restore"},x=n(25),y=n(6),k=n.n(y),S=n(16),C={label:"Rename",operation:"open_rename_folder_modal"},F={label:"Delete",operation:"open_delete_folder_modal"},N="open_create_folder_modal",I={operation:"rename_folder"},D="delete_folder",T={operation:"create_foler"},_="get_all_notes_folder",P="get_all_folders",R=[C,F],z=function(){var e=Object(S.a)(k.a.mark(function e(t,n,r){var o,a,c,s,i,l,u,d,p,f,m,b,h,v,w,O,j,g,E,x,y;return k.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:e.t0=t,e.next=e.t0===C.operation?3:e.t0===F.operation?6:e.t0===I.operation?9:e.t0===D?12:e.t0===N?15:e.t0===T.operation?19:e.t0===_?22:e.t0===P?25:28;break;case 3:return(0,r.setOpen)(I.operation),e.abrupt("break",29);case 6:return(0,r.setOpen)(D),e.abrupt("break",29);case 9:return o=r.setOpenedFolder,a=r.idb,c=r.value,s=r.close,i=r.setSnackError,a.then(function(){var e=Object(S.a)(k.a.mark(function e(t){var r,o,a;return k.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.transaction("folders","readwrite"),o=r.objectStore("folders"),e.next=4,o.get(n);case 4:return(a=e.sent).name=c,a.timestamp=(new Date).getTime(),o.put(a),e.abrupt("return",r.complete);case 9:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()).then(function(){a.then(function(){var e=Object(S.a)(k.a.mark(function e(t){var r,a,c;return k.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.transaction("folders","readonly"),a=r.objectStore("folders"),e.next=4,a.get(n);case 4:c=e.sent,o(c),s();case 7:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}())}).catch(function(){i("A folder with the same name already exists.")}),e.abrupt("break",29);case 12:return l=r.setOpenedFolder,(u=r.idb).then(function(e){var t=e.transaction("folders","readwrite");return t.objectStore("folders").delete(n),t.complete}).then(function(){u.then(function(){var e=Object(S.a)(k.a.mark(function e(t){var n,r,o;return k.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.transaction("folders","readonly"),r=n.objectStore("folders"),e.next=4,r.get(1);case 4:o=e.sent,l(o);case 6:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}())}),e.abrupt("break",29);case 15:return d=r.setShowDropdown,p=r.setOpen,d(!1),p(T.operation),e.abrupt("break",29);case 19:return f=r.idb,m=r.setOpenedFolder,b=r.value,h=r.close,v=r.setSnackError,f.then(function(e){var t=e.transaction("folders","readwrite"),n=t.objectStore("folders"),r=(new Date).getTime();return n.add({name:b,count:0,timestamp:r}),t.complete}).then(function(){f.then(function(){var e=Object(S.a)(k.a.mark(function e(t){var n,r,o,a;return k.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.transaction("folders","readonly"),r=n.objectStore("folders"),o=r.index("folderNames"),e.next=5,o.get(b);case 5:a=e.sent,m(a),h();case 8:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}())}).catch(function(){v("A folder with the same name already exists.")}),e.abrupt("break",29);case 22:return w=r.idb,O=r.setOpenedFolder,w.then(function(){var e=Object(S.a)(k.a.mark(function e(t){var r,o,a;return k.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.transaction("folders","readonly"),o=r.objectStore("folders"),e.next=4,o.get(n);case 4:a=e.sent,O(a);case 6:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()),e.abrupt("break",29);case 25:return j=r.idb,g=r.setFolders,E=r.foldersToExclude,x=void 0===E?[]:E,y=[],e.abrupt("return",j.then(function(e){return e.transaction("folders","readonly").objectStore("folders").openCursor()}).then(function e(t){if(t){if(x.includes(t.value.id))return t.continue().then(e);var n=t.value;return y.push(n),t.continue().then(e)}}).then(function(){g(y)}));case 28:console.log("INVALID_OPERATION");case 29:case"end":return e.stop()}},e,this)}));return function(t,n,r){return e.apply(this,arguments)}}(),A=n(188),M=n(56),B=n.n(M),J=n(85),H=n.n(J),L=n(189),W=n.n(L),V=n(33),q=n.n(V),K=n(21),U={padding:"0 12px"},$=Object(K.withStyles)(function(e){return{heading:{lineHeight:"42px",fontSize:"16px",fontWeight:700}}})(function(e){var t=e.selection,n=e.setSelection,a=e.clearDropDown,c=e.notes,s=e.classes,i=Object(r.useCallback)(function(){n([])},[]),l=Object(r.useCallback)(function(){t.length===c.length?n([]):n(c.map(function(e){return e.id}))},[t]);Object(r.useEffect)(function(){return a()},[]);var u=Object(r.useMemo)(function(){return c.length===t.length},[t]);return o.a.createElement("div",{className:"container--selectionn-header"},o.a.createElement(q.a,{style:U,onClick:i},o.a.createElement(H.a,null)),o.a.createElement(B.a,{component:"h2",className:s.heading},1===t.length?"1 item selected":"".concat(t.length," items selected")),o.a.createElement(q.a,{style:U,onClick:l},o.a.createElement(W.a,{style:u?{color:"#1e88e5"}:{}})))}),G=n(30),Q=n.n(G),X=n(126),Y=n.n(X),Z=n(127),ee=n.n(Z),te=n(81),ne=n.n(te),re=Object(f.f)(function(e){var t=e.folders,n=e.setShowDropdown,a=e.openedFolder,c=e.setOpen,s=e.show,i=e.history;return!t&&s?o.a.createElement(v.a,null):o.a.createElement("div",{className:"container--list-item",style:s?{}:{maxHeight:0,opacity:0}},s&&t.map(function(e){return o.a.createElement(r.Fragment,{key:"list-item-".concat(e.id)},o.a.createElement("div",{className:"list-item",onClick:function(){return function(e,t){return t.push("/folder/".concat(e.id))}(e,i)}},o.a.createElement("div",{className:"list-item-label ".concat(a.id===e.id?"list-item-label__bold":"")},e.name),o.a.createElement("div",{className:"list-item-label ".concat(a.id===e.id?"list-item-label__bold":"")},e.count)),o.a.createElement("div",{className:"separator"}))}),s&&o.a.createElement("div",{className:"list-item",key:"new-folder",onClick:function(){z(N,void 0,{setShowDropdown:n,setOpen:c})}},o.a.createElement("div",{className:"new-folder-container"},o.a.createElement("div",{className:"plus-icon"},"+"),"New Folder")))}),oe=n(35),ae=n.n(oe),ce=n(80),se=n.n(ce),ie=Object(K.withStyles)(function(e){return{root:{height:150,width:250},rootTextField:{backgroundColor:"#eee"}}})(function(e){var t=e.classes,n=e.openedFolder,a=e.close,c=e.setOpenedFolder,s=e.create,i=e.setSnackError,l=s?"New Folder":"Rename Folder",u=s&&T.operation||I.operation,d=Object(r.useContext)(w.a).idb,p=Object(r.useState)(s?"Unnamed Folder":n.name),f=Object(m.a)(p,2),b=f[0],h=f[1];return o.a.createElement(ae.a,{className:t.root},o.a.createElement("div",null,l),o.a.createElement(se.a,{value:b,className:t.rootTextField,InputProps:{classes:{root:t.rootTextField,focused:t.rootTextField}},onChange:function(e){return h(e.target.value)},variant:"outlined"}),o.a.createElement(Q.a,{onClick:function(){z(u,n.id,{setOpenedFolder:c,idb:d,value:b,close:a,setSnackError:i})}},"Ok"),o.a.createElement(Q.a,{onClick:a}," Cancel"))}),le=Object(K.withStyles)(function(e){return{root:{height:150,width:250}}})(function(e){var t=e.classes,n=e.close,a=e.openedFolder,c=e.setOpenedFolder,s=Object(r.useContext)(w.a).idb;return o.a.createElement(ae.a,{className:t.root},o.a.createElement("div",null,"Delete Folder"),o.a.createElement("div",null,"Delete ".concat(a.name," ?")),o.a.createElement(Q.a,{onClick:function(){z(D,a.id,{setOpenedFolder:c,idb:s}),n()}},"Delete"),o.a.createElement(Q.a,{onClick:n},"Cancel"))}),ue=function(e){var t=e.setShowDropdown,n=e.showDropdown,r=e.openedFolder.name;return o.a.createElement("div",{className:"container--dropdown"},o.a.createElement(Q.a,{onClick:function(e){e.stopPropagation(),t(!n)}},o.a.createElement("div",{className:"dropdown-content"},o.a.createElement("div",{className:"dropdown-text"},r),o.a.createElement("div",{className:n?"dropdown-icon dropdown-icon-rotate":"dropdown-icon"}))))},de=function(e){var t=e.showDropdown,n=e.setShowDropdown,r=e.setAnchorEl;return function(e,t){return!e&&t&&!t.systemFolder}(t,e.openedFolder)&&o.a.createElement("div",{className:"container--more-options",style:t?{}:{maxHeight:0}},o.a.createElement(q.a,{onClick:function(e){e.stopPropagation(),r(e.currentTarget),n(!1)}},o.a.createElement("div",{className:"more-options"})))},pe=function(e){var t=e.anchorEl,n=e.setAnchorEl,r=e.openedFolder,a=e.setOpen,c=e.close;return o.a.createElement(Y.a,{anchorEl:t,open:Boolean(t),onClose:function(e){return n(null)}},R.map(function(e){return o.a.createElement(ee.a,{key:e.operation,style:{fontSize:14},onClick:function(t){z(e.operation,r.id,{setOpen:a,close:c})}},e.label)}))},fe=function(e){var t=e.openedFolder,n=e.setOpenedFolder,a=e.setSnackError,c=e.showDropdown,s=e.setShowDropdown,i=Object(r.useState)([]),l=Object(m.a)(i,2),u=l[0],d=l[1],p=Object(r.useState)(null),f=Object(m.a)(p,2),b=f[0],h=f[1],v=Object(r.useContext)(w.a).idb,O=Object(r.useState)(null),j=Object(m.a)(O,2),g=j[0],E=j[1],x=Object(r.useCallback)(function(){E(!1),h(null)},[]);return Object(r.useEffect)(function(){z(P,void 0,{idb:v,setFolders:d})},[t]),o.a.createElement(r.Fragment,null,o.a.createElement("div",{className:"container--header"},o.a.createElement(ue,{setShowDropdown:s,showDropdown:c,openedFolder:t}),o.a.createElement(de,{showDropdown:c,setShowDropdown:s,setAnchorEl:h,openedFolder:t}),o.a.createElement(pe,{anchorEl:b,setAnchorEl:h,openedFolder:t,setOpen:E,close:x})),o.a.createElement(re,{folders:u,setShowDropdown:s,setOpen:E,openedFolder:t,show:c}),o.a.createElement(ne.a,{open:Boolean(g),onClose:x},[I.operation,T.operation].includes(g)?o.a.createElement(ie,{openedFolder:t,close:x,setOpenedFolder:n,create:g===T.operation,setSnackError:a}):o.a.createElement(le,{openedFolder:t,close:x,setOpenedFolder:n})))},me=function(e){var t=e.selection,n=e.notes,r=e.setSelection,a=e.clearDropDown,c=Object(A.a)(e,["selection","notes","setSelection","clearDropDown"]);return t.length?o.a.createElement($,{selection:t,setSelection:r,clearDropDown:a,notes:n}):o.a.createElement(fe,c)},be=n(179),he=n(192),ve=n.n(he),we=n(117),Oe=n.n(we),je=n(180),ge=Object(je.a)("\n    export function search(folderId, searchText) {\n            \n        return new Promise(function (resolve, reject) {\n            \n            var openRequest = indexedDB.open('notas', 1);\n\n            var dbPromise = new Promise(function (resolve1, reject1) {\n                openRequest.onsuccess = function(e) {\n                    resolve1(e.target.result);\n                };\n            }).then(function (db) {\n                var transaction = db.transaction(['notes'], 'readonly');\n                var store = transaction.objectStore('notes');\n                var index = store.index('notesFolderId');\n                var keyRange = folderId !== 1 ? IDBKeyRange.only(folderId) : undefined;\n                var filteredNoteIds = [];\n\n                var cursorPromise = new Promise(function (resolve2, reject2) {\n                    index.openCursor(keyRange).onsuccess = function (event) {\n                        var cursor = event.target.result;\n                        if(cursor) {\n                            var note = cursor.value;\n                            if (note.content.indexOf(searchText) >= 0) {\n                                filteredNoteIds.push(note.id)\n                            }\n                            cursor.continue();\n                        } else {\n                            resolve(filteredNoteIds);\n                        }\n                    };\n                });\n                \n            });\n        });\n    }\n"),Ee=Object(be.debounce)(function(){var e=Object(S.a)(k.a.mark(function e(t,n,r,o){var a;return k.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,ge.search(t,n);case 2:a=e.sent,Object(x.i)(x.e.operation,{idb:r,noteIds:a,setNotes:o});case 4:case"end":return e.stop()}},e,this)}));return function(t,n,r,o){return e.apply(this,arguments)}}(),400),xe=Object(K.withStyles)(function(e){return{root:{maxHeight:30,width:"100%",background:"#dcdcdc",borderRadius:"5px"},notchedOutline:{border:0},marginRight:{marginRight:"-20px"},marginLeft:{marginLeft:"-15px"},fontSize:{fontSize:"12px"}}})(function(e){var t=e.classes,n=e.openedFolder,a=e.setNotes,c=Object(r.useContext)(w.a).idb,s=Object(r.useState)(""),i=Object(m.a)(s,2),l=i[0],u=i[1],d=Object(r.useCallback)(function(){Ee(n.id,"",c,a),u("")},[n]);return o.a.createElement("div",{className:"container--search-bar"},o.a.createElement(se.a,{className:t.root,style:{fontSize:17},value:l,placeholder:"Search notes",onChange:function(e){Ee(n.id,e.target.value,c,a),u(e.target.value)},variant:"outlined",InputProps:{startAdornment:o.a.createElement(Oe.a,{position:"start"},o.a.createElement(q.a,{className:t.marginLeft},o.a.createElement(ve.a,{style:{fontSize:"17px"}}))),endAdornment:Boolean(l)&&o.a.createElement(Oe.a,{position:"end"},o.a.createElement(q.a,{className:t.marginRight,onClick:d},o.a.createElement(H.a,{style:{fontSize:"17px"}}))),classes:{input:t.fontSize,notchedOutline:t.notchedOutline}}}))}),ye=n(200),ke=n(128),Se=n.n(ke),Ce=n(129),Fe=n.n(Ce),Ne=n(193),Ie=n.n(Ne),De=n(194),Te=n.n(De),_e=n(181),Pe=n(46),Re=function(e){var t=e.color;return{backgroundColor:Object(Pe.c)(t,"value"),position:"relative"}},ze=Object(K.withStyles)(function(e){return{root:{height:"180px",width:"140px",boxSizing:"border-box",padding:"10px",margin:"5px"},content:{color:"#555",fontSize:"14px",textOverflow:"ellipsis",overflow:"hidden",height:"calc(100% - 35px)"}}})(function(e){var t=e.note,n=e.note.previewContent,a=e.classes,c=e.selection,s=e.setSelection,i=e.history,l=Object(r.useMemo)(function(){return c.includes(t.id)},[c,t.id]),u=Object(r.useCallback)(function(e){e.stopPropagation(),s(l?c.filter(function(e){return e!==t.id}):[].concat(Object(ye.a)(c),[t.id]))},[c,t.id]),d=Object(r.useCallback)(function(){i.push("/note/".concat(t.id))},[t.id]);return o.a.createElement(Se.a,{className:a.root,style:Re(t),onClick:d},o.a.createElement("p",{className:a.content},o.a.createElement("strong",{style:{color:"#000"}},n.substr(0,20)),n.substr(20)),o.a.createElement("div",{className:"time-stamp-wrappper"},o.a.createElement(_e.a,{className:"text-view-content"},Object(O.a)(t.lastModifiedTimestamp))),o.a.createElement(Fe.a,{style:{position:"absolute",bottom:0,right:0,padding:"5px",zIndex:"2"},checked:l,icon:o.a.createElement(Ie.a,{style:{color:"#1e88e5"}}),checkedIcon:o.a.createElement(Te.a,{style:{color:"#1e88e5"}}),onClick:u}))}),Ae=function(){return o.a.createElement("div",{style:{margin:"50% auto",alignSelf:"center",fontSize:"18px",fontWeight:500,color:"#6d6d6d"}},"No Notes Here")},Me=Object(f.f)(Object(r.memo)(function(e){var t=e.selection,n=e.setSelection,r=e.fetching,a=e.notes,c=e.history;return o.a.createElement("div",{className:"container--notes"},Boolean(a.length)?a.map(function(e){return o.a.createElement(ze,{key:e.creationTimestamp,note:e,history:c,selection:t,setSelection:n})}):r?o.a.createElement(v.a,null):o.a.createElement(Ae,null))},function(e,t){var n=e.notes,r=e.selection,o=e.fetching,a=t.notes,c=t.selection,s=t.fetching;return n===a&&r===c&&o===s})),Be=n(130),Je=n.n(Be),He=n(195),Le=n.n(He),We=Object(f.f)(Object(K.withStyles)(function(e){return{fabRoot:{backgroundColor:"#ffc400","&:hover":{backgroundColor:"#ffab00"}},iconRoot:{color:"#fff",fontSize:"35px"}}})(function(e){var t=e.history,n=e.classes,a=e.openedFolder,c=e.setOpenedFolder,s=e.show,i=Object(r.useContext)(w.a).idb,l=Object(r.useCallback)(function(e){t.replace("/note/".concat(e))},[]),u=Object(r.useCallback)(function(){Object(x.i)(x.b.operation,{idb:i,openedFolder:a,setOpenedFolder:c,changeRoute:l})},[a]);return s&&o.a.createElement("div",{className:"container--add-notes"},o.a.createElement(Je.a,{className:n.fabRoot,onClick:u},o.a.createElement(Le.a,{className:n.iconRoot})))})),Ve=n(196),qe=n.n(Ve),Ke=n(198),Ue=n.n(Ke),$e=n(197),Ge=n.n($e),Qe=n(90),Xe=n.n(Qe),Ye=n(82),Ze=n.n(Ye),et=n(118),tt=n.n(et),nt=n(119),rt=n.n(nt),ot=function(e){var t=e.option,n=e.className,r=e.Icon,a=e.callback;return o.a.createElement("div",{className:"container--bottom-tool-button"},o.a.createElement(Q.a,{className:n,onClick:a},o.a.createElement(r,null),o.a.createElement("span",{className:"bottom-button-text"},t.label)))},at=Object(K.withStyles)(function(e){return{buttonRoot:{width:"100%",height:"100%"},listItemPrimary:{maxWidth:"175px",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},flexJustifyCenter:{display:"flex",justifyContent:"center"}}})(function(e){var t=e.classes,n=e.options,a=e.show,c=e.openedFolder,s=e.selection,i=e.setOpenedFolder,l=e.setSelection,u=(e.setCreateDialogOpen,Object(r.useContext)(w.a).idb),d=Object(r.useState)(!1),p=Object(m.a)(d,2),f=p[0],b=p[1],h=Object(r.useState)([]),v=Object(m.a)(h,2),O=v[0],y=v[1],C=Object(r.useCallback)(function(){Object(x.i)(x.c.operation,{idb:u,selection:s,openedFolder:c,setOpenedFolder:i}),l([])},[s]),F=Object(r.useCallback)(function(e){Object(x.i)(x.g.operation,{idb:u,selection:s,openedFolder:c,setOpenedFolder:i,moveToFolderId:e}),l([]),N()},[s]),N=Object(r.useCallback)(function(){b(!1)},[]),I=Object(r.useCallback)(Object(S.a)(k.a.mark(function e(){var t;return k.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=[c.id],e.next=3,z(P,c.id,{idb:u,setFolders:y,foldersToExclude:t});case 3:b(!0);case 4:case"end":return e.stop()}},e,this)})),[c]);return o.a.createElement("div",{className:"container--bottom-toolbar",style:a?{}:{height:0}},n.map(function(e){return o.a.createElement(ot,Object.assign({key:e.operation,className:t.buttonRoot},function(e){switch(e.operation){case g.operation:return{option:e,Icon:qe.a,callback:I};case E.operation:return{option:e,Icon:Ge.a,callback:function(){return F(1)}};case j.operation:return{option:e,Icon:Ue.a,callback:C};default:return function(){}}}(e)))}),o.a.createElement(ne.a,{open:f,onClose:N,scroll:"paper"},o.a.createElement(Ze.a,null,o.a.createElement(tt.a,{primary:"Select Folder",classes:{primary:t.flexJustifyCenter}})),o.a.createElement(rt.a,null),o.a.createElement(Xe.a,{style:{maxHeight:"80vh",padding:0}},O.map(function(e){return o.a.createElement(o.a.Fragment,null,o.a.createElement(Ze.a,{button:!0,classes:{root:t.flexJustifyCenter},onClick:function(){return F(e.id)},key:e.id},o.a.createElement(tt.a,{primary:e.name,classes:{primary:t.listItemPrimary}})),o.a.createElement(rt.a,null))}))))}),ct=function(e){var t=e.match,n=Object(r.useContext)(w.a).idb,a=Object(r.useState)(null),c=Object(m.a)(a,2),s=c[0],i=c[1],l=Object(r.useState)(null),u=Object(m.a)(l,2),d=u[0],p=u[1],f=Object(r.useState)(!1),b=Object(m.a)(f,2),y=b[0],k=b[1],S=Object(r.useState)([]),C=Object(m.a)(S,2),F=C[0],N=C[1],I=Object(r.useState)([]),D=Object(m.a)(I,2),T=D[0],P=D[1],R=Object(r.useState)(!0),A=Object(m.a)(R,2),M=A[0],B=A[1],J=Object(r.useMemo)(function(){return(e=s)&&[Object(O.b)(e)?E:g,j]||[];var e},[s]),H=Object(r.useCallback)(function(){k(!1)},[]),L=Object(r.useCallback)(function(){p(null)},[]),W=0!==F.length,V=s&&2===s.id;return Object(r.useEffect)(function(){var e=Number.parseInt(t.params.id);z(_,e,{idb:n,setOpenedFolder:i})},[t]),Object(r.useEffect)(function(){Object(x.i)(x.d.operation,{idb:n,openedFolder:s,setFetching:B,setNotes:P})},[s]),s?o.a.createElement("div",{className:"container--home-page",onClick:H},o.a.createElement(me,{openedFolder:s,setOpenedFolder:i,setSnackError:p,showDropdown:y,setShowDropdown:k,notes:T,selection:F,clearDropDown:H,setSelection:N}),o.a.createElement(xe,{openedFolder:s,setNotes:P}),o.a.createElement(Me,{fetching:M,notes:T,selection:F,setSelection:N}),o.a.createElement(We,{openedFolder:s,setOpenedFolder:i,fetching:M,notes:T,show:!W&&!V}),o.a.createElement(at,{options:J,show:W,selection:F,openedFolder:s,setSelection:N,setOpenedFolder:i}),o.a.createElement(h.a,{open:Boolean(d),autoHideDuration:2e3,onClose:L,message:d})):o.a.createElement(v.a,null)},st=n(199),it=n(84),lt="This is supposed to be a long long long note asdasdasdasdadsasddasdasddasd",ut=(new Date).getTime(),dt=function(){return Object(st.openDb)("notas",1,function(e){switch(e.oldVersion){case 0:case 1:var t=e.createObjectStore("folders",{keyPath:"id",autoIncrement:!0});t.createIndex("folderNames","name",{unique:!0}),t.add({count:1,timestamp:(new Date).getTime(),name:"All Notes",systemFolder:!0}),t.add({count:0,timestamp:(new Date).getTime(),name:"Trash",systemFolder:!0});var n=e.createObjectStore("notes",{keyPath:"id",autoIncrement:!0});n.createIndex("notesCreationTimestamp","creationTimestamp"),n.createIndex("notesLastModifiedTimestamp","lastModifiedTimestamp"),n.createIndex("notesFolderId","folderId"),n.add({color:Pe.a.label,content:lt,previewContent:lt.substr(0,80),structuredContent:it.a.deserialize(lt).toJSON(),folderId:1,creationTimestamp:ut,lastModifiedTimestamp:ut})}})},pt=o.a.lazy(function(){return Promise.all([n.e(3),n.e(4)]).then(n.bind(null,572))}),ft=o.a.lazy(function(){return n.e(5).then(n.bind(null,571))}),mt=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).idb=dt(),n}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return o.a.createElement(w.a.Provider,{value:{idb:this.idb}},o.a.createElement(r.Suspense,{fallback:o.a.createElement(v.a,null)},o.a.createElement(p.a,{basename:"/Notas"},o.a.createElement(f.d,null,o.a.createElement(f.b,{path:"/",exact:!0,component:function(e){return o.a.createElement(f.a,{to:{pathname:"/folder/1",state:{from:e.location}}})}}),o.a.createElement(f.b,{path:"/folder/:id",exact:!0,component:ct}),o.a.createElement(f.b,{path:"/note/:id",component:pt}),o.a.createElement(f.b,{component:ft})))))}}]),t}(r.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(o.a.createElement(mt,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},83:function(e,t,n){"use strict";n.d(t,"b",function(){return o}),n.d(t,"a",function(){return c});var r=n(20),o=function(e){return 2===e.id},a=function(e,t){var n=e>12?"PM":"AM";return"".concat(e%12||12,":").concat(t," ").concat(n)},c=function(e){var t=(new Date).getTime()-e,n=new Date(e),o=n.toDateString(),c=n.toTimeString().split(":"),s=Object(r.a)(c,2),i=s[0],l=s[1],u=o.split(" "),d=Object(r.a)(u,4),p=d[0],f=d[1],m=d[2],b=d[3],h=a(i,l);return t<=864e5?a(i,l):t<=6048e5?"".concat(p," ").concat(h):t<=24192e5?"".concat(p," ").concat(m," ").concat(h):t<=314496e5?"".concat(p," ").concat(m," ").concat(f):"".concat(m," ").concat(f," ").concat(b)}}},[[221,1,2]]]);
//# sourceMappingURL=main.4b69341f.chunk.js.map