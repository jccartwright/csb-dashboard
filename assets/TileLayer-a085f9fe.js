import{r8 as v,r9 as g,mO as _,mP as S,mN as T,mQ as b,ab as w,ra as O,rd as $,rq as P,w as d,a1 as R,aL as f,g8 as U,U as u,mT as L,re as W,T as h,mK as A,hp as D,g7 as j,eg as B,e as i,y as l,aP as C,aQ as N,lU as I,mV as M,b as k,cP as J}from"./index-1b8c5637.js";import{s as q}from"./ArcGISCachedService-5a33385c.js";import{E as G,y as V,Z as E}from"./SublayersOwner-ed2fe372.js";import{e as K}from"./imageBitmapUtils-858facaf.js";import"./TilemapCache-918ac228.js";import"./QueryTask-70b2bf38.js";import"./executeForIds-718b3472.js";import"./sublayerUtils-b3127c30.js";const y=["Canvas/World_Dark_Gray_Base","Canvas/World_Dark_Gray_Reference","Canvas/World_Light_Gray_Base","Canvas/World_Light_Gray_Reference","Elevation/World_Hillshade","Elevation/World_Hillshade_Dark","Ocean/World_Ocean_Base","Ocean/World_Ocean_Reference","Ocean_Basemap","Reference/World_Boundaries_and_Places","Reference/World_Boundaries_and_Places_Alternate","Reference/World_Transportation","World_Imagery","World_Street_Map","World_Topo_Map"];let s=class extends v(G(g(_(S(q(V(T(b(w(O($(P(J))))))))))))){constructor(...e){super(...e),this.listMode="show",this.isReference=null,this.operationalLayerType="ArcGISTiledMapServiceLayer",this.resampling=!0,this.sourceJSON=null,this.spatialReference=null,this.path=null,this.sublayers=null,this.type="tile",this.url=null}normalizeCtorArgs(e,r){return typeof e=="string"?{url:e,...r}:e}load(e){const r=d(e)?e.signal:null;return this.addResolvingPromise(this.loadFromPortal({supportedTypes:["Map Service"]},e).catch(R).then(()=>this._fetchService(r))),Promise.resolve(this)}get attributionDataUrl(){var r;const e=(r=this.parsedUrl)==null?void 0:r.path.toLowerCase();return e?this._getDefaultAttribution(this._getMapName(e)):null}readSpatialReference(e,r){return(e=e||r.tileInfo&&r.tileInfo.spatialReference)&&f.fromJSON(e)}writeSublayers(e,r,t,a){if(!this.loaded||!e)return;const p=e.slice().reverse().flatten(({sublayers:n})=>n&&n.toArray().reverse()).toArray(),o=[],c={writeSublayerStructure:!1,...a};p.forEach(n=>{const m=n.write({},c);o.push(m)}),o.some(n=>Object.keys(n).length>1)&&(r.layers=o)}get tileServers(){var e;return this._getDefaultTileServers((e=this.parsedUrl)==null?void 0:e.path)}castTileServers(e){return Array.isArray(e)?e.map(r=>U(r).path):null}fetchTile(e,r,t,a={}){const{signal:p}=a,o=this.getTileUrl(e,r,t),c={responseType:"image",signal:p,query:{...this.refreshParameters}};return u(o,c).then(n=>n.data)}async fetchImageBitmapTile(e,r,t,a={}){const{signal:p}=a,o=this.getTileUrl(e,r,t),c={responseType:"blob",signal:p,query:{...this.refreshParameters}},{data:n}=await u(o,c);return K(n,o)}getTileUrl(e,r,t){var c,n;const a=!this.tilemapCache&&this.supportsBlankTile,p=L({...(c=this.parsedUrl)==null?void 0:c.query,blankTile:!a&&null,...this.customParameters,token:this.apiKey}),o=this.tileServers;return`${o&&o.length?o[r%o.length]:(n=this.parsedUrl)==null?void 0:n.path}/tile/${e}/${r}/${t}${p?"?"+p:""}`}loadAll(){return W(this,e=>{e(this.allSublayers)})}_fetchService(e){return new Promise((r,t)=>{if(this.sourceJSON){if(this.sourceJSON.bandCount!=null&&this.sourceJSON.pixelSizeX!=null)throw new h("tile-layer:unsupported-url","use ImageryTileLayer to open a tiled image service");return void r({data:this.sourceJSON})}if(!this.parsedUrl)throw new h("tile-layer:undefined-url","layer's url is not defined");const a=A(this.parsedUrl.path);if(d(a)&&a.serverType==="ImageServer")throw new h("tile-layer:unsupported-url","use ImageryTileLayer to open a tiled image service");u(this.parsedUrl.path,{query:{f:"json",...this.parsedUrl.query,...this.customParameters,token:this.apiKey},responseType:"json",signal:e}).then(r,t)}).then(r=>{let t=this.url;if(r.ssl&&(t=this.url=t.replace(/^http:/i,"https:")),this.sourceJSON=r.data,this.read(r.data,{origin:"service",url:this.parsedUrl}),this.version===10.1&&!D(t))return this._fetchServerVersion(t,e).then(a=>{this.read({currentVersion:a})}).catch(()=>{})})}_fetchServerVersion(e,r){if(!j(e))return Promise.reject();const t=e.replace(/(.*\/rest)\/.*/i,"$1")+"/info";return u(t,{query:{f:"json",...this.customParameters,token:this.apiKey},responseType:"json",signal:r}).then(a=>{if(a.data&&a.data.currentVersion)return a.data.currentVersion;throw new h("tile-layer:version-not-available")})}_getMapName(e){const r=e.match(/^(?:https?:)?\/\/(server\.arcgisonline\.com|services\.arcgisonline\.com|ibasemaps-api\.arcgis\.com)\/arcgis\/rest\/services\/([^\/]+(\/[^\/]+)*)\/mapserver/i);return r?r[2]:void 0}_getDefaultAttribution(e){if(e==null)return null;let r;e=e.toLowerCase();for(let t=0,a=y.length;t<a;t++)if(r=y[t],r.toLowerCase().includes(e))return B("//static.arcgis.com/attribution/"+r);return null}_getDefaultTileServers(e){if(e==null)return[];const r=e.search(/^(?:https?:)?\/\/server\.arcgisonline\.com/i)!==-1,t=e.search(/^(?:https?:)?\/\/services\.arcgisonline\.com/i)!==-1;return r||t?[e,e.replace(r?/server\.arcgisonline/i:/services\.arcgisonline/i,r?"services.arcgisonline":"server.arcgisonline")]:[]}get hasOverriddenFetchTile(){return!this.fetchTile.__isDefault__}};i([l({readOnly:!0})],s.prototype,"attributionDataUrl",null),i([l({type:["show","hide","hide-children"]})],s.prototype,"listMode",void 0),i([l({json:{read:!0,write:!0}})],s.prototype,"blendMode",void 0),i([l({type:Boolean,json:{read:!1,write:{enabled:!0,overridePolicy:()=>({enabled:!1})}}})],s.prototype,"isReference",void 0),i([l({readOnly:!0,type:["ArcGISTiledMapServiceLayer"]})],s.prototype,"operationalLayerType",void 0),i([l({type:Boolean})],s.prototype,"resampling",void 0),i([l()],s.prototype,"sourceJSON",void 0),i([l({type:f})],s.prototype,"spatialReference",void 0),i([C("spatialReference",["spatialReference","tileInfo"])],s.prototype,"readSpatialReference",null),i([l({type:String,json:{origins:{"web-scene":{read:!0,write:!0}},read:!1}})],s.prototype,"path",void 0),i([l({readOnly:!0})],s.prototype,"sublayers",void 0),i([N("sublayers",{layers:{type:[E]}})],s.prototype,"writeSublayers",null),i([l({json:{read:!1,write:!1}})],s.prototype,"popupEnabled",void 0),i([l()],s.prototype,"tileServers",null),i([I("tileServers")],s.prototype,"castTileServers",null),i([l({readOnly:!0,json:{read:!1}})],s.prototype,"type",void 0),i([l(M)],s.prototype,"url",void 0),s=i([k("esri.layers.TileLayer")],s),s.prototype.fetchTile.__isDefault__=!0;const ee=s;export{ee as default};