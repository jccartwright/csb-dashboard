import{r8 as w,rt as I,r9 as $,mN as T,mO as O,mP as E,mQ as M,ra as P,rd as R,rq as F,ab as L,w as N,a1 as j,ic as b,ge as g,aF as J,U as f,aK as U,aM as q,re as _,rT as k,T as v,m as A,e as i,y as n,sa as x,aP as V,aQ as z,mV as K,b as B,cP as C,g_ as D}from"./index-70df4575.js";import{E as G,y as H,Z as W}from"./SublayersOwner-cd604d91.js";import{c as Q}from"./ExportImageParameters-72ecf3b6.js";import{e as Z}from"./imageBitmapUtils-dc9da33d.js";import{n as S}from"./sublayerUtils-a1334aa5.js";import"./QueryTask-3d6cd9f2.js";import"./executeForIds-4ff99141.js";import"./floorFilterUtils-080a7cd2.js";let s=class extends w(I($(G(H(T(O(E(M(P(R(F(L(C))))))))))))){constructor(...e){super(...e),this.dateFieldsTimeReference=null,this.datesInUnknownTimezone=!1,this.dpi=96,this.gdbVersion=null,this.imageFormat="png24",this.imageMaxHeight=2048,this.imageMaxWidth=2048,this.imageTransparency=!0,this.isReference=null,this.labelsVisible=!1,this.operationalLayerType="ArcGISMapServiceLayer",this.preferredTimeReference=null,this.sourceJSON=null,this.sublayers=null,this.type="map-image",this.url=null}normalizeCtorArgs(e,a){return typeof e=="string"?{url:e,...a}:e}load(e){const a=N(e)?e.signal:null;return this.addResolvingPromise(this.loadFromPortal({supportedTypes:["Map Service"]},e).catch(j).then(()=>this._fetchService(a))),Promise.resolve(this)}readImageFormat(e,a){const l=a.supportedImageFormatTypes;return l&&l.includes("PNG32")?"png32":"png24"}writeSublayers(e,a,l,r){var h;if(!this.loaded||!e)return;const o=e.slice().reverse().flatten(({sublayers:t})=>t&&t.toArray().reverse()).toArray();let p=!1;if(this.capabilities&&this.capabilities.operations.supportsExportMap&&((h=this.capabilities.exportMap)!=null&&h.supportsDynamicLayers)){const t=b(r.origin);if(t===g.PORTAL_ITEM){const c=this.createSublayersForOrigin("service").sublayers;p=S(o,c,g.SERVICE)}else if(t>g.PORTAL_ITEM){const c=this.createSublayersForOrigin("portal-item");p=S(o,c.sublayers,b(c.origin))}}const m=[],d={writeSublayerStructure:p,...r};let y=p;o.forEach(t=>{const c=t.write({},d);m.push(c),y=y||t.originOf("visible")==="user"}),m.some(t=>Object.keys(t).length>1)&&(a.layers=m),y&&(a.visibleLayers=o.filter(t=>t.visible).map(t=>t.id))}createExportImageParameters(e,a,l,r){const o=r&&r.pixelRatio||1;e&&this.version>=10&&(e=e.clone().shiftCentralMeridian());const p=new Q({layer:this,floors:r==null?void 0:r.floors,scale:J({extent:e,width:a})*o}),m=p.toJSON();p.destroy();const d=!r||!r.rotation||this.version<10.3?{}:{rotation:-r.rotation},y=e&&e.spatialReference,h=y.wkid||JSON.stringify(y.toJSON());m.dpi*=o;const t={};if(r!=null&&r.timeExtent){const{start:c,end:u}=r.timeExtent.toJSON();t.time=c&&u&&c===u?""+c:`${c??"null"},${u??"null"}`}else this.timeInfo&&!this.timeInfo.hasLiveData&&(t.time="null,null");return{bbox:e&&e.xmin+","+e.ymin+","+e.xmax+","+e.ymax,bboxSR:h,imageSR:h,size:a+","+l,...m,...d,...t}}async fetchImage(e,a,l,r){const{data:o}=await this._fetchImage("image",e,a,l,r);return o}async fetchImageBitmap(e,a,l,r){const{data:o,url:p}=await this._fetchImage("blob",e,a,l,r);return Z(o,p)}async fetchRecomputedExtents(e={}){const a={...e,query:{returnUpdates:!0,f:"json",...this.customParameters,token:this.apiKey}},{data:l}=await f(this.url,a),{extent:r,fullExtent:o,timeExtent:p}=l,m=r||o;return{fullExtent:m&&U.fromJSON(m),timeExtent:p&&q.fromJSON({start:p[0],end:p[1]})}}loadAll(){return _(this,e=>{e(this.allSublayers)})}serviceSupportsSpatialReference(e){return k(this,e)}async _fetchImage(e,a,l,r,o){var d,y,h;const p={responseType:e,signal:(o==null?void 0:o.signal)??null,query:{...this.parsedUrl.query,...this.createExportImageParameters(a,l,r,o),f:"image",...this.refreshParameters,...this.customParameters,token:this.apiKey}},m=this.parsedUrl.path+"/export";if(((d=p.query)==null?void 0:d.dynamicLayers)!=null&&!((h=(y=this.capabilities)==null?void 0:y.exportMap)!=null&&h.supportsDynamicLayers))throw new v("mapimagelayer:dynamiclayer-not-supported",`service ${this.url} doesn't support dynamic layers, which is required to be able to change the sublayer's order, rendering, labeling or source.`,{query:p.query});try{const{data:t}=await f(m,p);return{data:t,url:m}}catch(t){throw A(t)?t:new v("mapimagelayer:image-fetch-error",`Unable to load image: ${m}`,{error:t})}}async _fetchService(e){if(this.sourceJSON)return void this.read(this.sourceJSON,{origin:"service",url:this.parsedUrl});const{data:a,ssl:l}=await f(this.parsedUrl.path,{query:{f:"json",...this.parsedUrl.query,...this.customParameters,token:this.apiKey},signal:e});l&&(this.url=this.url.replace(/^http:/i,"https:")),this.sourceJSON=a,this.read(a,{origin:"service",url:this.parsedUrl})}};i([n({type:x})],s.prototype,"dateFieldsTimeReference",void 0),i([n({type:Boolean})],s.prototype,"datesInUnknownTimezone",void 0),i([n()],s.prototype,"dpi",void 0),i([n()],s.prototype,"gdbVersion",void 0),i([n()],s.prototype,"imageFormat",void 0),i([V("imageFormat",["supportedImageFormatTypes"])],s.prototype,"readImageFormat",null),i([n({json:{origins:{service:{read:{source:"maxImageHeight"}}}}})],s.prototype,"imageMaxHeight",void 0),i([n({json:{origins:{service:{read:{source:"maxImageWidth"}}}}})],s.prototype,"imageMaxWidth",void 0),i([n()],s.prototype,"imageTransparency",void 0),i([n({type:Boolean,json:{read:!1,write:{enabled:!0,overridePolicy:()=>({enabled:!1})}}})],s.prototype,"isReference",void 0),i([n({json:{read:!1,write:!1}})],s.prototype,"labelsVisible",void 0),i([n({type:["ArcGISMapServiceLayer"]})],s.prototype,"operationalLayerType",void 0),i([n({json:{read:!1,write:!1}})],s.prototype,"popupEnabled",void 0),i([n({type:x})],s.prototype,"preferredTimeReference",void 0),i([n()],s.prototype,"sourceJSON",void 0),i([n({json:{write:{ignoreOrigin:!0}}})],s.prototype,"sublayers",void 0),i([z("sublayers",{layers:{type:[W]},visibleLayers:{type:[D]}})],s.prototype,"writeSublayers",null),i([n({type:["show","hide","hide-children"]})],s.prototype,"listMode",void 0),i([n({json:{read:!1},readOnly:!0,value:"map-image"})],s.prototype,"type",void 0),i([n(K)],s.prototype,"url",void 0),s=i([B("esri.layers.MapImageLayer")],s);const oe=s;export{oe as default};
