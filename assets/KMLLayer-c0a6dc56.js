import{e1 as v,oI as G,eS as J,jZ as W,U,bh as M,dh as x,s5 as g,i4 as S,cc as A,aL as I,ac as D,lT as V,aW as _,az as w,l as C,cU as j,w as k,aK as L,s6 as q,R as F,e as i,y as a,s7 as H,aP as $,b as R,h1 as Q,r8 as Z,ra as B,r9 as X,mO as Y,mP as ee,mQ as te,cK as se,mM as re,a1 as ie,aQ as oe,mV as le,cP as ae}from"./index-70df4575.js";const ne={esriGeometryPoint:"points",esriGeometryPolyline:"polylines",esriGeometryPolygon:"polygons"};function T(e){const t=e.folders||[],r=t.slice(),s=new Map,o=new Map,d=new Map,c=new Map,b=new Map,f={esriGeometryPoint:o,esriGeometryPolyline:d,esriGeometryPolygon:c};(e.featureCollection&&e.featureCollection.layers||[]).forEach(l=>{const u=v(l);u.featureSet.features=[];const p=l.featureSet.geometryType;s.set(p,u);const E=l.layerDefinition.objectIdField;p==="esriGeometryPoint"?P(o,E,l.featureSet.features):p==="esriGeometryPolyline"?P(d,E,l.featureSet.features):p==="esriGeometryPolygon"&&P(c,E,l.featureSet.features)}),e.groundOverlays&&e.groundOverlays.forEach(l=>{b.set(l.id,l)}),t.forEach(l=>{l.networkLinkIds.forEach(u=>{const p=ye(u,l.id,e.networkLinks);p&&r.push(p)})}),r.forEach(l=>{if(l.featureInfos){l.points=v(s.get("esriGeometryPoint")),l.polylines=v(s.get("esriGeometryPolyline")),l.polygons=v(s.get("esriGeometryPolygon")),l.mapImages=[];for(const u of l.featureInfos)switch(u.type){case"esriGeometryPoint":case"esriGeometryPolyline":case"esriGeometryPolygon":{const p=f[u.type].get(u.id);p&&l[ne[u.type]].featureSet.features.push(p);break}case"GroundOverlay":{const p=b.get(u.id);p&&l.mapImages.push(p);break}}l.fullExtent=O([l])}});const h=O(r);return{folders:t,sublayers:r,extent:h}}function K(e,t,r,s){const o=G&&G.findCredential(e);e=J(e,{token:o&&o.token});const d=W.kmlServiceUrl;return U(d,{query:{url:e,model:"simple",folders:"",refresh:r!==0||void 0,outSR:JSON.stringify(t)},responseType:"json",signal:s})}function N(e,t,r=null,s=[]){const o=[],d={},c=t.sublayers,b=t.folders.map(f=>f.id);return c.forEach(f=>{var l;const h=new e;if(r?h.read(f,r):h.read(f),s.length&&b.includes(h.id)&&(h.visible=s.includes(h.id)),d[f.id]=h,f.parentFolderId!=null&&f.parentFolderId!==-1){const u=d[f.parentFolderId];u.sublayers||(u.sublayers=[]),(l=u.sublayers)==null||l.unshift(h)}else o.unshift(h)}),o}function P(e,t,r){r.forEach(s=>{e.set(s.attributes[t],s)})}function ue(e,t){let r;return t.some(s=>s.id===e&&(r=s,!0)),r}function ye(e,t,r){const s=ue(e,r);return s&&(s.parentFolderId=t,s.networkLink=s),s}function O(e){const t=M(x),r=M(x);for(const s of e){if(s.polygons&&s.polygons.featureSet&&s.polygons.featureSet.features)for(const o of s.polygons.featureSet.features)g(t,o.geometry),S(r,t);if(s.polylines&&s.polylines.featureSet&&s.polylines.featureSet.features)for(const o of s.polylines.featureSet.features)g(t,o.geometry),S(r,t);if(s.points&&s.points.featureSet&&s.points.featureSet.features)for(const o of s.points.featureSet.features)g(t,o.geometry),S(r,t);if(s.mapImages)for(const o of s.mapImages)g(t,o.extent),S(r,t)}return A(r,x)?void 0:{xmin:r[0],ymin:r[1],zmin:r[2],xmax:r[3],ymax:r[4],zmax:r[5],spatialReference:I.WGS84}}var m;let y=m=class extends D.EventedMixin(V(Q)){constructor(...e){super(...e),this.description=null,this.id=null,this.networkLink=null,this.sublayers=null,this.title=null,this.sourceJSON=null,this.fullExtent=null,this.addHandles([_(()=>this.sublayers,"after-add",({item:t})=>{t.parent=this,t.layer=this.layer},w),_(()=>this.sublayers,"after-remove",({item:t})=>{t.layer=t.parent=null},w),C(()=>this.sublayers,(t,r)=>{if(r)for(const s of r)s.layer=s.parent=null;if(t)for(const s of t)s.parent=this,s.layer=this.layer},w)])}initialize(){j(()=>this.networkLink).then(()=>j(()=>this.visible===!0)).then(()=>this.load())}load(e){var s;if(!this.networkLink||this.networkLink.viewFormat)return;const t=k(e)?e.signal:null,r=this._fetchService(((s=this._get("networkLink"))==null?void 0:s.href)??"",t).then(o=>{var b;const d=O(o.sublayers);this.fullExtent=L.fromJSON(d),this.sourceJSON=o;const c=q(F.ofType(m),N(m,o));this.sublayers?this.sublayers.addMany(c):this.sublayers=c,(b=this.layer)==null||b.emit("sublayer-update"),this.layer&&this.layer.notifyChange("visibleSublayers")});return this.addResolvingPromise(r),Promise.resolve(this)}get visible(){return this._get("visible")}set visible(e){this._get("visible")!==e&&(this._set("visible",e),this.layer&&this.layer.notifyChange("visibleSublayers"))}readVisible(e,t){return!!t.visibility}set layer(e){this._set("layer",e),this.sublayers&&this.sublayers.forEach(t=>t.layer=e)}_fetchService(e,t){return K(e,this.layer.outSpatialReference,this.layer.refreshInterval,t).then(r=>T(r.data))}};i([a()],y.prototype,"description",void 0),i([a()],y.prototype,"id",void 0),i([a({readOnly:!0,value:null})],y.prototype,"networkLink",void 0),i([a({json:{write:{allowNull:!0}}})],y.prototype,"parent",void 0),i([a({type:F.ofType(m),json:{write:{allowNull:!0}}})],y.prototype,"sublayers",void 0),i([a({value:null,json:{read:{source:"name",reader:e=>H(e)}}})],y.prototype,"title",void 0),i([a({value:!0})],y.prototype,"visible",null),i([$("visible",["visibility"])],y.prototype,"readVisible",null),i([a()],y.prototype,"sourceJSON",void 0),i([a({value:null})],y.prototype,"layer",null),i([a({type:L})],y.prototype,"fullExtent",void 0),y=m=i([R("esri.layers.support.KMLSublayer")],y);const z=y,pe=["kml","xml"];let n=class extends Z(B(X(Y(ee(te(ae)))))){constructor(...e){super(...e),this._visibleFolders=[],this.allSublayers=new se({getCollections:()=>[this.sublayers],getChildrenFunction:t=>t.sublayers}),this.outSpatialReference=I.WGS84,this.path=null,this.legendEnabled=!1,this.operationalLayerType="KML",this.sublayers=null,this.type="kml",this.url=null}initialize(){this.addHandles([C(()=>this.sublayers,(e,t)=>{t&&t.forEach(r=>{r.parent=null,r.layer=null}),e&&e.forEach(r=>{r.parent=this,r.layer=this})},w),this.on("sublayer-update",()=>this.notifyChange("fullExtent"))])}normalizeCtorArgs(e,t){return typeof e=="string"?{url:e,...t}:e}readSublayersFromItemOrWebMap(e,t){this._visibleFolders=t.visibleFolders}readSublayers(e,t,r){return N(z,t,r,this._visibleFolders)}writeSublayers(e,t){const r=[],s=e.toArray();for(;s.length;){const o=s[0];o.networkLink||(o.visible&&r.push(o.id),o.sublayers&&s.push(...o.sublayers.toArray())),s.shift()}t.visibleFolders=r}get title(){const e=this._get("title");return e&&this.originOf("title")!=="defaults"?e:this.url?re(this.url,pe)||"KML":e||""}set title(e){this._set("title",e)}get visibleSublayers(){const e=this.sublayers,t=[],r=s=>{s.visible&&(t.push(s),s.sublayers&&s.sublayers.forEach(r))};return e&&e.forEach(r),t}get fullExtent(){return this._recomputeFullExtent()}load(e){const t=k(e)?e.signal:null;return this.addResolvingPromise(this.loadFromPortal({supportedTypes:["KML"],supportsData:!1},e).catch(ie).then(()=>this._fetchService(t))),Promise.resolve(this)}destroy(){super.destroy(),this.allSublayers.destroy()}async _fetchService(e){const t=await Promise.resolve().then(()=>this.resourceInfo?{ssl:!1,data:this.resourceInfo}:K(this.url??"",this.outSpatialReference,this.refreshInterval,e)),r=T(t.data);r&&this.read(r,{origin:"service"})}_recomputeFullExtent(){let e=null;k(this.extent)&&(e=this.extent.clone());const t=r=>{if(r.sublayers)for(const s of r.sublayers.items)t(s),s.visible&&s.fullExtent&&(k(e)?e.union(s.fullExtent):e=s.fullExtent.clone())};return t(this),e}};i([a({readOnly:!0})],n.prototype,"allSublayers",void 0),i([a({type:I})],n.prototype,"outSpatialReference",void 0),i([a({type:String,json:{origins:{"web-scene":{read:!0,write:!0}},read:!1}})],n.prototype,"path",void 0),i([a({readOnly:!0,json:{read:!1,write:!1}})],n.prototype,"legendEnabled",void 0),i([a({type:["show","hide","hide-children"]})],n.prototype,"listMode",void 0),i([a({type:["KML"]})],n.prototype,"operationalLayerType",void 0),i([a({})],n.prototype,"resourceInfo",void 0),i([a({type:F.ofType(z),json:{write:{ignoreOrigin:!0}}})],n.prototype,"sublayers",void 0),i([$(["web-map","portal-item"],"sublayers",["visibleFolders"])],n.prototype,"readSublayersFromItemOrWebMap",null),i([$("service","sublayers",["sublayers"])],n.prototype,"readSublayers",null),i([oe("sublayers")],n.prototype,"writeSublayers",null),i([a({readOnly:!0,json:{read:!1}})],n.prototype,"type",void 0),i([a({json:{origins:{"web-map":{read:{source:"title"}}},write:{ignoreOrigin:!0}}})],n.prototype,"title",null),i([a(le)],n.prototype,"url",void 0),i([a({readOnly:!0})],n.prototype,"visibleSublayers",null),i([a({type:L})],n.prototype,"extent",void 0),i([a()],n.prototype,"fullExtent",null),n=i([R("esri.layers.KMLLayer")],n);const he=n;export{he as default};
