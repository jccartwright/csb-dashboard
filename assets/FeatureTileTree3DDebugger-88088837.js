import{c as d,t as h,h as l,a as g,e as a,y as s,v as p,b as c}from"./index-70df4575.js";import{b as u}from"./TileTreeDebugger-3b21cadf.js";let i=class extends u{get updating(){var t;return((t=this._watchUpdatingTracking)==null?void 0:t.updating)??!1}constructor(t){super(t),this._watchUpdatingTracking=new d,this._handles=new h}initialize(){const{featureTiles:t}=this.view;this._handles.add(t.addClient()),this._watchUpdatingTracking.addOnCollectionChange(()=>t==null?void 0:t.tiles,()=>this.update(),l)}destroy(){this._handles=g(this._handles),this._watchUpdatingTracking.destroy()}getTiles(){const t=e=>{const[r,n,o]=e.lij;return p.fromExtent(this.view.featureTiles.tilingScheme.getExtentGeometry(r,n,o))};return this.view.featureTiles.tiles.toArray().sort((e,r)=>e.loadPriority-r.loadPriority).map(e=>({...e,geometry:t(e)}))}};a([s()],i.prototype,"_watchUpdatingTracking",void 0),a([s()],i.prototype,"updating",null),a([s()],i.prototype,"view",void 0),i=a([c("esri.views.3d.layers.support.FeatureTileTree3DDebugger")],i);export{i as FeatureTileTree3DDebugger};
