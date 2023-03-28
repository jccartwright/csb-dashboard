import{mN as v,mO as m,mP as w,mQ as g,mR as _,hD as f,w as p,T,a1 as S,U as d,mS as $,mT as I,_ as c,cv as h,e as o,y as s,aP as O,mU as D,mV as b,b as E,cP as A}from"./index-70df4575.js";import{s as P}from"./ArcGISCachedService-1f1a227f.js";import"./TilemapCache-efae9634.js";let a=class extends P(v(m(w(g(A))))){constructor(...e){super(...e),this.copyright=null,this.heightModelInfo=null,this.path=null,this.minScale=void 0,this.maxScale=void 0,this.opacity=1,this.operationalLayerType="ArcGISTiledElevationServiceLayer",this.sourceJSON=null,this.type="elevation",this.url=null,this.version=null,this._lercDecoder=_()}normalizeCtorArgs(e,r){return typeof e=="string"?{url:e,...r}:e}destroy(){this._lercDecoder=f(this._lercDecoder)}readVersion(e,r){let t=r.currentVersion;return t||(t=9.3),t}load(e){const r=p(e)?e.signal:null;return this.addResolvingPromise(this.loadFromPortal({supportedTypes:["Image Service"],supportsData:!1,validateItem:t=>{for(let i=0;i<t.typeKeywords.length;i++)if(t.typeKeywords[i].toLowerCase()==="elevation 3d layer")return!0;throw new T("portal:invalid-layer-item-type","Invalid layer item type '${type}', expected '${expectedType}' ",{type:"Image Service",expectedType:"Image Service Elevation 3D Layer"})}},e).catch(S).then(()=>this._fetchImageService(r))),Promise.resolve(this)}fetchTile(e,r,t,i){const l=p((i=i||{signal:null}).signal)?i.signal:i.signal=new AbortController().signal,y={responseType:"array-buffer",signal:l},u={noDataValue:i.noDataValue,returnFileInfo:!0};return this.load().then(()=>this._fetchTileAvailability(e,r,t,i)).then(()=>d(this.getTileUrl(e,r,t),y)).then(n=>this._lercDecoder.decode(n.data,u,l)).then(n=>new $(n))}getTileUrl(e,r,t){const i=!this.tilemapCache&&this.supportsBlankTile,l=I({...this.parsedUrl.query,blankTile:!i&&null});return`${this.parsedUrl.path}/tile/${e}/${r}/${t}${l?"?"+l:""}`}async queryElevation(e,r){const{ElevationQuery:t}=await c(()=>import("./ElevationQuery-1f101113.js"),["assets/ElevationQuery-1f101113.js","assets/index-70df4575.js","assets/index-c56bc7db.css"]);return h(r),new t().query(this,e,r)}async createElevationSampler(e,r){const{ElevationQuery:t}=await c(()=>import("./ElevationQuery-1f101113.js"),["assets/ElevationQuery-1f101113.js","assets/index-70df4575.js","assets/index-c56bc7db.css"]);return h(r),new t().createSampler(this,e,r)}_fetchTileAvailability(e,r,t,i){return this.tilemapCache?this.tilemapCache.fetchAvailability(e,r,t,i):Promise.resolve("unknown")}async _fetchImageService(e){var i;if(this.sourceJSON)return this.sourceJSON;const r={query:{f:"json",...this.parsedUrl.query},responseType:"json",signal:e},t=await d(this.parsedUrl.path,r);t.ssl&&(this.url=(i=this.url)==null?void 0:i.replace(/^http:/i,"https:")),this.sourceJSON=t.data,this.read(t.data,{origin:"service",url:this.parsedUrl})}get hasOverriddenFetchTile(){return!this.fetchTile.__isDefault__}};o([s({json:{read:{source:"copyrightText"}}})],a.prototype,"copyright",void 0),o([s({readOnly:!0,type:D})],a.prototype,"heightModelInfo",void 0),o([s({type:String,json:{origins:{"web-scene":{read:!0,write:!0}},read:!1}})],a.prototype,"path",void 0),o([s({type:["show","hide"]})],a.prototype,"listMode",void 0),o([s({json:{read:!1,write:!1,origins:{service:{read:!1,write:!1},"portal-item":{read:!1,write:!1},"web-document":{read:!1,write:!1}}},readOnly:!0})],a.prototype,"minScale",void 0),o([s({json:{read:!1,write:!1,origins:{service:{read:!1,write:!1},"portal-item":{read:!1,write:!1},"web-document":{read:!1,write:!1}}},readOnly:!0})],a.prototype,"maxScale",void 0),o([s({json:{read:!1,write:!1,origins:{"web-document":{read:!1,write:!1}}}})],a.prototype,"opacity",void 0),o([s({type:["ArcGISTiledElevationServiceLayer"]})],a.prototype,"operationalLayerType",void 0),o([s()],a.prototype,"sourceJSON",void 0),o([s({json:{read:!1},value:"elevation",readOnly:!0})],a.prototype,"type",void 0),o([s(b)],a.prototype,"url",void 0),o([s()],a.prototype,"version",void 0),o([O("version",["currentVersion"])],a.prototype,"readVersion",null),a=o([E("esri.layers.ElevationLayer")],a),a.prototype.fetchTile.__isDefault__=!0;const j=a;export{j as default};
