(this["webpackJsonptripper-admin-pannel"]=this["webpackJsonptripper-admin-pannel"]||[]).push([[52],{898:function(e,t,s){},969:function(e,t,s){"use strict";s.r(t);var c=s(709),r=s(710),n=s(1),a=s(202),l=s(75),i=s(26),o=s(862),d=s.n(o),j=s(739),u=s.n(j),h=s(892),b=s(983),m=s(1e3),p=s(860),x=s(701),O=(s(706),s(898),s(22));t.default=Object(a.b)((function(e){var t=e.shifts,s=e.loader;return{shiftDetails:t.details,isLoading:s.loading}}),(function(e){return{actions:Object(l.b)({_getShiftDetails:function(e){return Object(h.e)(e)}},e)}}))((function(e){var t=Object(i.g)();console.log("userDetails",e.userDetails),Object(n.useEffect)((function(){s(e.match.params.id)}),[]);var s=function(){var t=Object(r.a)(Object(c.a)().mark((function t(s){var r;return Object(c.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.actions._getUserDetails(s);case 3:r=t.sent,console.log("========> get user repsonse",r),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),console.log("Error in get list",t.t0);case 10:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(e){return t.apply(this,arguments)}}(),a=function(){var s=Object(r.a)(Object(c.a)().mark((function s(r){var n;return Object(c.a)().wrap((function(s){for(;;)switch(s.prev=s.next){case 0:return s.prev=0,n={user_id:r._id},s.next=4,e.actions._deleteDriver(n);case 4:s.sent,b.a.success({message:"User deleted successfully"}),t.push("/drivers"),s.next=13;break;case 9:s.prev=9,s.t0=s.catch(0),console.log(s.t0),b.a.error({message:s.t0.response&&s.t0.response.data?s.t0.response.data.message:"something went wrong",placement:"bottomRight"});case 13:case"end":return s.stop()}}),s,null,[[0,9]])})));return function(e){return s.apply(this,arguments)}}();console.log("===========>PROPS FROM TABLE",e);var l=e.userDetails.data;return Object(O.jsx)(x.ub,{children:Object(O.jsx)(x.u,{lg:12,md:12,xs:12,children:Object(O.jsxs)(x.j,{children:[Object(O.jsx)(x.n,{children:"Shift Details"}),Object(O.jsxs)(x.k,{children:[e.isLoading?Object(O.jsx)(x.Eb,{style:{width:"40px",height:"40px",margin:"0 auto",display:"flex"},color:"info",variant:"grow"}):Object(O.jsxs)("div",{children:[Object(O.jsxs)(x.K,{row:!0,children:[Object(O.jsx)(x.u,{xs:"12",md:"10",children:Object(O.jsx)(x.P,{src:!l||d.a.isEmpty(l.image)||d.a.isNil(l.image)?"https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/45.png":"https://peers-image.s3.amazonaws.com/".concat(l.image),style:{width:115,height:115}})}),Object(O.jsx)(x.u,{xs:"12",md:"2",children:Object(O.jsx)(p.a,{onClick:function(){return function(e){try{m.a.confirm({title:"Are you sure delete this user?",okText:"Yes",okType:"danger",cancelText:"No",onOk:function(){return a(e)},onCancel:function(){console.log("Cancel")}})}catch(t){}}(l)},ghost:!0,type:"danger",children:"Delete"})})]}),Object(O.jsxs)(x.K,{row:!0,children:[Object(O.jsxs)(x.u,{xs:"12",md:"3",children:[Object(O.jsx)(x.ab,{className:"labelStyle",htmlFor:"select",children:"Name:"}),Object(O.jsx)("span",{className:"span",children:l&&l.fullName})]}),Object(O.jsxs)(x.u,{xs:"12",md:"3",children:[Object(O.jsx)(x.ab,{className:"labelStyle",htmlFor:"select",children:"Email:"}),Object(O.jsx)("span",{className:"span",children:l&&l.email})]}),Object(O.jsxs)(x.u,{xs:"12",md:"3",children:[Object(O.jsx)(x.ab,{className:"labelStyle",htmlFor:"select",children:"Phone:"}),Object(O.jsx)("span",{className:"span",children:l&&l.formattedMobile})]}),Object(O.jsxs)(x.u,{xs:"12",md:"3",children:[Object(O.jsx)(x.ab,{className:"labelStyle",htmlFor:"select",children:"Verification Status:"}),Object(O.jsx)("span",{className:"span",children:l&&l.signUpVerificationStatus})]})]}),Object(O.jsxs)(x.K,{row:!0,children:[Object(O.jsxs)(x.u,{xs:"12",md:"3",children:[Object(O.jsx)(x.ab,{className:"labelStyle",htmlFor:"select",children:"Selected Peer Group:"}),Object(O.jsx)(x.Qb,{content:"Peer Group Details",children:Object(O.jsx)("span",{className:"span",children:Object(O.jsx)(x.f,{onClick:function(){return t.push("/peerGroup/".concat(l.selected_peer_group._id))},children:l&&l.selected_peer_group&&l.selected_peer_group.name})})})]}),Object(O.jsxs)(x.u,{xs:"12",md:"3",children:[Object(O.jsx)(x.ab,{className:"labelStyle",htmlFor:"select",children:"School/University:"}),Object(O.jsx)("span",{className:"span",children:l&&l.schoolUniversity&&l.schoolUniversity.name})]}),Object(O.jsxs)(x.u,{xs:"12",md:"3",children:[Object(O.jsx)(x.ab,{className:"labelStyle",htmlFor:"select",children:"Connected User:"}),Object(O.jsx)("span",{className:"span",children:l&&l.learnrequests_updated&&l.learnrequests_updated.length})]}),Object(O.jsxs)(x.u,{xs:"12",md:"3",children:[Object(O.jsx)(x.ab,{className:"labelStyle",htmlFor:"select",children:"Created:"}),Object(O.jsx)("span",{className:"span",children:l&&u()(l.created).format("Do MMM YYYY")})]})]})]}),Object(O.jsxs)(x.ub,{children:[Object(O.jsx)(x.u,{lg:3,md:3,children:Object(O.jsxs)(x.j,{children:[Object(O.jsx)(x.n,{children:"User Strengths"}),Object(O.jsx)(x.k,{children:Object(O.jsx)(x.y,{items:l&&l.userStrengths?l.userStrengths:[],fields:[{key:"name",_classes:"font-weight-bold"}],hover:!0,striped:!0,itemsPerPage:10,scopedSlots:{name:function(e){return Object(O.jsx)("td",{style:{textTransform:"capitalize"},children:e.name})}}})})]})}),Object(O.jsx)(x.u,{lg:3,md:3,children:Object(O.jsxs)(x.j,{children:[Object(O.jsx)(x.n,{children:"Peer Groups"}),Object(O.jsx)(x.k,{children:Object(O.jsx)(x.y,{items:l&&l.peerGroups?l.peerGroups:[],fields:[{key:"name",_classes:"font-weight-bold"}],hover:!0,striped:!0,itemsPerPage:10,clickableRows:!0,onRowClick:function(e){return t.push("/peerGroup/".concat(e._id))},scopedSlots:{name:function(e){return Object(O.jsx)("td",{style:{textTransform:"capitalize"},children:e.label})}}})})]})}),Object(O.jsx)(x.u,{lg:6,md:6,children:Object(O.jsxs)(x.j,{children:[Object(O.jsx)(x.n,{children:"Connected Users"}),Object(O.jsx)(x.k,{children:Object(O.jsx)(x.y,{items:l&&l.learnrequests_updated?l.learnrequests_updated:[],fields:[{key:"fullName",_classes:"font-weight-bold"},{key:"formattedMobile",label:"Mobile"},{key:"strength",label:"Strength"},"created"],hover:!0,striped:!0,itemsPerPage:10,scopedSlots:{fullName:function(e){return Object(O.jsx)("td",{children:e.requestedUserId.fullName})},formattedMobile:function(e){return Object(O.jsx)("td",{children:e.requestedUserId.formattedMobile})},strength:function(e){return Object(O.jsx)("td",{style:{textTransform:"capitalize"},children:e.requestedStrengthId[0].name})},created:function(e){return Object(O.jsx)("td",{children:u()(e.created).format("Do MMM YYYY hh:mm a")})}}})})]})})]})]})]})})})}))}}]);
//# sourceMappingURL=52.95ed7957.chunk.js.map