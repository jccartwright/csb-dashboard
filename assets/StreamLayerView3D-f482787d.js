import{e as r,y as o,b as h,ab as $,aa as k,f as T,a as f,eL as x,l as g,w as u,J as P,al as U,ax as R,T as E,aj as j}from"./index-70df4575.js";import{n as G}from"./StreamFeatureManager-7f8638f8.js";import{createConnection as V}from"./createConnection-e04d52bf.js";import{r as L}from"./EventedSet-4fe850fc.js";import{w as C}from"./FeatureLikeLayerView3D-3d0f4951.js";import{n as F}from"./LayerView3D-deb29fb7.js";import{u as N}from"./LayerView-1d2a8e3f.js";import"./dehydratedFeatureComparison-405974ca.js";import"./queryForSymbologySnapping-b8dd966f.js";import"./elevationInfoUtils-be5b121e.js";import"./hash-0ddfbf4b.js";import"./Graphics3DObjectStates-c1359da3.js";import"./optimizedFeatureQueryEngineAdapter-8953d0c8.js";import"./centroid-7ed31885.js";import"./PooledRBush-f1f7a72b.js";import"./quickselect-56c5966e.js";import"./floorFilterUtils-080a7cd2.js";import"./QueryEngine-57c5e626.js";import"./QueryEngineResult-9a9d9eff.js";import"./WhereClause-dd0f9833.js";import"./executionError-fb3f283a.js";import"./utils-0de650ba.js";import"./generateRendererUtils-55300279.js";import"./json-48e3ea08.js";import"./QueryEngineCapabilities-42e44ded.js";import"./FeatureStore-00ace637.js";import"./BoundsStore-ed029c75.js";import"./projectExtentUtils-e466aaef.js";const J=2500;let p=class extends P{getObjectId(){return this.objectId}};r([o({type:Number,json:{read:!0}})],p.prototype,"objectId",void 0),p=r([h("esri.layers.graphics.controllers.StreamGraphic")],p);class z{constructor(t){this.onUpdate=t,this._idToGraphic=new Map}destroy(){this._idToGraphic.clear()}add(t){this._idToGraphic.set(t.objectId,t)}get(t){return this._idToGraphic.get(t)}forEach(t){this._idToGraphic.forEach(t)}removeById(t){const s=this._idToGraphic.get(t);return s?(s.sourceLayer=s.layer=null,this._idToGraphic.delete(t),s):null}update(t,s){this.onUpdate(t,s)}get size(){return this._idToGraphic.size}}let a=class extends $(k(T)){constructor(){super(...arguments),this.isPaused=!1,this.graphics=new L,this._updateInfo={websocket:0,client:0},this._updateIntervalId=null,this._outSpatialReference=null}initialize(){this.addResolvingPromise(this.layer.when(()=>this._startup()))}destroy(){this.clear()}_clearInterval(){this._updateIntervalId!==null&&(clearInterval(this._updateIntervalId),this._updateIntervalId=null)}clear(){this._clearInterval(),this.connection=f(this.connection),this.store=f(this.store),this.graphics.clear(),this.handles.removeAll()}get updating(){return!this.connection||this.connection.connectionStatus==="connected"}_startup(){const{layer:e,layerView:t}=this,{spatialReference:s,definitionExpression:i,geometryDefinition:l,objectIdField:d,timeInfo:v,purgeOptions:_,maxReconnectionAttempts:I,maxReconnectionInterval:w,customParameters:S}=e,b=e.geometryType?x.toJSON(e.geometryType):null,O=s,m=t.view.spatialReference,M={geometry:l,where:i};this.clear(),this._set("connection",V(e.parsedUrl,O,m,b,M,I,w,S??void 0)),this._outSpatialReference=m.toJSON(),this.store=new z(this._onUpdate.bind(this)),this.featuresManager=new G(this.store,d,v.toJSON(),_);const y="startup-watches";this.handles.remove(y),this.handles.add([e.on("send-message-to-socket",c=>this.connection.sendMessageToSocket(c)),e.on("send-message-to-client",c=>this.connection.sendMessageToClient(c)),this.connection.on("data-received",c=>this._onFeature(c)),this.connection.on("message-received",c=>this._onWebSocketMessage(c)),g(()=>[e.definitionExpression,e.geometryDefinition,e.purgeOptions],()=>this._startup())],y),this._initUpdateInterval()}_onWebSocketMessage(e){if(this.layerView.emit("message-received",e),"type"in e)switch(e.type){case"delete":if(e.objectIds)for(const t of e.objectIds)this.featuresManager.removeById(t);if(e.trackIds)for(const t of e.trackIds)this.featuresManager.removeByTrackId(t);break;case"clear":this.store.forEach(t=>this.featuresManager.removeById(t.objectId))}}_onFeature(e){this._updateInfo.websocket++,this.layerView.hasEventListener("data-received")&&this.layerView.emit("data-received",{attributes:e.attributes,centroid:e.centroid,geometry:e.geometry});try{u(e.geometry)&&!e.geometry.spatialReference&&(e.geometry.spatialReference=this._outSpatialReference);const t=p.fromJSON(e);t.sourceLayer=t.layer=this.layer,this.featuresManager.add(t)}catch{}}_onUpdate(e,t){u(t)&&this.graphics.removeMany(t),u(e)&&(this._updateInfo.client+=e.length,this.graphics.addMany(e))}_initUpdateInterval(){this._clearInterval();const{updateInterval:e}=this.layer;let t=performance.now();this._updateIntervalId=setInterval(()=>{const s=performance.now(),i=s-t;if(i>J){t=s;const l=Math.round(this._updateInfo.client/(i/1e3)),d=Math.round(this._updateInfo.websocket/(i/1e3));this._updateInfo.client=0,this._updateInfo.websocket=0,this.layerView.emit("update-rate",{client:l,websocket:d})}this.featuresManager.checkForUpdates()},e)}pauseStream(){this.isPaused=!0,this._clearInterval()}resumeStream(){this.isPaused=!1,this._initUpdateInterval()}};r([o()],a.prototype,"isPaused",void 0),r([o({constructOnly:!0})],a.prototype,"layer",void 0),r([o({constructOnly:!0})],a.prototype,"layerView",void 0),r([o()],a.prototype,"connection",void 0),r([o({readOnly:!0})],a.prototype,"updating",null),a=r([h("esri.layers.graphics.controllers.StreamController")],a);const B=e=>{let t=class extends e{constructor(...s){super(...s),this.connectionError=null,this.filter=null}get connectionStatus(){var s,i,l;return(s=this.controller)!=null&&s.isPaused?"paused":((l=(i=this.controller)==null?void 0:i.connection)==null?void 0:l.connectionStatus)??"disconnected"}};return r([o({readOnly:!0})],t.prototype,"connectionError",void 0),r([o({readOnly:!0})],t.prototype,"connectionStatus",null),r([o({type:U})],t.prototype,"filter",void 0),t=r([h("esri.layers.mixins.StreamLayerView")],t),t};let n=class extends B(C(F(N))){constructor(){super(...arguments),this.type="stream-3d",this.updatePolicy=R.ASYNC,this.hasZ=!0,this.hasM=!1,this._isUserPaused=!1}initialize(){this.handles.add(g(()=>this.suspended,e=>{this.controller&&(e?this.controller.pauseStream():this._isUserPaused||this.controller.resumeStream())}))}get connectionError(){const e=this.get("controller.connection.errorString");if(e)return new E("stream-controller",e)}pause(){this._isUserPaused=!0,this.controller.pauseStream()}resume(){this._isUserPaused=!1,this.controller.resumeStream()}createQuery(){return new j({outFields:["*"],returnGeometry:!0,outSpatialReference:this.view.spatialReference})}queryLatestObservations(e,t){return this.queryEngine.executeQueryForLatestObservations(this._ensureQuery(e),t==null?void 0:t.signal)}createController(){return new a({layer:this.layer,layerView:this})}beforeSetController(){}};r([o({readOnly:!0})],n.prototype,"updatePolicy",void 0),r([o({readOnly:!0})],n.prototype,"connectionError",null),r([o()],n.prototype,"controller",void 0),r([o({readOnly:!0})],n.prototype,"hasZ",void 0),r([o({readOnly:!0})],n.prototype,"hasM",void 0),n=r([h("esri.views.3d.layers.StreamLayerView3D")],n);const _e=n;export{_e as default};
