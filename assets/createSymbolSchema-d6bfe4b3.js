import{E as p,S}from"./TileInfoView-8d1457e7.js";import{f as h,_ as V,A as b}from"./SymbolProcessor-38a57492.js";import"./index-1b8c5637.js";import"./cimAnalyzer-ef43fe2e.js";import"./BidiEngine-836b7ef6.js";import"./TileClipper-ae6eca9e.js";import"./enums-c655c737.js";import"./number-b10bd8f5.js";import"./Pipeline-3af80eca.js";import"./QueryEngine-e9956441.js";import"./QueryEngineResult-a3e60b60.js";import"./WhereClause-3b5a65ae.js";import"./executionError-fb3f283a.js";import"./utils-81b4810e.js";import"./generateRendererUtils-4acfdc77.js";import"./json-48e3ea08.js";import"./QueryEngineCapabilities-42e44ded.js";import"./StreamFeatureManager-68ffd9c5.js";import"./quickselect-56c5966e.js";import"./arcadeTimeUtils-80a905aa.js";import"./centroid-07d28d00.js";import"./ogcFeatureUtils-43aeb6d3.js";import"./geojson-aa8b19ff.js";import"./clientSideDefaults-c1df0f48.js";import"./createConnection-fb6d6a7b.js";import"./tileUtils-d9dd0f1d.js";import"./TurboLine-b4df0b41.js";import"./Rect-98da58d6.js";import"./GeometryUtils-0258f920.js";function u(e){var r;return e.type==="line-marker"?{type:"line-marker",color:(r=e.color)==null?void 0:r.toJSON(),placement:e.placement,style:e.style}:e.constructor.fromJSON(e.toJSON()).toJSON()}function y(e){return b(e)}function Z(e,r,t=!1){if(!e)return null;switch(e.type){case"simple-fill":case"picture-fill":return x(e,r,t);case"simple-marker":case"picture-marker":return g(e,r,t);case"simple-line":return K(e,r,t);case"text":return z(e,r,t);case"label":return d(e,r,t);case"cim":return{type:"cim",rendererKey:r.vvFlags,data:e.data,maxVVSize:r.maxVVSize};case"CIMSymbolReference":return{type:"cim",rendererKey:r.vvFlags,data:e,maxVVSize:r.maxVVSize};case"web-style":return{...u(e),type:"web-style",hash:e.hash(),rendererKey:r.vvFlags,maxVVSize:r.maxVVSize};default:throw new Error(`symbol not supported ${e.type}`)}}function d(e,r,t){const o=e.toJSON(),i=h(p.LABEL,{...r,placement:o.labelPlacement});return{materialKey:t?y(i):i,hash:e.hash(),...o,labelPlacement:o.labelPlacement}}function x(e,r,t){const o=h(p.FILL,r),i=t?y(o):o,m=e.clone(),a=m.outline,s=V(r.symbologyType);s||(m.outline=null);const c={materialKey:i,hash:m.hash(),...u(m)};if(s)return c;const l=[];if(l.push(c),a){const n=h(p.LINE,{...r,isOutline:!0}),f={materialKey:t?y(n):n,hash:a.hash(),...u(a)};l.push(f)}return{type:"composite-symbol",layers:l,hash:l.reduce((n,f)=>f.hash+n,"")}}function K(e,r,t){const o=V(r.symbologyType)?S.DEFAULT:r.symbologyType,i=h(p.LINE,{...r,symbologyType:o}),m=t?y(i):i,a=e.clone(),s=a.marker;a.marker=null;const c=[];if(c.push({materialKey:m,hash:a.hash(),...u(a)}),s){const l=h(p.MARKER,r),n=t?y(l):l;s.color=s.color??a.color,c.push({materialKey:n,hash:s.hash(),lineWidth:a.width,...u(s)})}return{type:"composite-symbol",layers:c,hash:c.reduce((l,n)=>n.hash+l,"")}}function g(e,r,t){const o=h(p.MARKER,r),i=t?y(o):o,m=u(e);return{materialKey:i,hash:e.hash(),...m,angle:e.angle,maxVVSize:r.maxVVSize}}function z(e,r,t){const o=h(p.TEXT,r),i=t?y(o):o,m=u(e);return{materialKey:i,hash:e.hash(),...m,angle:e.angle,maxVVSize:r.maxVVSize}}export{Z as createSymbolSchema};