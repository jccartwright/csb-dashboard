import{C as a,a9 as o,T as n,e as r,y as l,b as p}from"./index-70df4575.js";import{n as h}from"./LayerView3D-deb29fb7.js";import{c as u}from"./TiledLayerView3D-e6d8c0be.js";import{u as m}from"./LayerView-1d2a8e3f.js";import{i as f}from"./RefreshableLayerView-158cf695.js";import{P as g,S as c}from"./MapServiceLayerViewHelper-aee1195b.js";import{a as y}from"./drapedUtils-b1ddf686.js";import"./floorFilterUtils-080a7cd2.js";import"./sublayerUtils-a1334aa5.js";import"./popupUtils-709e372e.js";let i=class extends f(u(h(m))){constructor(){super(...arguments),this.type="tile-3d",this._popupHighlightHelper=null}get imageFormatIsOpaque(){return this.layer.tileInfo.format==="jpg"}get hasMixedImageFormats(){return this.layer.tileInfo.format==="mixed"}get tileInfo(){return this.layer.tileInfo}get dataLevelRange(){if(this.tileInfo){const e=this.tileInfo.lods,t=e[0].scale,s=e[e.length-1].scale;return this.levelRangeFromScaleRange(t,s)}return{minLevel:0,maxLevel:0}}initialize(){if(this.layer.type==="web-tile"){const e=this.layer.get("fullExtent.spatialReference"),t=this.layer.get("tileInfo.spatialReference");if(a(e)||a(t)||!o(e,t)){const s=this.layer.originOf("fullExtent")==="defaults"||a(this.layer.fullExtent)?"SceneView requires fullExtent to be specified by the user on WebTileLayer":"SceneView requires fullExtent to be specified in the same spatial reference as tileInfo on WebTileLayer";this.addResolvingPromise(Promise.reject(new n("layerview:incompatible-fullextent",s)))}}g(this,this.layer)&&(this._popupHighlightHelper=new c({createFetchPopupFeaturesQueryGeometry:(e,t)=>y(e,t,this.view),layerView:this,updatingHandles:this.updatingHandles})),this._addTilingSchemeMatchPromise()}destroy(){var e;(e=this._popupHighlightHelper)==null||e.destroy()}async fetchPopupFeatures(e,t){return this._popupHighlightHelper?this._popupHighlightHelper.fetchPopupFeatures(e,t):[]}async doRefresh(){this.suspended||this.emit("data-changed")}};r([l()],i.prototype,"imageFormatIsOpaque",null),r([l()],i.prototype,"hasMixedImageFormats",null),r([l()],i.prototype,"layer",void 0),r([l()],i.prototype,"tileInfo",null),r([l()],i.prototype,"dataLevelRange",null),i=r([p("esri.views.3d.layers.TileLayerView3D")],i);const P=i;export{P as default};
