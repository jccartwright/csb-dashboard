import{gM as v,w as l,cA as d,aL as m,dg as g,ol as S,gT as M,gV as y,om as h}from"./index-1b8c5637.js";import{c as D,a as p,f as w,m as z}from"./PointCloudWorkerUtil-f3885e65.js";import"./PointCloudUniqueValueRenderer-544c99fa.js";import"./I3SBinaryReader-24647ffa.js";class _{transform(t){const a=this._transform(t),e=[a.points.buffer,a.rgb.buffer];l(a.pointIdFilterMap)&&e.push(a.pointIdFilterMap.buffer);for(const r of a.attributes)"buffer"in r.values&&d(r.values.buffer)&&r.values.buffer!==a.rgb.buffer&&e.push(r.values.buffer);return Promise.resolve({result:a,transferList:e})}_transform(t){const a=D(t.schema,t.geometryBuffer);let e=a.length/3,r=null;const i=[],s=p(t.primaryAttributeData,a,e);l(t.primaryAttributeData)&&s&&i.push({attributeInfo:t.primaryAttributeData.attributeInfo,values:s});const n=p(t.modulationAttributeData,a,e);l(t.modulationAttributeData)&&n&&i.push({attributeInfo:t.modulationAttributeData.attributeInfo,values:n});let f=w(t.rendererInfo,s,n,e);if(t.filterInfo&&t.filterInfo.length>0&&l(t.filterAttributesData)){const o=t.filterAttributesData.filter(l).map(b=>{const A=p(b,a,e),c={attributeInfo:b.attributeInfo,values:A};return i.push(c),c});r=new Uint32Array(e),e=z(a,f,r,t.filterInfo,o)}for(const o of t.userAttributesData){const b=p(o,a,e);i.push({attributeInfo:o.attributeInfo,values:b})}3*e<f.length&&(f=new Uint8Array(f.buffer.slice(0,3*e))),this._applyElevationOffsetInPlace(a,e,t.elevationOffset);const u=this._transformCoordinates(a,e,t.obb,m.fromJSON(t.inSR),m.fromJSON(t.outSR));return{obb:t.obb,points:u,rgb:f,attributes:i,pointIdFilterMap:r}}_transformCoordinates(t,a,e,r,i){if(!g(t,r,0,t,i,0,a))throw new Error("Can't reproject");const s=S(e.center[0],e.center[1],e.center[2]),n=h(),f=h();M(I,e.quaternion);const u=new Float32Array(3*a);for(let o=0;o<a;o++)n[0]=t[3*o]-s[0],n[1]=t[3*o+1]-s[1],n[2]=t[3*o+2]-s[2],y(f,n,I),e.halfSize[0]=Math.max(e.halfSize[0],Math.abs(f[0])),e.halfSize[1]=Math.max(e.halfSize[1],Math.abs(f[1])),e.halfSize[2]=Math.max(e.halfSize[2],Math.abs(f[2])),u[3*o]=n[0],u[3*o+1]=n[1],u[3*o+2]=n[2];return u}_applyElevationOffsetInPlace(t,a,e){if(e!==0)for(let r=0;r<a;r++)t[3*r+2]+=e}}const I=v();function C(){return new _}export{C as default};