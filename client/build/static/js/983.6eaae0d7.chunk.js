(self.webpackChunkselfie=self.webpackChunkselfie||[]).push([[983],{7983:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return Z}});var r=n(1413),o=n(5671),a=n(3144),i=n(136),s=n(8557),l=n(4569),c=n.n(l),u=n(2426),f=n.n(u),d=n(8472),p=n(9741),h=n(2791),y=n(3513),m=n(7043),b=n(1820),v=(n(5106),n(9743)),g=n(2677),j=n(2132),k=n(5630),x=n(3360),w=n(5181),O=n(184),C=new Date,_=(new Date(C.setDate(C.getDate()-C.getDay()+1)),new Date(C.setDate(C.getDate()-C.getDay()+7)),f()().startOf("isoWeek").format("YYYY-MM-DD")),D=f()().startOf("isoWeek").add(6,"days").format("YYYY-MM-DD"),S=function(e){(0,i.Z)(n,e);var t=(0,s.Z)(n);function n(){var e;(0,o.Z)(this,n);for(var a=arguments.length,i=new Array(a),s=0;s<a;s++)i[s]=arguments[s];return(e=t.call.apply(t,[this].concat(i))).state={users:[],user:"",timesheets:[],timeLog:[],employer:[],categoryEmployer:[],startDate:_,endDate:D,loading:!1,displayTotal:""},e.handleChange=function(t){e.setState({startDate:f()(t.target.value).format("YYYY-MM-DD")})},e.handleChangeEnd=function(t){e.setState({endDate:f()(t.target.value).format("YYYY-MM-DD")})},e.reloadTimesheet=function(){var t={startDate:e.state.startDate,endDate:e.state.endDate};e.state.user&&(t.user_id=e.state.user),e.state.hire&&(t.hire=e.state.hire),localStorage.getItem("location")&&(t.location=localStorage.getItem("location")),e.setState({loading:!0}),c().get(m.UW+"timesheets",{params:t}).then((function(t){e.setState({loading:!1,timesheets:t.data.timesheets.map((function(e){return(0,r.Z)((0,r.Z)({},e),{},{user:t.data.user.find((function(t){return t.pin===e.pin}))})}))})})).catch((function(e){console.log(e)}))},e}return(0,a.Z)(n,[{key:"componentDidMount",value:function(){var e=this;c().get(m.UW+"employees").then((function(t){e.setState({users:t.data.filter((function(e){return null==localStorage.getItem("location")||e.site===localStorage.getItem("location")}))})})),c().get(m.UW+"category/employer",{headers:{api_key:window.localStorage.getItem("token")}}).then((function(t){e.setState({categoryEmployer:t.data})})),this.reloadTimesheet=this.reloadTimesheet.bind(this),this.handleChange=this.handleChange.bind(this),this.handleChangeEnd=this.handleChangeEnd.bind(this),this.reloadTimesheet()}},{key:"render",value:function(){var e=this,t=new Map;this.state.timesheets.forEach((function(e){return t.set(e.pin,e)})),this.state.users.forEach((function(e){return t.set(e.pin,(0,r.Z)((0,r.Z)({},t.get(e.pin)),e))}));var n=[{id:"date",name:"date",selector:function(e){return e.date},sortable:!0},{id:"name",name:"Name",selector:function(e){return e.name},sortable:!0,cell:function(e){return(0,O.jsxs)(p.rU,{to:"/dashboard/each-staff/"+e._id,children:[e.name,e.comment?(0,O.jsx)("div",{className:"comment",children:(0,O.jsxs)("span",{children:["-",e.comment]})}):(0,O.jsx)("span",{})]})}},{id:"employee",name:"Employee",selector:function(e){return e.hire},sortable:!0},{id:"jobRole",name:"Job Role",selector:function(e){return e.role},sortable:!0},{id:"location",name:"Location",selector:function(e){return e.site},sortable:!0},{name:"Clock In",selector:function(e){return e.in},sortable:!0,cell:function(e){return(0,O.jsx)("span",{className:"align-left pl-2",children:"Invalid date"===e.in?"":f()(e.in,"hh:mm a").format("LT")})}},{name:"Break In",selector:function(e){return e.break},sortable:!0,cell:function(e){return(0,O.jsx)("span",{className:"align-left pl-2",children:"Invalid date"===e.break?"":f()(e.break,"hh:mm a").format("LT")})}},{name:"Break Out",selector:function(e){return e.endBreak},sortable:!0,cell:function(e){return(0,O.jsx)("span",{className:"align-left pl-2",children:"Invalid date"===e.endBreak?"":f()(e.endBreak,"hh:mm a").format("LT")})}},{name:"Clock Out",selector:function(e){return e.out},sortable:!0,cell:function(e){return(0,O.jsx)("span",{className:"align-left pl-2",children:"Invalid date"===e.out?"":f()(e.out,"hh:mm a").format("LT")})}},{name:"Total break",selector:function(e){return e.btotal},sortable:!0,cell:function(e){return(0,O.jsx)("span",{children:e.btotal?e.btotal+" hrs":"00"})}},{name:"Total",selector:function(e){return e.total},sortable:!0,cell:function(e){return(0,O.jsx)("span",{children:e.total?e.total+" hrs":"00"})}}],o=this.state.timesheets.map((function(e){return e.id=e._id+e.date,e})),a={columns:n,data:o},i=o.reduce((function(e,t){return e+ +t.total}),0),s=o.reduce((function(e,t){return e+ +t.btotal}),0);return s=s.toFixed(2),(0,O.jsx)("div",{children:(0,O.jsx)(v.Z,{children:(0,O.jsx)(g.Z,{md:12,xl:12,children:(0,O.jsxs)(j.Z,{className:"Recent-Users",children:[(0,O.jsx)(j.Z.Header,{children:(0,O.jsx)(j.Z.Title,{as:"h5",children:"Timesheets"})}),(0,O.jsxs)(j.Z.Body,{className:"px-0 py-2",children:[(0,O.jsxs)(v.Z,{className:"container",children:[(0,O.jsx)(g.Z,{md:3,sm:6,children:(0,O.jsxs)(k.Z.Group,{as:g.Z,controlId:"formGridHire",children:[(0,O.jsx)(k.Z.Label,{children:"Select Employer"}),(0,O.jsxs)(k.Z.Control,{"aria-label":"Default select example",as:"select",onChange:function(t){e.setState({hire:t.target.value,user:"",timesheets:[]}),setTimeout(e.reloadTimesheet,100)},children:[(0,O.jsx)("option",{value:"",children:"Select Employer"}),this.state.categoryEmployer.map((function(e,t){return(0,O.jsx)("option",{value:e.name,children:e.name},t)}))]})]})}),(0,O.jsxs)(g.Z,{md:3,sm:6,children:[(0,O.jsx)(k.Z.Label,{children:"Range DD-MM-YYYY"}),(0,O.jsx)("input",{id:"formGridsDate",type:"date",name:"startDate","data-date":"","data-date-format":"DD MMMM YYYY",className:"form-control",value:f()(this.state.startDate).format("YYYY-MM-DD"),onChange:function(t){e.handleChange(t),setTimeout(e.reloadTimesheet,100)},placeholder:"Start Date"}),"To",(0,O.jsx)("input",{id:"formGrideDate",type:"date",name:"endDate","data-date":"","data-date-format":"DD MMMM YYYY",className:"form-control",value:f()(this.state.endDate).format("YYYY-MM-DD"),onChange:function(t){e.handleChangeEnd(t),setTimeout(e.reloadTimesheet,100)},placeholder:"End Date"})]}),(0,O.jsx)(g.Z,{md:3,sm:6,children:(0,O.jsxs)(k.Z.Group,{controlId:"exampleForm.ControlSelect1",children:[(0,O.jsx)(k.Z.Label,{children:"Select User"}),(0,O.jsxs)(k.Z.Control,{as:"select",onChange:function(t){e.setState({user:t.target.value}),setTimeout(e.reloadTimesheet,100)},children:[(0,O.jsx)("option",{value:"",children:"Select User"}),this.state.users.filter((function(t){return e.state.hire===t.hire})).map((function(e,t){return(0,O.jsx)("option",{value:e._id,children:e.name},t)}))]})]})}),(0,O.jsxs)(g.Z,{md:3,sm:6,children:[(0,O.jsxs)(d.CSVLink,{data:o,headers:[{label:"Date",key:"date"},{label:"Name",key:"name"},{label:"Comment",key:"comment"},{label:"Employer",key:"hire"},{label:"Role",key:"role"},{label:"Location",key:"site"},{label:"Clock In",key:"in"},{label:"Break",key:"break"},{label:"End Break",key:"endBreak"},{label:"Clock Out",key:"out"},{label:"Total Break",key:"btotal"},{label:"Total Hour",key:"total"}],children:[(0,O.jsx)(x.Z,{variant:"success",children:" CSV File"})," ",(0,O.jsx)("br",{})]}),"Total Working Hours: ",i||0," hrs",(0,O.jsx)("br",{}),"Total break Hours: ",s||0," hrs",(0,O.jsx)("br",{}),"Total Hours: ",i-s||0," hrs",(0,O.jsx)("br",{}),(0,O.jsx)("br",{})]})]}),(0,O.jsx)(w.Z,(0,r.Z)((0,r.Z)({print:!1,exportHeaders:!1,export:!1,filterPlaceholder:"Search"},a),{},{children:(0,O.jsx)(y.ZP,{progressPending:this.state.loading,columns:n,data:o,defaultSortField:"id",defaultSortAsc:!0,pagination:!0,noHeader:!0,paginationPerPage:"30",paginationComponentOptions:{selectAllRowsItem:!0},highlightOnHover:!0,export:!0,sortIcon:(0,O.jsx)(b.Z,{})})}))]})]})})})})}}]),n}(h.Component),Z=S},3881:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return r.Z}});var r=n(6608)},1820:function(e,t,n){"use strict";var r=n(4836);t.Z=void 0;var o=r(n(2791)),a=(0,r(n(4894)).default)(o.default.createElement("path",{d:"M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"}),"ArrowDownward");t.Z=a},4894:function(e,t,n){"use strict";var r=n(4836);Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){var n=a.default.memo(a.default.forwardRef((function(t,n){return a.default.createElement(i.default,(0,o.default)({ref:n},t),e)})));0;return n.muiName=i.default.muiName,n};var o=r(n(434)),a=r(n(2791)),i=r(n(3881))},9743:function(e,t,n){"use strict";var r=n(1413),o=n(5987),a=n(1694),i=n.n(a),s=n(2791),l=n(162),c=n(184),u=["bsPrefix","className","as"],f=["xxl","xl","lg","md","sm","xs"],d=s.forwardRef((function(e,t){var n=e.bsPrefix,a=e.className,s=e.as,d=void 0===s?"div":s,p=(0,o.Z)(e,u),h=(0,l.vE)(n,"row"),y="".concat(h,"-cols"),m=[];return f.forEach((function(e){var t,n=p[e];delete p[e],t=null!=n&&"object"===typeof n?n.cols:n;var r="xs"!==e?"-".concat(e):"";null!=t&&m.push("".concat(y).concat(r,"-").concat(t))})),(0,c.jsx)(d,(0,r.Z)((0,r.Z)({ref:t},p),{},{className:i().apply(void 0,[a,h].concat(m))}))}));d.displayName="Row",t.Z=d},8472:function(e,t,n){e.exports=n(3561)},8015:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=n(2791),i=(r=a)&&r.__esModule?r:{default:r},s=n(1509),l=n(8333);var c=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={},n}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),o(t,[{key:"buildURI",value:function(){return s.buildURI.apply(void 0,arguments)}},{key:"componentDidMount",value:function(){var e=this.props,t=e.data,n=e.headers,r=e.separator,o=e.enclosingCharacter,a=e.uFEFF,i=e.target,s=e.specs,l=e.replace;this.state.page=window.open(this.buildURI(t,a,n,r,o),i,s,l)}},{key:"getWindow",value:function(){return this.state.page}},{key:"render",value:function(){return null}}]),t}(i.default.Component);c.defaultProps=Object.assign(l.defaultProps,{target:"_blank"}),c.propTypes=l.propTypes,t.default=c},9088:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=n(2791),s=(r=i)&&r.__esModule?r:{default:r},l=n(1509),c=n(8333);var u=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.buildURI=n.buildURI.bind(n),n}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),a(t,[{key:"buildURI",value:function(){return l.buildURI.apply(void 0,arguments)}},{key:"handleLegacy",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(window.navigator.msSaveOrOpenBlob){e.preventDefault();var n=this.props,r=n.data,o=n.headers,a=n.separator,i=n.filename,s=n.enclosingCharacter,c=n.uFEFF,u=t&&"function"===typeof r?r():r,f=new Blob([c?"\ufeff":"",(0,l.toCSV)(u,o,a,s)]);return window.navigator.msSaveBlob(f,i),!1}}},{key:"handleAsyncClick",value:function(e){var t=this;this.props.onClick(e,(function(n){!1!==n?t.handleLegacy(e,!0):e.preventDefault()}))}},{key:"handleSyncClick",value:function(e){!1===this.props.onClick(e)?e.preventDefault():this.handleLegacy(e)}},{key:"handleClick",value:function(){var e=this;return function(t){if("function"===typeof e.props.onClick)return e.props.asyncOnClick?e.handleAsyncClick(t):e.handleSyncClick(t);e.handleLegacy(t)}}},{key:"render",value:function(){var e=this,t=this.props,n=t.data,r=t.headers,a=t.separator,i=t.filename,l=t.uFEFF,c=t.children,u=(t.onClick,t.asyncOnClick,t.enclosingCharacter),f=function(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}(t,["data","headers","separator","filename","uFEFF","children","onClick","asyncOnClick","enclosingCharacter"]),d="undefined"===typeof window?"":this.buildURI(n,l,r,a,u);return s.default.createElement("a",o({download:i},f,{ref:function(t){return e.link=t},target:"_self",href:d,onClick:this.handleClick()}),c)}}]),t}(s.default.Component);u.defaultProps=c.defaultProps,u.propTypes=c.propTypes,t.default=u},1509:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};function r(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}var o=t.isSafari=function(){return/^((?!chrome|android).)*safari/i.test(navigator.userAgent)},a=t.isJsons=function(e){return Array.isArray(e)&&e.every((function(e){return"object"===("undefined"===typeof e?"undefined":n(e))&&!(e instanceof Array)}))},i=t.isArrays=function(e){return Array.isArray(e)&&e.every((function(e){return Array.isArray(e)}))},s=t.jsonsHeaders=function(e){return Array.from(e.map((function(e){return Object.keys(e)})).reduce((function(e,t){return new Set([].concat(r(e),r(t)))}),[]))},l=t.jsons2arrays=function(e,t){var n=t=t||s(e),o=t;a(t)&&(n=t.map((function(e){return e.label})),o=t.map((function(e){return e.key})));var i=e.map((function(e){return o.map((function(t){return c(t,e)}))}));return[n].concat(r(i))},c=t.getHeaderValue=function(e,t){var n=e.replace(/\[([^\]]+)]/g,".$1").split(".").reduce((function(e,t,n,r){var o=e[t];if(void 0!==o&&null!==o)return o;r.splice(1)}),t);return void 0===n?e in t?t[e]:"":n},u=t.elementOrEmpty=function(e){return"undefined"===typeof e||null===e?"":e},f=t.joiner=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:",",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:'"';return e.filter((function(e){return e})).map((function(e){return e.map((function(e){return u(e)})).map((function(e){return""+n+e+n})).join(t)})).join("\n")},d=t.arrays2csv=function(e,t,n,o){return f(t?[t].concat(r(e)):e,n,o)},p=t.jsons2csv=function(e,t,n,r){return f(l(e,t),n,r)},h=t.string2csv=function(e,t,n,r){return t?t.join(n)+"\n"+e:e.replace(/"/g,'""')},y=t.toCSV=function(e,t,n,r){if(a(e))return p(e,t,n,r);if(i(e))return d(e,t,n,r);if("string"===typeof e)return h(e,t,n);throw new TypeError('Data should be a "String", "Array of arrays" OR "Array of objects" ')};t.buildURI=function(e,t,n,r,a){var i=y(e,n,r,a),s=o()?"application/csv":"text/csv",l=new Blob([t?"\ufeff":"",i],{type:s}),c="data:"+s+";charset=utf-8,"+(t?"\ufeff":"")+i,u=window.URL||window.webkitURL;return"undefined"===typeof u.createObjectURL?c:u.createObjectURL(l)}},3561:function(e,t,n){"use strict";t.CSVLink=void 0;var r=a(n(8015)),o=a(n(9088));function a(e){return e&&e.__esModule?e:{default:e}}r.default,t.CSVLink=o.default},8333:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.PropsNotForwarded=t.defaultProps=t.propTypes=void 0;var r,o=n(2791),a=((r=o)&&r.__esModule,n(2007));t.propTypes={data:(0,a.oneOfType)([a.string,a.array,a.func]).isRequired,headers:a.array,target:a.string,separator:a.string,filename:a.string,uFEFF:a.bool,onClick:a.func,asyncOnClick:a.bool,enclosingCharacter:a.string},t.defaultProps={separator:",",filename:"generatedBy_react-csv.csv",uFEFF:!0,asyncOnClick:!1,enclosingCharacter:'"'},t.PropsNotForwarded=["data","headers"]},434:function(e){function t(){return e.exports=t=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},e.exports.__esModule=!0,e.exports.default=e.exports,t.apply(this,arguments)}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports},4836:function(e){e.exports=function(e){return e&&e.__esModule?e:{default:e}},e.exports.__esModule=!0,e.exports.default=e.exports},5671:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}n.d(t,{Z:function(){return r}})},8557:function(e,t,n){"use strict";function r(e){return r=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},r(e)}n.d(t,{Z:function(){return s}});var o=n(1002),a=n(7326);function i(e,t){if(t&&("object"===(0,o.Z)(t)||"function"===typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return(0,a.Z)(e)}function s(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,o=r(e);if(t){var a=r(this).constructor;n=Reflect.construct(o,arguments,a)}else n=o.apply(this,arguments);return i(this,n)}}},136:function(e,t,n){"use strict";n.d(t,{Z:function(){return o}});var r=n(9611);function o(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&(0,r.Z)(e,t)}},1002:function(e,t,n){"use strict";function r(e){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r(e)}n.d(t,{Z:function(){return r}})}}]);
//# sourceMappingURL=983.6eaae0d7.chunk.js.map