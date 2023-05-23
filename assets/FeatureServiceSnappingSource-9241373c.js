import{mA as M,th as R,ti as N,bC as x,de as U,e as s,y as r,b as _,f as k,w as u,cD as A,C as H,l as m,az as E,a2 as $,cL as z,h as S,tj as j,t as D,b0 as J,v as V,b1 as L,cm as Z,a0 as W,eL as q,be as G,c_ as B,f1 as Q,a7 as K,rb as X,ab as Y,cv as T,lk as g,dC as ee,ob as te,aW as ie,l2 as ne,b3 as C,tk as se,tl as re}from"./index-1b8c5637.js";import{y as ae}from"./elevationInfoUtils-c6fdc0e0.js";import{i as oe,p as le}from"./queryEngineUtils-de31dcbd.js";import{b as de}from"./TileTreeDebugger-85d501fa.js";import"./DimensionAnalysisView3D-3c53b5c2.js";import"./LineVisualElement-7f027040.js";import"./LengthDimension-1b7b3650.js";import"./Segment-12480e2d.js";import"./analysisViewUtils-780d595f.js";import"./ImageMaterial-7ce82e3a.js";import"./Factory-0eff498c.js";import"./RightAngleQuadVisualElement-74f16dee.js";import"./VisualElementResources-c19d06c6.js";import"./PointVisualElement-c97491d1.js";import"./colorUtils-c0f43caf.js";import"./EditGeometryOperations-f59fddde.js";import"./QueryEngineResult-a3e60b60.js";import"./WhereClause-3b5a65ae.js";import"./executionError-fb3f283a.js";import"./utils-81b4810e.js";import"./generateRendererUtils-4acfdc77.js";import"./json-48e3ea08.js";import"./dehydratedFeatureComparison-ba94cb88.js";import"./RenderTexture-02704a42.js";import"./VertexSnappingCandidate-3c390004.js";function I(e,t){return R(t.extent,F),N(F,x(pe,e.x,e.y,0))}const F=M(),pe=U();let c=class extends k{get tiles(){const t=this.tilesCoveringView,i=u(this.pointOfInterest)?this.pointOfInterest:this.view.center;return t.sort((a,n)=>I(i,a)-I(i,n)),t}_scaleEnabled(){return A(this.view.scale,this.layer.minScale||0,this.layer.maxScale||0)}get tilesCoveringView(){if(!this.view.ready||!this.view.featuresTilingScheme||!this.view.state||H(this.tileInfo))return[];if(!this._scaleEnabled)return[];const{spans:t,lodInfo:i}=this.view.featuresTilingScheme.getTileCoverage(this.view.state,0),{level:a}=i,n=[];for(const{row:l,colFrom:o,colTo:d}of t)for(let y=o;y<=d;y++){const w=i.normalizeCol(y),b=new $(null,a,l,w);this.tileInfo.updateTileInfo(b),n.push(b)}return n}get tileInfo(){var t;return((t=this.view.featuresTilingScheme)==null?void 0:t.tileInfo)??null}get tileSize(){return u(this.tileInfo)?this.tileInfo.size[0]:256}constructor(t){super(t),this.pointOfInterest=null}initialize(){this.addHandles(m(()=>{var t,i;return(i=(t=this.view)==null?void 0:t.state)==null?void 0:i.viewpoint},()=>this.notifyChange("tilesCoveringView"),E))}};s([r({readOnly:!0})],c.prototype,"tiles",null),s([r({readOnly:!0})],c.prototype,"_scaleEnabled",null),s([r({readOnly:!0})],c.prototype,"tilesCoveringView",null),s([r({readOnly:!0})],c.prototype,"tileInfo",null),s([r({readOnly:!0})],c.prototype,"tileSize",null),s([r({constructOnly:!0})],c.prototype,"view",void 0),s([r({constructOnly:!0})],c.prototype,"layer",void 0),s([r()],c.prototype,"pointOfInterest",void 0),c=s([_("esri.views.interactive.snapping.featureSources.featureServiceSource.FeatureServiceTiles2D")],c);let f=class extends z{get tiles(){const e=this.tilesCoveringView,t=this._effectivePointOfInterest;if(u(t)){const i=e.map(a=>I(t,a));for(let a=1;a<i.length;a++)if(i[a-1]>i[a])return e.sort((n,l)=>I(t,n)-I(t,l)),e.slice()}return e}get tilesCoveringView(){var e,t;return this._filterTiles((t=(e=this.view.featureTiles)==null?void 0:e.tiles)==null?void 0:t.toArray()).map(ue)}get tileInfo(){var e;return((e=this.view.featureTiles)==null?void 0:e.tilingScheme.toTileInfo())??null}get tileSize(){var e;return((e=this.view.featureTiles)==null?void 0:e.tileSize)??256}get _effectivePointOfInterest(){var t;const e=this.pointOfInterest;return u(e)?e:(t=this.view.pointsOfInterest)==null?void 0:t.focus.location}constructor(e){super(e),this.pointOfInterest=null}initialize(){this.handles.add(m(()=>this.view.featureTiles,e=>{this.handles.remove(P),e&&this.handles.add(e.addClient(),P)},S))}_filterTiles(e){return H(e)?[]:e.filter(t=>Math.abs(t.measures.screenRect[3]-t.measures.screenRect[1])>he&&t.measures.visibility===j.VISIBLE_ON_SURFACE)}};function ue({lij:[e,t,i],extent:a}){return new $(`${e}/${t}/${i}`,e,t,i,a)}s([r({readOnly:!0})],f.prototype,"tiles",null),s([r({readOnly:!0})],f.prototype,"tilesCoveringView",null),s([r({readOnly:!0})],f.prototype,"tileInfo",null),s([r({readOnly:!0})],f.prototype,"tileSize",null),s([r({constructOnly:!0})],f.prototype,"view",void 0),s([r()],f.prototype,"pointOfInterest",void 0),s([r()],f.prototype,"_effectivePointOfInterest",null),f=s([_("esri.views.interactive.snapping.featureSources.featureServiceSource.FeatureServiceTiles3D")],f);const he=50,P="feature-tiles";let O=class extends de{constructor(e){super(e),this._handles=new D}initialize(){const e=setInterval(()=>this._fetchDebugInfo(),2e3);this._handles.add(J(()=>clearInterval(e)))}destroy(){this._handles.destroy()}getTiles(){if(!this._debugInfo)return[];const e=new Map,t=new Map;this._debugInfo.storedTiles.forEach(n=>{e.set(n.data.id,n.featureCount)}),this._debugInfo.pendingTiles.forEach(n=>{e.set(n.data.id,n.featureCount),t.set(n.data.id,n.state)});const i=n=>{const l=t.get(n),o=e.get(n)??"?";return l?`${l}:${o}
${n}`:`store:${o}
${n}`},a=new Map;return this._debugInfo.storedTiles.forEach(n=>{a.set(n.data.id,n.data)}),this._debugInfo.pendingTiles.forEach(n=>{a.set(n.data.id,n.data)}),Array.from(a.values()).map(n=>({lij:[n.level,n.row,n.col],geometry:V.fromExtent(L(n.extent,this.view.spatialReference)),label:i(n.id)}))}_fetchDebugInfo(){this.handle.getDebugInfo(null).then(e=>{this._debugInfo=e,this.update()})}};s([r({constructOnly:!0})],O.prototype,"handle",void 0),O=s([_("esri.views.interactive.snapping.featureSources.WorkerTileTreeDebugger")],O);let p=class extends z{get updating(){return this.updatingHandles.updating||this._workerHandleUpdating}constructor(e){super(e),this.schedule=null,this.hasZ=!1,this.elevationAlignPointsInFeatures=async t=>{const i=[];for(const{points:a}of t)for(const{z:n}of a)i.push(n);return{elevations:i,drapedObjectIds:new Set,failedObjectIds:new Set}},this.queryForSymbologySnapping=async()=>({candidates:[],sourceCandidateIndices:[]}),this.availability=0,this._workerHandleUpdating=!0,this._editId=0}destroy(){this._workerHandle.destroy()}initialize(){this._workerHandle=new ce(this.schedule,{alignElevation:async(e,{signal:t})=>({result:await this.elevationAlignPointsInFeatures(e.points,t)}),getSymbologyCandidates:async(e,{signal:t})=>({result:await this.queryForSymbologySnapping(e,t)})}),this.handles.add([this._workerHandle.on("notify-updating",({updating:e})=>this._workerHandleUpdating=e),this._workerHandle.on("notify-availability",({availability:e})=>this._set("availability",e))])}async setup(e,t){var n;const i=this._serviceInfoFromLayer(e.layer);if(H(i))return;const a={configuration:this._convertConfiguration(e.configuration),serviceInfo:i,spatialReference:e.spatialReference.toJSON(),hasZ:this.hasZ,elevationInfo:(n=e.layer.elevationInfo)==null?void 0:n.toJSON()};await this.updatingHandles.addPromise(this._workerHandle.invokeMethod("setup",a,t)),this.updatingHandles.addPromise(this._workerHandle.invokeMethod("whenNotUpdating",{},t))}async configure(e,t){const i=this._convertConfiguration(e);await this.updatingHandles.addPromise(this._workerHandle.invokeMethod("configure",i,t)),this.updatingHandles.addPromise(this._workerHandle.invokeMethod("whenNotUpdating",{},t))}async refresh(e){await this.updatingHandles.addPromise(this._workerHandle.invokeMethod("refresh",{},e)),this.updatingHandles.addPromise(this._workerHandle.invokeMethod("whenNotUpdating",{},e))}async fetchCandidates(e,t){const i=e.point,a={distance:e.distance,mode:e.mode,point:Z(i[0],i[1],i[2],e.coordinateHelper.spatialReference.toJSON()),types:e.types,filter:u(e.filter)?e.filter.toJSON():null};return this._workerHandle.invoke(a,t)}async updateTiles(e,t){const i={tiles:e.tiles,tileInfo:u(e.tileInfo)?e.tileInfo.toJSON():null,tileSize:e.tileSize};await this.updatingHandles.addPromise(this._workerHandle.invokeMethod("updateTiles",i,t)),this.updatingHandles.addPromise(this._workerHandle.invokeMethod("whenNotUpdating",{},t))}async applyEdits(e,t){var o,d,y;const i=this._editId++,a={id:i};await this.updatingHandles.addPromise(this._workerHandle.invokeMethod("beginApplyEdits",a,t));const n=await this.updatingHandles.addPromise(W(e.result,t)),l={id:i,edits:{addedFeatures:((o=n.addedFeatures)==null?void 0:o.map(({objectId:w})=>w).filter(u))??[],deletedFeatures:((d=n.deletedFeatures)==null?void 0:d.map(({objectId:w,globalId:b})=>({objectId:w,globalId:b})))??[],updatedFeatures:((y=n.updatedFeatures)==null?void 0:y.map(({objectId:w})=>w).filter(u))??[]}};await this.updatingHandles.addPromise(this._workerHandle.invokeMethod("endApplyEdits",l,t)),this.updatingHandles.addPromise(this._workerHandle.invokeMethod("whenNotUpdating",{},t))}getDebugInfo(e){return this._workerHandle.invokeMethod("getDebugInfo",{},e)}async notifyElevationSourceChange(){await this._workerHandle.invokeMethod("notifyElevationSourceChange",{})}async notifySymbologyChange(){await this._workerHandle.invokeMethod("notifySymbologyChange",{})}async setSymbologySnappingSupported(e){await this._workerHandle.invokeMethod("setSymbologySnappingSupported",e)}_convertConfiguration(e){return{filter:u(e.filter)?e.filter.toJSON():null,customParameters:e.customParameters,viewType:e.viewType}}_serviceInfoFromLayer(e){var t,i;return e.geometryType==="multipatch"||e.geometryType==="mesh"?null:{url:((t=e.parsedUrl)==null?void 0:t.path)??"",fields:e.fields.map(a=>a.toJSON()),geometryType:q.toJSON(e.geometryType),capabilities:e.capabilities,objectIdField:e.objectIdField,globalIdField:e.globalIdField,spatialReference:e.spatialReference.toJSON(),timeInfo:(i=e.timeInfo)==null?void 0:i.toJSON()}}};s([r({constructOnly:!0})],p.prototype,"schedule",void 0),s([r({constructOnly:!0})],p.prototype,"hasZ",void 0),s([r({constructOnly:!0})],p.prototype,"elevationAlignPointsInFeatures",void 0),s([r({constructOnly:!0})],p.prototype,"queryForSymbologySnapping",void 0),s([r({readOnly:!0})],p.prototype,"updating",null),s([r({readOnly:!0})],p.prototype,"availability",void 0),s([r()],p.prototype,"_workerHandleUpdating",void 0),p=s([_("esri.views.interactive.snapping.featureSources.featureServiceSource.FeatureServiceSnappingSourceWorkerHandle")],p);class ce extends G{constructor(t,i){super("FeatureServiceSnappingSourceWorker","fetchCandidates",{},t,{strategy:"dedicated",client:i})}}let v=class extends k{get tiles(){return[new $("0/0/0",0,0,0,B(-1e8,-1e8,1e8,1e8))]}get tileInfo(){return new Q({origin:new K({x:-1e8,y:1e8,spatialReference:this.layer.spatialReference}),size:[512,512],lods:[new X({level:0,scale:1,resolution:390625})],spatialReference:this.layer.spatialReference})}get tileSize(){return this.tileInfo.size[0]}constructor(e){super(e),this.pointOfInterest=null}};s([r({readOnly:!0})],v.prototype,"tiles",null),s([r({readOnly:!0})],v.prototype,"tileInfo",null),s([r({readOnly:!0})],v.prototype,"tileSize",null),s([r({constructOnly:!0})],v.prototype,"layer",void 0),s([r()],v.prototype,"pointOfInterest",void 0),v=s([_("esri.views.interactive.snapping.featureSources.featureServiceSource.FeatureServiceTilesSimple")],v);let h=class extends Y(k){get _updateTilesParameters(){return{tiles:this._tilesOfInterest.tiles,tileInfo:this._tilesOfInterest.tileInfo,tileSize:this._tilesOfInterest.tileSize}}get updating(){var e;return((e=this._workerHandle)==null?void 0:e.updating)||this.updatingHandles.updating}get configuration(){const{view:e}=this,t=u(e)?e.type:"2d";return{filter:this._layer.createQuery(),customParameters:this._layer.customParameters,viewType:t}}get availability(){var e;return((e=this._workerHandle)==null?void 0:e.availability)??0}get _layer(){return this.layerSource.layer}constructor(e){super(e),this._workerHandle=null,this._debug=null}initialize(){let e;const t=this.view;if(u(t))switch(t.type){case"2d":this._tilesOfInterest=new c({view:t,layer:this._layer}),e=this._workerHandle=new p;break;case"3d":{const{resourceController:i}=t,a=this._layer,n=t.whenLayerView(a);this._tilesOfInterest=new f({view:t}),e=this._workerHandle=new p({schedule:o=>i.immediate.schedule(o),hasZ:this._layer.hasZ&&(this._layer.returnZ??!0),elevationAlignPointsInFeatures:async(o,d)=>{const y=await n;return T(d),y.elevationAlignPointsInFeatures(o,d)},queryForSymbologySnapping:async(o,d)=>{const y=await n;return T(d),y.queryForSymbologySnapping(o,d)}});const l=new re(null);n.then(o=>l.set(o)),this.addHandles([t.elevationProvider.on("elevation-change",({context:o})=>{const{elevationInfo:d}=a;ae(o,d)&&g(e.notifyElevationSourceChange())}),m(()=>a.elevationInfo,()=>g(e.notifyElevationSourceChange()),S),m(()=>ee(l.get(),({processor:o})=>o==null?void 0:o.renderer),()=>g(e.notifySymbologyChange()),S),m(()=>te(l.get(),!1,o=>o.symbologySnappingSupported),o=>g(e.setSymbologySnappingSupported(o)),S),ie(()=>{var o;return(o=ne(l.get()))==null?void 0:o.layer},["edits","apply-edits","graphic-update"],()=>e.notifySymbologyChange())]);break}}else this._tilesOfInterest=new v({layer:this._layer}),e=this._workerHandle=new p;this.handles.add([C(e)]),g(e.setup({layer:this._layer,spatialReference:this.spatialReference,configuration:this.configuration},null)),this.updatingHandles.add(()=>this._updateTilesParameters,()=>g(e.updateTiles(this._updateTilesParameters,null)),S),this.handles.add([m(()=>this.configuration,i=>g(e.configure(i,null)),E)]),u(t)&&this.handles.add(m(()=>se.FEATURE_SERVICE_SNAPPING_SOURCE_TILE_TREE_SHOW_TILES,i=>{i&&!this._debug?(this._debug=new O({view:t,handle:e}),this.handles.add(C(this._debug),"debug")):!i&&this._debug&&this.handles.remove("debug")},S)),this.handles.add(this.layerSource.layer.on("apply-edits",i=>{g(e.applyEdits(i,null))}))}refresh(){var e;(e=this._workerHandle)==null||e.refresh(null)}async fetchCandidates(e,t){const{coordinateHelper:i,point:a}=e;this._tilesOfInterest.pointOfInterest=i.arrayToPoint(a);const n=this._getGroundElevation;return(await this._workerHandle.fetchCandidates({...e},t)).candidates.map(l=>oe(l,n))}getDebugInfo(e){return this._workerHandle.getDebugInfo(e)}get _getGroundElevation(){return le(this.view)}};s([r({constructOnly:!0})],h.prototype,"spatialReference",void 0),s([r({constructOnly:!0})],h.prototype,"layerSource",void 0),s([r({constructOnly:!0})],h.prototype,"view",void 0),s([r()],h.prototype,"_tilesOfInterest",void 0),s([r({readOnly:!0})],h.prototype,"_updateTilesParameters",null),s([r({readOnly:!0})],h.prototype,"updating",null),s([r({readOnly:!0})],h.prototype,"configuration",null),s([r({readOnly:!0})],h.prototype,"availability",null),s([r()],h.prototype,"_getGroundElevation",null),h=s([_("esri.views.interactive.snapping.featureSources.FeatureServiceSnappingSource")],h);export{h as FeatureServiceSnappingSource};