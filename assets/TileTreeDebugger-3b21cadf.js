import{e as r,f as M,ff as P,J as $,w as d,dz as j,dl as x,fg as O,fh as A,C as L,y as g,b as k,fi as z}from"./index-70df4575.js";const J=[[0,179,255],[117,62,128],[0,104,255],[215,189,166],[32,0,193],[98,162,206],[102,112,129],[52,125,0],[142,118,246],[138,83,0],[92,122,255],[122,55,83],[0,142,255],[81,40,179],[0,200,244],[13,24,127],[0,170,147],[19,58,241],[22,44,35]];let a=class extends M{constructor(s){super(s),this.updating=!1,this.enablePolygons=!0,this.enableLabels=!0,this._polygons=new Map,this._labels=new Map,this._enabled=!0}initialize(){this._symbols=J.map(s=>new P({color:[s[0],s[1],s[2],.6],outline:{color:"black",width:1}})),this.update()}destroy(){this._enabled=!1,this.clear()}get enabled(){return this._enabled}set enabled(s){this._enabled!==s&&(this._enabled=s,this.update())}update(){if(!this._enabled)return void this.clear();const s=e=>{if(d(e.label))return e.label;let l=e.lij.toString();return d(e.loadPriority)&&(l+=` (${e.loadPriority})`),l},h=this.getTiles(),y=new Array,p=new Set((this._labels.size,this._labels.keys()));h.forEach((e,l)=>{const t=e.lij.toString();p.delete(t);const S=e.lij[0],u=e.geometry;if(this.enablePolygons&&!this._polygons.has(t)){const i=new $({geometry:u,symbol:this._symbols[S%this._symbols.length]});this._polygons.set(t,i),y.push(i)}if(this.enableLabels){const i=s(e),_=l/(h.length-1),c=z(0,200,_),w=z(20,6,_)/.75,m=d(e.loadPriority)&&e.loadPriority>=h.length,f=new j([c,m?0:c,m?0:c]),v=this.view.type==="3d"?()=>new x({verticalOffset:{screenLength:40/.75},callout:{type:"line",color:"white",border:{color:"black"}},symbolLayers:[new O({text:i,halo:{color:"white",size:1/.75},material:{color:f},size:w})]}):()=>new A({text:i,haloColor:"white",haloSize:1/.75,color:f,size:w}),n=this._labels.get(t);if(n){const o=v();(L(n.symbol)||JSON.stringify(o)!==JSON.stringify(n.symbol))&&(n.symbol=o)}else{const o=new $({geometry:u.extent.center,symbol:v()});this._labels.set(t,o),y.push(o)}}});const b=new Array;p.forEach(e=>{const l=this._polygons.get(e);l!=null&&(b.push(l),this._polygons.delete(e));const t=this._labels.get(e);t!=null&&(b.push(t),this._labels.delete(e))}),this.view.graphics.removeMany(b),this.view.graphics.addMany(y)}clear(){this.view.graphics.removeMany(Array.from(this._polygons.values())),this.view.graphics.removeMany(Array.from(this._labels.values())),this._polygons.clear(),this._labels.clear()}};r([g({constructOnly:!0})],a.prototype,"view",void 0),r([g({readOnly:!0})],a.prototype,"updating",void 0),r([g()],a.prototype,"enabled",null),a=r([k("esri.views.support.TileTreeDebugger")],a);export{a as b};
