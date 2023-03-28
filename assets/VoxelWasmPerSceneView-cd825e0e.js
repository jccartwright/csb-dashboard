import{_ as q,g as O,i as $,j as D,E as N,k as H,l as L,r as z,I as j,N as C,O as w,U as G,m as X,n as v,p as T,x as K,q as Y,F as Q,u as J,w as P,z as I,A as Z,B as F,C as ee,D as te,G as ie,H as se,J as re,K as ae,L as ne}from"./index-70df4575.js";var A,V,S,M,y,R;(function(s){s[s.Binary=0]="Binary",s[s.JSON=1]="JSON"})(A||(A={})),function(s){s[s.TreeIndex=0]="TreeIndex",s[s.TreeStats=1]="TreeStats",s[s.TreeData=2]="TreeData",s[s.BrickBundles=3]="BrickBundles",s[s.Section=4]="Section",s[s.VariableStats=5]="VariableStats"}(V||(V={})),function(s){s[s.None=1]="None",s[s.Front=2]="Front",s[s.Back=3]="Back"}(S||(S={})),function(s){s[s.Low=0]="Low",s[s.Medium=1]="Medium",s[s.High=2]="High"}(M||(M={})),function(s){s[s.None=0]="None",s[s.StaticSections=1]="StaticSections",s[s.Slices=2]="Slices",s[s.DynamicSections=4]="DynamicSections",s[s.GhostShell=8]="GhostShell",s[s.Isosurface=16]="Isosurface",s[s.Quality=32]="Quality",s[s.SunLocation=64]="SunLocation",s[s.StaticSectionSelection=128]="StaticSectionSelection",s[s.ExaggerationAndOffset=256]="ExaggerationAndOffset",s[s.CurrentTime=512]="CurrentTime",s[s.CurrentVariable=1024]="CurrentVariable",s[s.DeleteIsosurface=2048]="DeleteIsosurface",s[s.ContainerVisibility=4096]="ContainerVisibility",s[s.RenderMode=8192]="RenderMode",s[s.Optimization=16384]="Optimization",s[s.VariableStyles=32768]="VariableStyles",s[s.VolumeStyles=65536]="VolumeStyles",s[s.AnalysisSlice=131072]="AnalysisSlice"}(y||(y={})),function(s){s[s.Isosurfaces=0]="Isosurfaces",s[s.DynamicSections=1]="DynamicSections",s[s.StaticSections=2]="StaticSections"}(R||(R={}));function oe(s){return new Promise(e=>q(()=>import("./vxlLayer-6cf96c51.js"),[]).then(t=>t.v).then(({default:t})=>{const i=t({locateFile:le,preinitializedWebGLContext:s,onRuntimeInitialized:()=>e(i)})})).catch(e=>{throw e})}function le(s){return O(`esri/libs/vxl/${s}`)}const b=$.getLogger("esri.layers.VoxelWasmPerSceneView");var l;(function(s){s[s.Lifetime=1]="Lifetime",s[s.RequestResponse=2]="RequestResponse",s[s.Rendering=3]="Rendering",s[s.Error=4]="Error"})(l||(l={}));class de{constructor(e){this._halfIntTexturesAvailable=!1,this._textureFloatLinearAvailable=!1,this._havePreparedWithAllLayers=!1,this._readyWatchHandle=null,this._qualityWatchHandle=null,this._stationaryWatchHandle=null,this._timeExtentWatchHandle=null,this._renderPluginContext=null,this._vxlPromise=null,this._vxl=null,this._pluginIsActive=!1,this._moreToLoad=!1,this._viewportWidth=-1,this._viewportHeight=-1,this._newLayers=[],this._layers=new Map,this._shaderOutput=D.Color,this._renderSlot=N.VOXEL,this._rctx=null,this._renderTargetToRestore=null,this._lastFrameWasStationary=!1,this._wasmMemBlockSizes=[512,1024,2048,4096,8192,16384,32768,65536],this._wasmMemBlocks=new Map,this._dbgFlags=new Set,this._captureFrustum=!1,this._frustum=null,this._frustumRenderableId=-1,this._renderCoordsHelper=null,this.type=H.VOXEL,this.slicePlaneEnabled=!0,this.isGround=!1,this.layerUid=[],this._view=e,this._initialize()}get canRender(){return!!this._vxl&&this._view.viewingMode==="local"}_dbg(e,t){this._dbgFlags.has(e)&&(e===l.Error?b.error(t):b.warn(t))}_removeRenderPlugin(){this._pluginIsActive&&this._view._stage&&(this._dbg(l.Lifetime,"--removeRenderPlugin--"),this._view._stage.removeRenderPlugin(this)),this._pluginIsActive=!1}_initialize(){this._dbg(l.Lifetime,"--initialize--");for(const e of this._wasmMemBlockSizes)this._wasmMemBlocks.set(e,0);this._readyWatchHandle=L(()=>this._view.ready,e=>{e&&this._view.viewingMode==="local"?(this._dbg(l.Lifetime,"view ready status changed to ready on a local view, calling addRenderPlugin"),this._view._stage.addRenderPlugin([this._renderSlot],this),this._pluginIsActive=!0):(this._dbg(l.Lifetime,"view ready status changed, not ready or not a local view!"),this._removeRenderPlugin())},{initial:!0}),this._qualityWatchHandle=L(()=>{var e;return(e=this._view)==null?void 0:e.qualityProfile},e=>{this._dbg(l.Rendering,"qualityProfile changed to "+e),this._vxl&&this._vxl.set_quality(this._toWasmQuality(e))},{initial:!0}),this._timeExtentWatchHandle=L(()=>{var e;return(e=this._view)==null?void 0:e.timeExtent},()=>{var e;if(this._vxl){const t=this._getTimeArgs((e=this._view)==null?void 0:e.timeExtent);this._dbg(l.Rendering,"sceneView timeExtent changed to useTime="+t.useTime+" st="+t.startTime+" et="+t.endTime),this._vxl.set_scene_time_extent(t.startTime,t.endTime,t.useTime),this._renderPluginContext.requestRender()}},{initial:!0}),this._stationaryWatchHandle=L(()=>{var e;return(e=this._view)==null?void 0:e.stationary},e=>{this._vxl&&e&&!this._lastFrameWasStationary&&this._renderPluginContext.requestRender()})}initializeRenderContext(e){this._dbg(l.Lifetime,"--initializeRenderContext--");const t=e.renderContext.rctx;t.type===z.WEBGL2?(this._renderPluginContext=e,this._rctx=e.renderContext.rctx,this._halfIntTexturesAvailable=!!this._rctx.capabilities.textureNorm16,this._textureFloatLinearAvailable=this._rctx.capabilities.textureFloatLinear,this._initializeWasm(t.gl)):this._dbg(l.Error,"WebGL 1 context only!")}uninitializeRenderContext(){this._renderPluginContext=null,this._rctx=null,this._dbg(l.Lifetime,"--uninitializeRenderContext--")}_restoreFramebuffer(){if(!this._renderTargetToRestore)return;const e=this._renderTargetToRestore.fbo;if(!this._rctx)return void this._dbg(l.Error,"no context in restoreFramebuffer!");this._rctx.bindFramebuffer(e,!0);const t=this._renderTargetToRestore.viewport;this._rctx.setViewport(t.x,t.y,t.width,t.height)}_bindPreviousDepthToSlot(e,t){const i=!!this._rctx,r=!!this._renderTargetToRestore;if(!i||!r)return 0;const n=this._renderTargetToRestore.fbo.depthStencilTexture;return n?(t===0?this._rctx.bindTexture(null,e,!0):this._rctx.bindTexture(n,e,!0),1):(this._dbg(l.Error,"no depth/stencil texture exists!"),0)}_modifyResourceCount(e,t,i){if(!this._rctx)return void this._dbg(l.Error,"modifyAllocation callback has no rendering context!");const r=e;i===1?this._rctx.instanceCounter.increment(r,t):this._rctx.instanceCounter.decrement(r,t)}_setBlendState(e,t,i,r){this._rctx?(this._rctx.setBlendingEnabled(e===1),this._rctx.setBlendFunction(t,i),this._rctx.setBlendEquation(r)):this._dbg(l.Error,"setBlendState callback has no rendering context!")}_setFrontFace(e){this._rctx?this._rctx.setFrontFace(e):this._dbg(l.Error,"setFrontFace callback has no rendering context!")}_setDepthStencilStateFunction(e,t,i){this._rctx?(this._rctx.setDepthFunction(i),this._rctx.setDepthTestEnabled(e===1),this._rctx.setDepthWriteEnabled(t===1),this._rctx.setStencilTestEnabled(!1),this._rctx.setStencilFunction(j.ALWAYS,0,255),this._rctx.setStencilOpSeparate(C.FRONT,w.KEEP,w.INCR,w.KEEP),this._rctx.setStencilOpSeparate(C.BACK,w.KEEP,w.DECR,w.KEEP)):this._dbg(l.Error,"setDepthStencilStateFunction callback has no rendering context!")}_setRasterizerState(e){if(this._rctx)switch(e){case S.None:this._rctx.setFaceCullingEnabled(!1);break;case S.Back:this._rctx.setCullFace(C.BACK),this._rctx.setFaceCullingEnabled(!0);break;case S.Front:this._rctx.setCullFace(C.FRONT),this._rctx.setFaceCullingEnabled(!0)}else this._dbg(l.Error,"setRasterizerState callback has no rendering context!")}_setViewport(e,t,i,r){this._rctx?this._rctx.setViewport(e,t,i,r):this._dbg(l.Error,"setViewport callback has no rendering context!")}_updateMemoryUsage(){this._layers.forEach((e,t)=>{if(e.needMemoryUsageUpdate){const i=this._vxl.estimate_memory_usage(t);i>=0&&(e.needMemoryUsageUpdate=!1,e.layerView.setUsedMemory(i))}})}_syncRequestsResponses(){this._layers.forEach((e,t)=>{const i=[];e.responses.forEach((a,_)=>{i.push(_),this._dbg(l.RequestResponse,"responding for requestID:"+_+" size:"+a.size),this._vxl.respond(t,_,a),a.requestType!==V.TreeIndex&&a.requestType!==V.Section||(e.needMemoryUsageUpdate=!0)});const r=e.responses;for(const a of i)r.delete(a);const n=this._vxl.get_new_requests(t),o=e.abortController.signal;for(const a in n){e.outstandingRequestCount+=1,e.outstandingRequestCount===1&&e.layerView.updatingFlagChanged();const _=n[a],f={responseType:"array-buffer",signal:o};this._dbg(l.RequestResponse,"making requestID:"+a+" url:"+_.url),G(_.url,f).then(d=>{e.outstandingRequestCount-=1,e.outstandingRequestCount===0&&e.layerView.updatingFlagChanged(),this._dbg(l.RequestResponse,"have response for requestID:"+a);let u=0;if(d.data.byteLength>0){u=this._vxl._malloc(d.data.byteLength);const c=new Uint8Array(this._vxl.HEAPU8.buffer,u,d.data.byteLength),g=new Uint8Array(d.data);for(let x=0;x<d.data.byteLength;++x)c[x]=g[x]}r.set(+a,{responseType:_.responseType,ptr:u,size:d.data.byteLength,success:!0,requestType:_.requestType})}).catch(d=>{e.outstandingRequestCount-=1,e.outstandingRequestCount===0&&e.layerView.updatingFlagChanged(),X(d)||(this._dbg(l.Error,`requestID:${a} failed, error=${d.toString()}`),r.set(+a,{responseType:_.responseType,ptr:0,size:0,success:!1,requestType:_.requestType}))})}})}updateWasmCamera(e){this._vxl.set_projection_matrix.apply(this._vxl,e.projectionMatrix),this._vxl.set_view_matrix.apply(this._vxl,e.viewMatrix),this._vxl.set_near_far(e.near,e.far)}isUpdating(e){if(!this._vxl&&this._vxlPromise)return!0;const t=this._layers.get(e);return!!t&&t.outstandingRequestCount>0}getLayerTimes(e){const t=[];return this._layers.forEach((i,r)=>{if(i.layerView.wasmLayerId===e.wasmLayerId){const n=this._vxl.get_layer_epoch_times(r,e.layer.currentVariableId);for(let o=0;o<n.length;++o)t.push(n[o])}}),t}getCurrentLayerTimeIndex(e){let t=0;return this._layers.forEach((i,r)=>{i.layerView.wasmLayerId===e.wasmLayerId&&(t=this._vxl.get_layer_current_time_id(r))}),t}setEnabled(e,t){this._layers.forEach((i,r)=>{i.layerView.wasmLayerId===e.wasmLayerId&&(this._vxl.set_enabled(r,t),i.needMemoryUsageUpdate=!0,this._renderPluginContext.requestRender())})}setStaticSections(e,t){const i={mask:y.StaticSections,staticSections:t};return this._doMaskedUIUpdate(e,i,!0)}setCurrentVariable(e,t){const i={mask:y.CurrentVariable,currentVariable:t};return this._doMaskedUIUpdate(e,i,!0)}setRenderMode(e,t){const i={mask:y.RenderMode,renderMode:t};return this._doMaskedUIUpdate(e,i,!0)}setVerticalExaggerationAndOffset(e,t,i,r){const n={mask:y.ExaggerationAndOffset,volStyleDesc:{volumeId:t,verticalExaggeration:i,verticalOffset:r}};return this._doMaskedUIUpdate(e,n,!0)}setVariableStyles(e,t){const i={mask:y.VariableStyles,variableStyles:t};return this._doMaskedUIUpdate(e,i,!0)}setVolumeStyles(e,t){const i={mask:y.VolumeStyles,volumeStyles:t};return this._doMaskedUIUpdate(e,i,!0)}setEnableDynamicSections(e,t){const i={mask:y.ContainerVisibility,containerIsVisible:t,container:R.DynamicSections};return this._doMaskedUIUpdate(e,i,!0)}setEnableIsosurfaces(e,t){const i={mask:y.ContainerVisibility,containerIsVisible:t,container:R.Isosurfaces};return this._doMaskedUIUpdate(e,i,!0)}setEnableSections(e,t){const i={mask:y.ContainerVisibility,containerIsVisible:t,container:R.StaticSections};return this._doMaskedUIUpdate(e,i,!0)}setAnalysisSlice(e,t,i,r){const n={mask:y.AnalysisSlice,analysisSlice:{point:i,normal:r,enabled:t}};return this._doMaskedUIUpdate(e,n,!0)}_doMaskedUIUpdate(e,t,i){if(!this._vxl)return!1;let r=!1;return this._layers.forEach((n,o)=>{if(n.layerView.wasmLayerId===e.wasmLayerId){const a={str:JSON.stringify(t),byteCount:0,ptr:0,isReusable:!1};this._allocateBlock(a)&&(r=this._vxl.handle_masked_ui_update(o,a.ptr,a.byteCount)===1,a.isReusable||this._vxl._free(a.ptr))}}),r&&i&&this._renderPluginContext.requestRender(),r}_addTriangleToWasmBuffer(e,t,i,r,n){return e[3*t+0]=i[0],e[3*t+1]=i[1],e[3*t+2]=i[2],e[3*(t+=1)+0]=r[0],e[3*t+1]=r[1],e[3*t+2]=r[2],e[3*(t+=1)+0]=n[0],e[3*t+1]=n[1],e[3*t+2]=n[2],t+=1}_addNormalToWasmBuffer(e,t,i){return e[3*t+0]=i[0],e[3*t+1]=i[1],e[3*t+2]=i[2],t+=1}_doCaptureFrustum(){if(!this._vxl)return;const e=36,t=e/3,i=this._vxl._malloc(3*e*Float32Array.BYTES_PER_ELEMENT),r=new Float32Array(this._vxl.HEAPF32.buffer,i,3*e),n=this._vxl._malloc(3*t*Float32Array.BYTES_PER_ELEMENT),o=new Float32Array(this._vxl.HEAPF32.buffer,n,e),a=this._frustum.points[v.NEAR_BOTTOM_LEFT],_=this._frustum.points[v.NEAR_BOTTOM_RIGHT],f=this._frustum.points[v.NEAR_TOP_RIGHT],d=this._frustum.points[v.NEAR_TOP_LEFT],u=this._frustum.points[v.FAR_BOTTOM_LEFT],c=this._frustum.points[v.FAR_BOTTOM_RIGHT],g=this._frustum.points[v.FAR_TOP_RIGHT],x=this._frustum.points[v.FAR_TOP_LEFT];let h=0,m=0;const p=this._frustum.planes[T.NEAR];h=this._addTriangleToWasmBuffer(r,h,f,_,a),m=this._addNormalToWasmBuffer(o,m,p),h=this._addTriangleToWasmBuffer(r,h,a,d,f),m=this._addNormalToWasmBuffer(o,m,p);const E=this._frustum.planes[T.FAR];h=this._addTriangleToWasmBuffer(r,h,u,c,g),m=this._addNormalToWasmBuffer(o,m,E),h=this._addTriangleToWasmBuffer(r,h,g,x,u),m=this._addNormalToWasmBuffer(o,m,E);const W=this._frustum.planes[T.TOP];h=this._addTriangleToWasmBuffer(r,h,g,f,d),m=this._addNormalToWasmBuffer(o,m,W),h=this._addTriangleToWasmBuffer(r,h,d,x,g),m=this._addNormalToWasmBuffer(o,m,W);const k=this._frustum.planes[T.BOTTOM];h=this._addTriangleToWasmBuffer(r,h,a,_,c),m=this._addNormalToWasmBuffer(o,m,k),h=this._addTriangleToWasmBuffer(r,h,c,u,a),m=this._addNormalToWasmBuffer(o,m,k);const B=this._frustum.planes[T.LEFT];h=this._addTriangleToWasmBuffer(r,h,d,a,u),m=this._addNormalToWasmBuffer(o,m,B),h=this._addTriangleToWasmBuffer(r,h,u,x,d),m=this._addNormalToWasmBuffer(o,m,B);const U=this._frustum.planes[T.RIGHT];h=this._addTriangleToWasmBuffer(r,h,f,g,c),m=this._addNormalToWasmBuffer(o,m,U),h=this._addTriangleToWasmBuffer(r,h,c,_,f),m=this._addNormalToWasmBuffer(o,m,U),this._frustumRenderableId!==-1&&this._vxl.remove_generic_mesh(this._frustumRenderableId),this._frustumRenderableId=this._vxl.add_generic_mesh(i,3*e,n,e,255,0,0,64),this._vxl._free(i),this._vxl._free(n),this._captureFrustum=!1,this._renderPluginContext.requestRender()}captureFrustum(){this._renderCoordsHelper===null&&(this._renderCoordsHelper=K.create(Y.Local,Q(!1,this._view.spatialReference))),this._frustum===null&&(this._frustum=new J(this._renderCoordsHelper)),this._captureFrustum=!0,this._renderPluginContext!==null&&this._renderPluginContext.requestRender()}toggleFullVolumeExtentDraw(e){this._vxl&&this._layers.forEach((t,i)=>{t.layerView.wasmLayerId===e.wasmLayerId&&(this._vxl.toggle_full_volume_extent_draw(i),this._renderPluginContext.requestRender())})}addVoxelLayer(e){if(!this._vxl){const i={layerView:e,resolveCallback:null,rejectCallback:null},r=new Promise((n,o)=>{i.resolveCallback=n,i.rejectCallback=o});return this._newLayers.push(i),r}const t=this._addVoxelLayer(e);return t<0?Promise.reject(-1):Promise.resolve(t)}removeVoxelLayer(e){if(!this._vxl){const r=this._newLayers.findIndex(o=>e.uid===o.layerView.uid);r>=0&&(this._newLayers[r].resolveCallback(-1),this._newLayers.splice(r,1));const n=this._newLayers.length;return n===0&&(this._dbg(l.Lifetime," no voxel layers left after removing a layer, removing RenderPlugin and destroying"),this.destroy()),n}let t=-1;this._layers.forEach((r,n)=>{if(r.layerView.wasmLayerId===e.wasmLayerId){t=n,r.abortController.abort(),this._vxl.remove_layer(t);const o=this.layerUid.indexOf(e.layer.uid);o!==-1&&this.layerUid.splice(o,1)}}),t>=0&&this._layers.delete(t);const i=this._layers.size;return i===0&&(this._dbg(l.Lifetime," no voxel layers left after removing a layer, removing RenderPlugin and destroying"),this.destroy()),i}_getBlockSize(e){for(const t of this._wasmMemBlockSizes)if(e<t)return t;return-1}_allocateBlock(e){e.byteCount=this._vxl.lengthBytesUTF8(e.str)+1;const t=this._getBlockSize(e.byteCount);return t<0?(e.isReusable=!1,e.ptr=this._vxl._malloc(e.byteCount)):(e.isReusable=!0,e.ptr=this._wasmMemBlocks.get(t),e.ptr===0&&(e.ptr=this._vxl._malloc(t),this._wasmMemBlocks.set(t,e.ptr))),e.ptr!==0&&(this._vxl.stringToUTF8(e.str,e.ptr,e.byteCount),!0)}_getTimeArgs(e){let t=-Number.MAX_VALUE,i=Number.MAX_VALUE,r=!1;return P(e)&&(e.isAllTime?r=!0:(P(e.start)&&(r=!0,t=e.start.getTime()/1e3),P(e.end)&&(r=!0,i=e.end.getTime()/1e3))),{startTime:t,endTime:i,useTime:r}}_addVoxelLayer(e){var _,f;const t=e.layer;let i=-1;const r=t.getConfiguration();if(r.length<1)return-1;const n={str:r,byteCount:0,ptr:0,isReusable:!1};if(!this._allocateBlock(n))return-1;const o=this._getTimeArgs((_=this._view)==null?void 0:_.timeExtent),a=this._view.spatialReference.isWGS84&&t.spatialReference.isWGS84?111319.49079327357:1;if(i=this._vxl.add_layer(t.serviceRoot,n.ptr,n.byteCount,a,a,o.startTime,o.endTime,o.useTime,this._toWasmQuality(this._view.qualityProfile)),n.isReusable||this._vxl._free(n.ptr),i>=0){(f=t.test)!=null&&f.constantUpscaling&&(this._setUpscalingLimits(0,.25,.25),this._setUpscalingLimits(1,.5,.5),this._setUpscalingLimits(2,.75,.75));const d=new AbortController;if(this._layers.set(i,{layerView:e,responses:new Map,outstandingRequestCount:0,abortController:d,needMemoryUsageUpdate:!1}),this.layerUid.push(e.layer.uid),!this._halfIntTexturesAvailable||I("mac")){const u=[];let c="";for(const g of e.layer.variables)g.renderingFormat.type!=="Int16"&&g.renderingFormat.type!=="UInt16"||(u.push(g.name),g.id===e.layer.currentVariableId&&(c=g.name));c!==""&&b.error("#addVoxelLayer_error()",e.layer,`The voxel layer '${e.layer.title}' cannot render the current variable '${c}' in this browser`),u.length>0&&b.warn("#addVoxelLayer_warning()",e.layer,`The voxel layer '${e.layer.title}' cannot render the variables '${u.toString()}' in this browser`)}if(!this._textureFloatLinearAvailable){const u=[];let c="";for(const g of e.layer.variables)g.renderingFormat.type==="Float32"&&(u.push(g.name),g.id===e.layer.currentVariableId&&(c=g.name));c!==""&&b.error("#addVoxelLayer_error()",e.layer,`The voxel layer '${e.layer.title}' cannot render the current variable '${c}' in this browser`),u.length>0&&b.warn("#addVoxelLayer_warning()",e.layer,`The voxel layer '${e.layer.title}' cannot render the variables '${u.toString()}' in this browser`)}return I("esri-mobile")&&b.warnOnce("Mobile support differs across devices. Voxel layer might not display as expected."),i}return-1}prepareRender(e){if(!this._vxl)return;const t=e.bindParameters.camera.viewForward,i=e.bindParameters.camera.eye;this._vxl.update_camera_pos_and_direction(i[0],i[1],i[2],t[0],t[1],t[2]);const r=this._vxl.cull();this._dbg(l.RequestResponse,"missingResourceCount="+r),this._moreToLoad=r>0,this._havePreparedWithAllLayers=this._newLayers.length===0,this._updateMemoryUsage()}render(e){if(!this._vxl||e.output!==this._shaderOutput||e.bindParameters.slot!==this._renderSlot)return;for(const i of this._newLayers){const r=this._addVoxelLayer(i.layerView);r===-1?i.rejectCallback(-1):i.resolveCallback(r)}if(this._newLayers=[],this._layers.size===0)return void this._dbg(l.Error,"No voxel layers but RenderPlugin instance is being asked to render!");this._lastFrameWasStationary=this._view.stationary,this._syncRequestsResponses(),this._beforeDraw(),this._vxl.begin_color_frame(!this._view._stage.renderer.isFeatureEnabled(Z.HighQualityVoxel),e.bindParameters.lighting.mainLight.direction[0],e.bindParameters.lighting.mainLight.direction[1],e.bindParameters.lighting.mainLight.direction[2]);const t=this._renderTargetToRestore.viewport;t.width===this._viewportWidth&&t.height===this._viewportHeight||(this._viewportWidth=t.width,this._viewportHeight=t.height,this._vxl.set_viewport(t.width,t.height),this._layers.forEach(i=>{i.needMemoryUsageUpdate=!0})),t.x===0&&t.y===0||this._dbg(l.Error,"Unsupported viewport parameters detected!"),this.updateWasmCamera(e.bindParameters.camera),this._captureFrustum&&(this._frustum.update(e.bindParameters.camera),this._doCaptureFrustum()),this._vxl.draw(),this._afterDraw(),(this._moreToLoad||!this._havePreparedWithAllLayers&&this._layers.size>0)&&this._renderPluginContext.requestRender()}destroy(){this._dbg(l.Lifetime,"--destroy--"),this._removeRenderPlugin(),this._readyWatchHandle=F(this._readyWatchHandle),this._qualityWatchHandle=F(this._qualityWatchHandle),this._timeExtentWatchHandle=F(this._timeExtentWatchHandle),this._stationaryWatchHandle=F(this._stationaryWatchHandle),this._vxl&&(this._layers.forEach(e=>{e.abortController.abort()}),this._wasmMemBlocks.forEach(e=>{e!==0&&this._vxl._free(e)}),this._vxl.uninitialize_voxel_wasm(),this._vxl=null)}_initializeWasm(e){return this._vxl?Promise.resolve():(this._vxlPromise||(this._vxlPromise=oe(e).then(t=>{var x;if(this._vxl=t,this._vxlPromise=null,this._newLayers.length<=0)return this._dbg(l.Lifetime," no voxel layers left after WASM downloaded, removing RenderPlugin and destroying"),void this.destroy();const i=this._getTimeArgs((x=this._view)==null?void 0:x.timeExtent),r=this._vxl.addFunction(this._restoreFramebuffer.bind(this),"v"),n=this._vxl.addFunction(this._setBlendState.bind(this),"viiii"),o=this._vxl.addFunction(this._setFrontFace.bind(this),"vi"),a=this._vxl.addFunction(this._setRasterizerState.bind(this),"vi"),_=this._vxl.addFunction(this._setDepthStencilStateFunction.bind(this),"viii"),f=this._vxl.addFunction(this._setViewport.bind(this),"viiii"),d=this._vxl.addFunction(this._bindPreviousDepthToSlot.bind(this),"iii"),u=this._vxl.addFunction(this._modifyResourceCount.bind(this),"viii"),c=this._halfIntTexturesAvailable&&!I("mac"),g=this._textureFloatLinearAvailable;this._vxl.initialize_voxel_wasm(r,n,o,a,_,f,d,u,i.startTime,i.endTime,i.useTime,c,g),this._renderPluginContext&&this._renderPluginContext.requestRender()}).catch(()=>{for(const t of this._newLayers)t.rejectCallback(-2);this._dbg(l.Error," WASM failed to download, removing RenderPlugin and destroying"),this.destroy()})),this._vxlPromise)}pickDepth(e,t,i){if(!this._vxl||!this._rctx||this._layers.size===0)return null;const r=i.viewport[3]-t;if(e<0||e>i.viewport[2]||t<0||t>i.viewport[3])return this._dbg(l.Error,`[js] pickDepth: outOfRange, screenXY=[${e.toFixed(0)}, ${r.toFixed(0)}]]`),null;this._beforeDraw();const n=i.viewForward,o=i.eye;this._vxl.update_camera_pos_and_direction(o[0],o[1],o[2],n[0],n[1],n[2]),this.updateWasmCamera(i),this._vxl.begin_frame();const a=this._vxl.pick_depth(e,r);return this._afterDraw(),a.success?a.distanceToCamera:null}pickObject(e,t,i,r){if(!this._vxl||!this._rctx||this._layers.size===0)return null;const n=Math.round(e),o=Math.round(t);if(n<0||n>i.viewport[2]||o<0||o>i.viewport[3])return this._dbg(l.Error,`[js] pickObject: outOfRange, screenXY=[${n}, ${o}], vp=[${i.viewport.toString()}]`),null;this._beforeDraw();const a=i.viewForward,_=i.eye;this._vxl.update_camera_pos_and_direction(_[0],_[1],_[2],a[0],a[1],a[2]),this.updateWasmCamera(i),this._vxl.begin_frame();let f=null;if(r.length===0)f=this._vxl.pick_object(n,o,0,0);else{const d={str:JSON.stringify({layerIds:r}),byteCount:0,ptr:0,isReusable:!1};this._allocateBlock(d)&&(f=this._vxl.pick_object(n,o,d.ptr,d.byteCount),d.isReusable||this._vxl._free(d.ptr))}return this._afterDraw(),f}_beforeDraw(){this._renderTargetToRestore={fbo:this._rctx.getBoundFramebufferObject(),viewport:this._rctx.getViewport()},this._rctx.setPolygonOffsetFillEnabled(!1),this._rctx.setScissorTestEnabled(!1),this._rctx.setColorMask(!0,!0,!0,!0)}_afterDraw(){this._renderTargetToRestore.fbo=null,this._rctx.externalTextureUnitUpdate(this._vxl.get_texture_units_bound_in_frame(),this._vxl.get_active_texture_unit()),this._rctx.externalVertexArrayObjectUpdate(),this._rctx.externalVertexBufferUpdate(),this._rctx.externalProgramUpdate()}intersect(e,t,i,r,n){if(!this._vxl||!this._rctx||this._layers.size===0||!e.options.selectionMode||e.options.isFiltered)return;if(n[0]<0||n[0]>e.camera.viewport[2]||n[1]<0||n[1]>e.camera.viewport[3])return this._dbg(l.Error,`[js] VoxelWasmPerScene.intersect: outOfRange, screenXY=[${n[0].toFixed(0)}, ${n[1].toFixed(0)}]`),null;const o=[];this._layers.forEach(f=>{e.options.filteredLayerUids.includes(f.layerView.layer.uid)&&o.push(f.layerView.wasmLayerId)});const a=this.pickObject(n[0],n[1],e.camera,o);if(ee(a)||a.layerId===-1)return;const _=this._layers.get(a.layerId);if(_){const f=_.layerView.layer.uid,d=a.distanceToCamera/te(i,r),u=ae();u[0]=a.worldX,u[1]=a.worldY,u[2]=a.worldZ;const c={};if(a.uniqueValue.length===0?c["Voxel.ServiceValue"]=`${a.continuousValue.toLocaleString()} ${a.continuousValueUnits}`:c["Voxel.ServiceValue"]=a.uniqueValue,c["Voxel.ServiceVariableLabel"]=a.variableLabel,c["Voxel.Position"]=a.voxelSpacePosition,a.nativeTime.length>0){const p=new Date(a.epochTime);c["Voxel.ServiceLocalTime"]=p.toString(),c["Voxel.ServiceNativeTime"]=a.nativeTime}a.hasDepth&&(c["Voxel.ServiceDepth"]=`${a.depth.toLocaleString()} ${a.depthUnits}`);const g=a.faceNormal;c["Voxel.WorldPosition"]=`[${u[0]}, ${u[1]}, ${u[2]}]`;const x=p=>{const E=new ne(u,f,()=>this._createVoxelGraphic(_.layerView.layer,c));p.set(this.type,E,d,g)},h=e.results,m=e.options.store===ie.ALL;if((h.min.dist==null||d<h.min.dist)&&x(h.min),(h.max.dist==null||d>h.max.dist)&&x(h.max),m){const p=se(e.ray);x(p),e.results.all.push(p)}}}_createVoxelGraphic(e,t){return new re({layer:e,sourceLayer:e,attributes:t})}_toWasmQuality(e){switch(e){case"low":return 0;case"medium":return 1;case"high":return 2}}_setUpscalingLimits(e,t,i){this._vxl&&this._vxl.set_upscaling_limits(e,t,i)}}export{de as default};
