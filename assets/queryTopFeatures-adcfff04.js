import{tN as p,w as l,g8 as m,aT as F,tJ as f,U as E,ij as g,aE as j}from"./index-70df4575.js";const c="Layer does not support extent calculation.";function x(r,e){var s,y;const o=r.geometry,t=r.toJSON(),n=t;if(l(o)&&(n.geometry=JSON.stringify(o),n.geometryType=j(o),n.inSR=o.spatialReference.wkid||JSON.stringify(o.spatialReference)),(s=t.topFilter)!=null&&s.groupByFields&&(n.topFilter.groupByFields=t.topFilter.groupByFields.join(",")),(y=t.topFilter)!=null&&y.orderByFields&&(n.topFilter.orderByFields=t.topFilter.orderByFields.join(",")),t.topFilter&&(n.topFilter=JSON.stringify(n.topFilter)),t.objectIds&&(n.objectIds=t.objectIds.join(",")),t.orderByFields&&(n.orderByFields=t.orderByFields.join(",")),t.outFields&&!(e!=null&&e.returnCountOnly||e!=null&&e.returnExtentOnly||e!=null&&e.returnIdsOnly)?t.outFields.includes("*")?n.outFields="*":n.outFields=t.outFields.join(","):delete n.outFields,t.outSR?n.outSR=t.outSR.wkid||JSON.stringify(t.outSR):o&&t.returnGeometry&&(n.outSR=n.inSR),t.returnGeometry&&delete t.returnGeometry,t.timeExtent){const a=t.timeExtent,{start:i,end:u}=a;i==null&&u==null||(n.time=i===u?i:`${i??"null"},${u??"null"}`),delete t.timeExtent}return n}async function S(r,e,o,t){const n=await d(r,e,"json",t);return p(e,o,n.data),n}async function w(r,e,o){return l(e.timeExtent)&&e.timeExtent.isEmpty?{data:{objectIds:[]}}:d(r,e,"json",o,{returnIdsOnly:!0})}async function B(r,e,o){return l(e.timeExtent)&&e.timeExtent.isEmpty?{data:{count:0,extent:null}}:d(r,e,"json",o,{returnExtentOnly:!0,returnCountOnly:!0}).then(t=>{const n=t.data;if(n.hasOwnProperty("extent"))return t;if(n.features)throw new Error(c);if(n.hasOwnProperty("count"))throw new Error(c);return t})}function R(r,e,o){return l(e.timeExtent)&&e.timeExtent.isEmpty?Promise.resolve({data:{count:0}}):d(r,e,"json",o,{returnIdsOnly:!0,returnCountOnly:!0})}function d(r,e,o,t={},n={}){const s=typeof r=="string"?m(r):r,y=e.geometry?[e.geometry]:[];return t.responseType=o==="pbf"?"array-buffer":"json",F(y,null,t).then(a=>{const i=a&&a[0];l(i)&&((e=e.clone()).geometry=i);const u=f({...s.query,f:o,...n,...x(e,n)});return E(g(s.path,"queryTopFeatures"),{...t,query:{...u,...t.query}})})}export{R as a,S as d,w as m,B as p};
