import{gf as S,gg as E,gh as W,dc as k,df as B,gi as K,b5 as Y,b6 as p,b7 as C,a$ as Z,ax as J,aC as Q,m as M,i as _,b0 as X,C as G,gj as ee,a3 as D,M as te,aK as N,cC as ae,dA as ie,am as H,dx as se,av as re,at as U,g0 as $,w as j,b2 as O,bb as ne,bc as z,a4 as oe,gk as R,cv as V,b8 as he,co as le,gl as de,cU as ce,e as x,y as v,b as ge}from"./index-70df4575.js";import{n as ue}from"./LayerView3D-deb29fb7.js";import{l as me}from"./projectExtentUtils-e466aaef.js";import{c as fe}from"./ImageMaterial-dd97e8ad.js";import{u as pe}from"./LayerView-1d2a8e3f.js";import{i as ye}from"./RefreshableLayerView-158cf695.js";function we(a,e,t){const s=S(a)/E(a),i={width:t,height:t};return s>1.0001?i.height=t/s:s<.9999&&(i.width=t*s),i.width=Math.round(i.width/(S(a)/S(e))),i.height=Math.round(i.height/(E(a)/E(e))),i}function q(a,e){return W(a,[[e[0],e[1],-1],[e[2],e[1],-1],[e[2],e[3],-1],[e[0],e[3],-1]])}function xe(a,e,t){if(!k(e,t))return q(a,t);const s=[e[1]-t[1],Math.min(e[3],t[3])-Math.max(e[1],t[1]),t[3]-e[3],123456],i=[e[0]-t[0],Math.min(e[2],t[2])-Math.max(e[0],t[0]),t[2]-e[2],123456],h=t[2]-t[0],n=t[3]-t[1],r=i[0]>0&&i[2]>0?3:2,o=s[0]>0&&s[2]>0?3:2,l=(o+1)*(r+1),c=B(3*l),g=K(2*l),d=new Array(6*(o*r-1));let b=0,I=0,L=0,u=0,f=0;for(let y=0;y<4;y++){const T=s[y];if(T<=0)continue;let A=0;for(let w=0;w<4;w++){const P=i[w];P<=0||(c[I++]=t[0]+A,c[I++]=t[1]+b,c[I++]=-1,g[L++]=A/h,g[L++]=b/n,w<3&&y<3&&(w!==1||y!==1)&&(d[f++]=u,d[f++]=u+1,d[f++]=u+r+1,d[f++]=u+1,d[f++]=u+r+2,d[f++]=u+r+1),u++,A+=P)}b+=T}const F=new Array(d.length);return new Y(a,[[p.POSITION,new C(c,3,!0)],[p.NORMAL,new C(_e,3,!0)],[p.UV0,new C(g,2,!0)]],[[p.POSITION,d],[p.NORMAL,F],[p.UV0,d]])}const _e=[0,0,1];let m=class extends ye(ue(pe)){constructor(){super(...arguments),this.drapeSourceType=Z.RasterImage,this.updatePolicy=J.SYNC,this.fullExtentInLocalViewSpatialReference=null,this.maximumDataResolution=null,this._images=new Array,this._extents=new Array,this._overlays=new Array,this.updateWhenStationary=!0,this._drapeSourceRenderer=null,this.refreshDebounced=Q(async a=>{this.destroyed||await this._doRefresh(a).catch(e=>{M(e)||_.getLogger(this.declaredClass).error(e)})},2e3)}initialize(){this._drapeSourceRenderer=this.view.basemapTerrain.overlayManager.registerGeometryDrapeSource(this),this.handles.add(X(()=>this.view.basemapTerrain.overlayManager.unregisterDrapeSource(this))),this.addResolvingPromise(me(this).then(a=>this._set("fullExtentInLocalViewSpatialReference",a))),this.updatingHandles.add(()=>this.suspended,()=>this._suspendedChangeHandler()),this.handles.add(this.view.resourceController.scheduler.registerIdleStateCallbacks(()=>{this._isScaleRangeActive()&&this.notifyChange("suspended")},()=>{})),this._isScaleRangeLayer()&&this.updatingHandles.add(()=>this.layer.effectiveScaleRange,()=>this.notifyChange("suspended"))}destroy(){this.clear()}setDrapingExtent(a,e){this._spatialReference=e,a.forEach(t=>{this._overlays[t.index]=t,this._updateImageExtent(t)})}_updateImageExtent(a){const e=this._clippedExtent(a.extent,Re);if(G(e))return;const t=we(a.extent,e,a.resolution);let s=a.pixelRatio*this.view.state.pixelRatio;const{layer:i}=this;if("imageMaxWidth"in i&&i.imageMaxWidth!=null||"imageMaxHeight"in i&&i.imageMaxHeight!=null){const n=i.imageMaxWidth,r=i.imageMaxHeight;if(t.width>n){const o=n/t.width;t.height=Math.floor(t.height*o),t.width=n,s*=o}if(t.height>r){const o=r/t.height;t.width=Math.floor(t.width*o),t.height=r,s*=o}}const h=this._extents[a.index];h&&ee(h.extent,e)&&this._imageSizeEquals(e,h.imageSize,t)||(this._extents[a.index]={extent:D(e),imageSize:t,pixelRatio:s},this.suspended||this._fetch(a.index).catch(n=>{M(n)||_.getLogger(this.declaredClass).error(n)}))}clear(){for(let a=0;a<this._images.length;a++)this._clearImage(a)}async doRefresh(){return this._doRefresh()}async _doRefresh(a){if(this.suspended)return;const e=[];for(let t=0;t<this._extents.length;t++)this._extents[t]&&e.push(this._fetch(t,a));await te(e)}canResume(){if(!super.canResume())return!1;const a=this.layer;if(this._isScaleRangeActive()){const{minScale:e,maxScale:t}=a.effectiveScaleRange,s=this.view.scale;if(s<t||e>0&&s>e)return!1}return!0}isUpdating(){return this._images.some(a=>!!a.loadingPromise)}async processResult(a,e,t){(e instanceof HTMLImageElement||e instanceof HTMLCanvasElement)&&(a.image=e)}findExtentInfoAt(a){for(const e of this._extents){const t=e.extent;if(new N(t[0],t[1],t[2],t[3],this._spatialReference).contains(a))return e}return null}getFetchOptions(){}async redraw(a,e){await ae(this._images,async(t,s)=>{t&&(await a(t,e),await this._createStageObjects(s,t.image,e))})}_imageSizeEquals(a,e,t){if(!this.maximumDataResolution)return!1;const s=S(a)/this.maximumDataResolution.x,i=E(a)/this.maximumDataResolution.y,h=s/e.width,n=i/e.height,r=s/t.width,o=i/t.height,l=Math.abs(h-r),c=Math.abs(n-o),g=ie.TESTS_DISABLE_OPTIMIZATIONS?0:1.5;return l<=g&&c<=g}async _fetch(a,e){if(this.suspended)return;const t=this._extents[a],s=t.extent;this._images[a]||(this._images[a]={texture:null,material:null,renderGeometry:null,loadingPromise:null,loadingAbortController:null,image:null,pixelData:null,renderExtent:D(s)});const i=this._images[a];i.loadingAbortController=H(i.loadingAbortController);const h=new N(s[0],s[1],s[2],s[3],this._spatialReference);if(h.width===0||h.height===0)return void this._clearImage(a);const n=new AbortController;i.loadingAbortController=n,se(e,()=>n.abort());const r=n.signal,o=this._waitFetchReady(r).then(async()=>{const l={requestAsImageElement:!0,pixelRatio:this._overlays[a].pixelRatio,...this.getFetchOptions(),signal:r},{height:c,width:g}=t.imageSize;return this.layer.fetchImage(h,g,c,l)}).then(l=>{if(re(r))throw _.getLogger(this.declaredClass).warnOnce("A call to fetchImage resolved even though the request was aborted. fetchImage should not resolve if options.signal.aborted is true."),U();return this.processResult(i,l)}).then(()=>{$(i.renderExtent,s)}).finally(()=>{o===i.loadingPromise&&(i.loadingPromise=null,i.loadingAbortController=null)});i.loadingPromise=o,this.notifyChange("updating"),await o.then(async()=>{if(r.aborted)throw U();await this._createStageObjects(a,i.image,r),this.notifyChange("updating")}).catch(l=>{throw l&&!M(l)&&_.getLogger(this.declaredClass).error(l),this.notifyChange("updating"),l})}_clearImage(a){const e=this._images[a];if(e){j(e.renderGeometry)&&(this._drapeSourceRenderer.removeGeometries([e.renderGeometry],O.UPDATE),e.renderGeometry=null);const t=this.view._stage;t.remove(e.texture),e.texture=null,t.remove(e.material),e.material=null,e.loadingAbortController=H(e.loadingAbortController),e.loadingPromise=null,e.image=null,e.pixelData=null}}async _createStageObjects(a,e,t){const s=this.view._stage,i=this._images[a],h=()=>{s.remove(i.texture),i.texture=null,j(i.renderGeometry)&&(this._drapeSourceRenderer.removeGeometries([i.renderGeometry],O.UPDATE),i.renderGeometry=null)};if(e){const n=new ne(e,{width:e.width,height:e.height,preMultiplyAlpha:!0,wrap:{s:z.CLAMP_TO_EDGE,t:z.CLAMP_TO_EDGE}});let r;if(await oe(this._images[a===R.INNER?R.OUTER:R.INNER].loadingPromise),V(t),h(),s.add(n),await s.loadImmediate(n),i.texture=n,G(i.material)?(i.material=new fe({transparent:!0,textureId:n.id}),s.add(i.material)):i.material.setParameters({textureId:n.id}),a===R.INNER)r=q(i.material,i.renderExtent);else{const o=this._images[0].renderExtent;if(!o)return void h();r=xe(i.material,o,i.renderExtent)}i.renderGeometry=new he(r),i.renderGeometry.localOrigin=this._overlays[a].renderLocalOrigin,this._drapeSourceRenderer.addGeometries([i.renderGeometry],O.UPDATE)}else h(),s.remove(i.material),i.material=null}_isScaleRangeLayer(){return"effectiveScaleRange"in this.layer}_isScaleRangeActive(){const a=this.layer;if(!this._isScaleRangeLayer())return!1;const{minScale:e,maxScale:t}=a.effectiveScaleRange;return le(e,t)}_clippedExtent(a,e){if(this.view.viewingMode!=="local")return $(e,a);const t=this.view.basemapTerrain;return t.ready?de(a,t.extent,e):$(e,a)}_suspendedChangeHandler(){this.suspended?this.clear():this.refreshDebounced()}async _waitFetchReady(a){await ce(()=>this.view.stationary,a),V(a)}};x([v()],m.prototype,"layer",void 0),x([v()],m.prototype,"suspended",void 0),x([v({readOnly:!0})],m.prototype,"fullExtentInLocalViewSpatialReference",void 0),x([v()],m.prototype,"updating",void 0),m=x([ge("esri.views.3d.layers.DynamicLayerView3D")],m);const Ce=m,Re=D();export{Ce as q};
