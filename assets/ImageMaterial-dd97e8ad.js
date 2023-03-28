import{bs as P,gn as m,go as y,b6 as g,bA as b,w as _,gp as $,bG as u,bt as O,gq as A,gr as S,gs as x,j as o,eb as v,gt as C,gu as p,bL as E,_ as w,gv as F,fc as T,e as n,bU as l,ea as d,bM as D,bN as N,bO as M,bP as R,gw as I,gx as L,gy as U,bQ as G,gz as B,bR as W,bS as z,gA as H,bT as j,gB as q,bV as Q,gC as V,gD as k,E as c,gE as J,gF as K,gG as X,gH as Y}from"./index-70df4575.js";function Z(a){const e=new P,{vertex:t,fragment:s}=e;return m(t,a),e.include(y,a),e.attributes.add(g.POSITION,"vec3"),e.attributes.add(g.UV0,"vec2"),e.varyings.add("vpos","vec3"),a.hasMultipassTerrain&&e.varyings.add("depth","float"),t.uniforms.add(new b("textureCoordinateScaleFactor",r=>_(r.texture)&&_(r.texture.descriptor.textureCoordinateScaleFactor)?r.texture.descriptor.textureCoordinateScaleFactor:$)),t.code.add(u`
    void main(void) {
      vpos = position;
      ${a.hasMultipassTerrain?"depth = (view * vec4(vpos, 1.0)).z;":""}
      vTexCoord = uv0 * textureCoordinateScaleFactor;
      gl_Position = transformPosition(proj, view, vpos);
    }
  `),e.include(O,a),e.include(A,a),s.uniforms.add([new S("tex",r=>r.texture),new x("opacity",r=>r.opacity)]),e.varyings.add("vTexCoord","vec2"),a.output===o.Alpha?s.code.add(u`
    void main() {
      discardBySlice(vpos);
      ${a.hasMultipassTerrain?"terrainDepthTest(gl_FragCoord, depth);":""}

      float alpha = texture2D(tex, vTexCoord).a * opacity;
      if (alpha  < ${u.float(v)}) {
        discard;
      }

      gl_FragColor = vec4(alpha);
    }
    `):(s.include(C),s.code.add(u`
    void main() {
      discardBySlice(vpos);
      ${a.hasMultipassTerrain?"terrainDepthTest(gl_FragCoord, depth);":""}
      gl_FragColor = texture2D(tex, vTexCoord) * opacity;

      if (gl_FragColor.a < ${u.float(v)}) {
        discard;
      }

      gl_FragColor = highlightSlice(gl_FragColor, vpos);
      ${a.transparencyPassType===p.Color?"gl_FragColor = premultiplyAlpha(gl_FragColor);":""}
    }
    `)),e}const ee=Object.freeze(Object.defineProperty({__proto__:null,build:Z},Symbol.toStringTag,{value:"Module"}));class h extends D{initializeProgram(e){return new N(e.rctx,h.shader.get().build(this.configuration),M)}_setPipelineState(e,t){const s=this.configuration,r=e===p.NONE,f=e===p.FrontFace;return R({blending:s.output!==o.Color&&s.output!==o.Alpha||!s.transparent?null:r?te:I(e),culling:L(s.cullFace),depthTest:{func:U(e)},depthWrite:r?s.writeDepth?G:null:B(e),colorWrite:W,stencilWrite:s.hasOccludees?z:null,stencilTest:s.hasOccludees?t?H:j:null,polygonOffset:r||f?null:q(s.enableOffset)})}initializePipeline(){return this._occludeePipelineState=this._setPipelineState(this.configuration.transparencyPassType,!0),this._setPipelineState(this.configuration.transparencyPassType,!1)}getPipelineState(e,t){return t?this._occludeePipelineState:super.getPipelineState(e,t)}}h.shader=new E(ee,()=>w(()=>import("./ImageMaterial.glsl-6411d7c0.js"),["assets/ImageMaterial.glsl-6411d7c0.js","assets/index-70df4575.js","assets/index-c56bc7db.css"]));const te=F(T.ONE,T.ONE_MINUS_SRC_ALPHA);class i extends Q{constructor(){super(...arguments),this.output=o.Color,this.cullFace=d.None,this.hasSlicePlane=!1,this.transparent=!1,this.enableOffset=!0,this.writeDepth=!0,this.hasOccludees=!1,this.transparencyPassType=p.NONE,this.hasMultipassTerrain=!1,this.cullAboveGround=!1}}n([l({count:o.COUNT})],i.prototype,"output",void 0),n([l({count:d.COUNT})],i.prototype,"cullFace",void 0),n([l()],i.prototype,"hasSlicePlane",void 0),n([l()],i.prototype,"transparent",void 0),n([l()],i.prototype,"enableOffset",void 0),n([l()],i.prototype,"writeDepth",void 0),n([l()],i.prototype,"hasOccludees",void 0),n([l({count:p.COUNT})],i.prototype,"transparencyPassType",void 0),n([l()],i.prototype,"hasMultipassTerrain",void 0),n([l()],i.prototype,"cullAboveGround",void 0);class ie extends V{constructor(e){super(e,new se),this.supportsEdges=!0,this._configuration=new i}getConfiguration(e,t){return this._configuration.output=e,this._configuration.cullFace=this.parameters.cullFace,this._configuration.hasSlicePlane=this.parameters.hasSlicePlane,this._configuration.transparent=this.parameters.transparent,this._configuration.writeDepth=this.parameters.writeDepth,this._configuration.hasOccludees=this.parameters.hasOccludees,this._configuration.transparencyPassType=t.transparencyPassType,this._configuration.enableOffset=t.camera.relativeElevation<k,this._configuration.hasMultipassTerrain=t.multipassTerrain.enabled,this._configuration.cullAboveGround=t.multipassTerrain.cullAboveGround,this._configuration}requiresSlot(e,t){return t===o.Color||t===o.Alpha||t===o.Highlight?e===c.DRAPED_MATERIAL?!0:t===o.Highlight?e===c.OPAQUE_MATERIAL:e===(this.parameters.transparent?this.parameters.writeDepth?c.TRANSPARENT_MATERIAL:c.TRANSPARENT_DEPTH_WRITE_DISABLED_MATERIAL:c.OPAQUE_MATERIAL):!1}createGLMaterial(e){return new ae(e)}createBufferWriter(){return new J(K)}}class ae extends X{constructor(e){super({...e,...e.material.parameters})}_updateParameters(e){return this.updateTexture(this._material.parameters.textureId),this._material.setParameters(this.textureBindParameters),this.ensureTechnique(h,e)}_updateOccludeeState(e){e.hasOccludees!==this._material.parameters.hasOccludees&&(this._material.setParameters({hasOccludees:e.hasOccludees}),this._updateParameters(e))}beginSlot(e){return this._output!==o.Color&&this._output!==o.Alpha||this._updateOccludeeState(e),this._updateParameters(e)}}class se extends Y{constructor(){super(...arguments),this.transparent=!1,this.writeDepth=!0,this.hasSlicePlane=!1,this.cullFace=d.None,this.hasOccludees=!1,this.opacity=1,this.textureId=null,this.initTextureTransparent=!0}}export{ie as c,Z as f};
