import{T as l,i as P,b6 as U,e1 as S}from"./index-70df4575.js";const d=!0,m={identifierOffset:0,identifierLength:10,versionOffset:10,checksumOffset:12,byteCount:16};function z(e,t,r){return{identifier:String.fromCharCode.apply(null,new Uint8Array(e,r+m.identifierOffset,m.identifierLength)),version:t.getUint16(r+m.versionOffset,d),checksum:t.getUint32(r+m.checksumOffset,d)}}const g={sizeLo:0,sizeHi:4,minX:8,minY:16,minZ:24,maxX:32,maxY:40,maxZ:48,errorX:56,errorY:64,errorZ:72,count:80,reserved:84,byteCount:88};function Y(e,t){return{sizeLo:e.getUint32(t+g.sizeLo,d),sizeHi:e.getUint32(t+g.sizeHi,d),minX:e.getFloat64(t+g.minX,d),minY:e.getFloat64(t+g.minY,d),minZ:e.getFloat64(t+g.minZ,d),maxX:e.getFloat64(t+g.maxX,d),maxY:e.getFloat64(t+g.maxY,d),maxZ:e.getFloat64(t+g.maxZ,d),errorX:e.getFloat64(t+g.errorX,d),errorY:e.getFloat64(t+g.errorY,d),errorZ:e.getFloat64(t+g.errorZ,d),count:e.getUint32(t+g.count,d),reserved:e.getUint32(t+g.reserved,d)}}function K(e){const t=new DataView(e,0);let r=0;const{identifier:c,version:o}=z(e,t,r);if(r+=m.byteCount,c!=="LEPCC     ")throw new l("lepcc-decode-error","Bad identifier");if(o>1)throw new l("lepcc-decode-error","Unknown version");const n=Y(t,r);if(r+=g.byteCount,n.sizeHi*2**32+n.sizeLo!==e.byteLength)throw new l("lepcc-decode-error","Bad size");const s=new Float64Array(3*n.count),a=[],i=[],u=[],f=[];if(r=I(e,r,a),r=I(e,r,i),r=I(e,r,u),r=I(e,r,f),r!==e.byteLength)throw new l("lepcc-decode-error","Bad length");let w=0,b=0;for(let y=0;y<a.length;y++){b+=a[y];let v=0;for(let C=0;C<i[y];C++){v+=u[w];const D=f[w];s[3*w]=Math.min(n.maxX,n.minX+2*n.errorX*v),s[3*w+1]=Math.min(n.maxY,n.minY+2*n.errorY*b),s[3*w+2]=Math.min(n.maxZ,n.minZ+2*n.errorZ*D),w++}}return{errorX:n.errorX,errorY:n.errorY,errorZ:n.errorZ,result:s}}function I(e,t,r){const c=[];t=L(e,t,c);const o=[];for(let n=0;n<c.length;n++){o.length=0,t=L(e,t,o);for(let s=0;s<o.length;s++)r.push(o[s]+c[n])}return t}function L(e,t,r){const c=new DataView(e,t),o=c.getUint8(0),n=31&o,s=!!(32&o),a=(192&o)>>6;let i=0;if(a===0)i=c.getUint32(1,d),t+=5;else if(a===1)i=c.getUint16(1,d),t+=3;else{if(a!==2)throw new l("lepcc-decode-error","Bad count type");i=c.getUint8(1),t+=2}if(s)throw new l("lepcc-decode-error","LUT not implemented");const u=Math.ceil(i*n/8),f=new Uint8Array(e,t,u);let w=0,b=0,y=0;const v=-1>>>32-n;for(let C=0;C<i;C++){for(;b<n;)w|=f[y]<<b,b+=8,y+=1;r[C]=w&v,w>>>=n,b-=n,b+n>32&&(w|=f[y-1]>>8-b)}return t+y}const p={sizeLo:0,sizeHi:4,count:8,colorMapCount:12,lookupMethod:14,compressionMethod:15,byteCount:16};function $(e,t){return{sizeLo:e.getUint32(t+p.sizeLo,d),sizeHi:e.getUint32(t+p.sizeHi,d),count:e.getUint32(t+p.count,d),colorMapCount:e.getUint16(t+p.colorMapCount,d),lookupMethod:e.getUint8(t+p.lookupMethod),compressionMethod:e.getUint8(t+p.compressionMethod)}}function V(e){const t=new DataView(e,0);let r=0;const{identifier:c,version:o}=z(e,t,r);if(r+=m.byteCount,c!=="ClusterRGB")throw new l("lepcc-decode-error","Bad identifier");if(o>1)throw new l("lepcc-decode-error","Unknown version");const n=$(t,r);if(r+=p.byteCount,n.sizeHi*2**32+n.sizeLo!==e.byteLength)throw new l("lepcc-decode-error","Bad size");if((n.lookupMethod===2||n.lookupMethod===1)&&n.compressionMethod===0){if(3*n.colorMapCount+n.count+r!==e.byteLength||n.colorMapCount>256)throw new l("lepcc-decode-error","Bad count");const s=new Uint8Array(e,r,3*n.colorMapCount),a=new Uint8Array(e,r+3*n.colorMapCount,n.count),i=new Uint8Array(3*n.count);for(let u=0;u<n.count;u++){const f=a[u];i[3*u]=s[3*f],i[3*u+1]=s[3*f+1],i[3*u+2]=s[3*f+2]}return i}if(n.lookupMethod===0&&n.compressionMethod===0){if(3*n.count+r!==e.byteLength||n.colorMapCount!==0)throw new l("lepcc-decode-error","Bad count");return new Uint8Array(e,r).slice()}if(n.lookupMethod<=2&&n.compressionMethod===1){if(r+3!==e.byteLength||n.colorMapCount!==1)throw new l("lepcc-decode-error","Bad count");const s=t.getUint8(r),a=t.getUint8(r+1),i=t.getUint8(r+2),u=new Uint8Array(3*n.count);for(let f=0;f<n.count;f++)u[3*f]=s,u[3*f+1]=a,u[3*f+2]=i;return u}throw new l("lepcc-decode-error","Bad method "+n.lookupMethod+","+n.compressionMethod)}const h={sizeLo:0,sizeHi:4,count:8,scaleFactor:12,bitsPerPoint:14,reserved:15,byteCount:16};function R(e,t){return{sizeLo:e.getUint32(t+h.sizeLo,d),sizeHi:e.getUint32(t+h.sizeHi,d),count:e.getUint32(t+h.count,d),scaleFactor:e.getUint16(t+h.scaleFactor,d),bitsPerPoint:e.getUint8(t+h.bitsPerPoint),reserved:e.getUint8(t+h.reserved)}}function X(e){const t=new DataView(e,0);let r=0;const{identifier:c,version:o}=z(e,t,r);if(r+=m.byteCount,c!=="Intensity ")throw new l("lepcc-decode-error","Bad identifier");if(o>1)throw new l("lepcc-decode-error","Unknown version");const n=R(t,r);if(r+=h.byteCount,n.sizeHi*2**32+n.sizeLo!==e.byteLength)throw new l("lepcc-decode-error","Bad size");const s=new Uint16Array(n.count);if(n.bitsPerPoint===8){if(n.count+r!==e.byteLength)throw new l("lepcc-decode-error","Bad size");const a=new Uint8Array(e,r,n.count);for(let i=0;i<n.count;i++)s[i]=a[i]*n.scaleFactor}else if(n.bitsPerPoint===16){if(2*n.count+r!==e.byteLength)throw new l("lepcc-decode-error","Bad size");const a=new Uint16Array(e,r,n.count);for(let i=0;i<n.count;i++)s[i]=a[i]*n.scaleFactor}else{const a=[];if(L(e,r,a)!==e.byteLength)throw new l("lepcc-decode-error","Bad size");for(let i=0;i<n.count;i++)s[i]=a[i]*n.scaleFactor}return s}const M=P.getLogger("esri.views.3d.layers.i3s.I3SBinaryReader");function Z(e,t,r){let c="",o=0;for(;o<r;){const n=e[t+o];if(n<128)c+=String.fromCharCode(n),o++;else if(n>=192&&n<224){if(o+1>=r)throw new l("utf8-decode-error","UTF-8 Decode failed. Two byte character was truncated.");const s=(31&n)<<6|63&e[t+o+1];c+=String.fromCharCode(s),o+=2}else if(n>=224&&n<240){if(o+2>=r)throw new l("utf8-decode-error","UTF-8 Decode failed. Multi byte character was truncated.");const s=(15&n)<<12|(63&e[t+o+1])<<6|63&e[t+o+2];c+=String.fromCharCode(s),o+=3}else{if(!(n>=240&&n<248))throw new l("utf8-decode-error","UTF-8 Decode failed. Invalid multi byte sequence.");{if(o+3>=r)throw new l("utf8-decode-error","UTF-8 Decode failed. Multi byte character was truncated.");const s=(7&n)<<18|(63&e[t+o+1])<<12|(63&e[t+o+2])<<6|63&e[t+o+3];if(s>=65536){const a=55296+(s-65536>>10),i=56320+(1023&s);c+=String.fromCharCode(a,i)}else c+=String.fromCharCode(s);o+=4}}}return c}function B(e,t){const r={byteOffset:0,byteCount:0,fields:Object.create(null)};let c=0;for(let o=0;o<t.length;o++){const n=t[o],s=n.valueType||n.type,a=q[s];r.fields[n.property]=a(e,c),c+=O[s].BYTES_PER_ELEMENT}return r.byteCount=c,r}function H(e,t,r){return T(e,t,r).map(c=>{const o=c?Date.parse(c):null;return o&&!Number.isNaN(o)?o:null})}function T(e,t,r){const c=[];let o,n,s=0;for(n=0;n<e;n+=1){if(o=t[n],o>0){if(c.push(Z(r,s,o-1)),r[s+o-1]!==0)throw new l("string-array-error","Invalid string array: missing null termination.")}else c.push(null);s+=o}return c}function F(e,t){return new O[t.valueType](e,t.byteOffset,t.count*t.valuesPerElement)}function N(e,t){return new Uint8Array(e,t.byteOffset,t.byteCount)}function j(e,t,r){const c=t.header!=null?B(e,t.header):{byteOffset:0,byteCount:0,fields:{count:r}},o={header:c,byteOffset:c.byteCount,byteCount:0,entries:Object.create(null)};let n=c.byteCount;for(let s=0;s<t.ordering.length;s++){const a=t.ordering[s],i=S(t[a]);if(i.count=c.fields.count??0,i.valueType==="String"){if(i.byteOffset=n,i.byteCount=c.fields[a+"ByteCount"],i.encoding!=="UTF-8")throw new l("unsupported-encoding","Unsupported String encoding.",{encoding:i.encoding});if(i.timeEncoding&&i.timeEncoding!=="ECMA_ISO8601")throw new l("unsupported-time-encoding","Unsupported time encoding.",{timeEncoding:i.timeEncoding})}else{if(!E(i.valueType))throw new l("unsupported-value-type","Unsupported binary valueType",{valueType:i.valueType});{const u=A(i.valueType);n+=n%u!=0?u-n%u:0,i.byteOffset=n,i.byteCount=u*i.valuesPerElement*i.count}}n+=i.byteCount??0,o.entries[a]=i}return o.byteCount=n-o.byteOffset,o}function k(e,t,r){if(t!==e&&M.error(`Invalid ${r} buffer size
 expected: ${e}, actual: ${t})`),t<e)throw new l("buffer-too-small","Binary buffer is too small",{expectedSize:e,actualSize:t})}function _(e){return{isDraco:!1,isLegacy:!1,color:e.color!=null,normal:e.normal!=null,uv0:e.uv0!=null,uvRegion:e.uvRegion!=null,featureIndex:e.faceRange!=null&&e.featureId!=null}}function Q(e,t){const r=B(e,t&&t.header);let c=r.byteCount;const o={isDraco:!1,header:r,byteOffset:r.byteCount,byteCount:0,vertexAttributes:{}},n=r.fields,s=n.vertexCount!=null?n.vertexCount:n.count;for(const u of t.ordering){if(!t.vertexAttributes[u])continue;const f={...t.vertexAttributes[u],byteOffset:c,count:s},w=x[u]?x[u]:"_"+u;o.vertexAttributes[w]=f,c+=A(f.valueType)*f.valuesPerElement*s}const a=n.faceCount;if(t.faces&&a){o.faces={};for(const u of t.ordering){if(!t.faces[u])continue;const f={...t.faces[u],byteOffset:c,count:a};o.faces[u]=f,c+=A(f.valueType)*f.valuesPerElement*a}}const i=n.featureCount;if(t.featureAttributes&&t.featureAttributeOrder&&i){o.featureAttributes={};for(const u of t.featureAttributeOrder){if(!t.featureAttributes[u])continue;const f={...t.featureAttributes[u],byteOffset:c,count:i};o.featureAttributes[u]=f,c+=(f.valueType==="UInt64"?8:A(f.valueType))*f.valuesPerElement*i}}return k(c,e.byteLength,"geometry"),o.byteCount=c-o.byteOffset,o}function ee(e,t){return!e||!e.compressedAttributes||e.compressedAttributes.encoding!=="draco"?e?_(e):G(t):W(e.compressedAttributes.attributes)}function G(e){const t={isDraco:!1,isLegacy:!0,color:!1,normal:!1,uv0:!1,uvRegion:!1,featureIndex:!1};for(const r of e.ordering)if(e.vertexAttributes[r])switch(r){case"position":break;case"normal":t.normal=!0;break;case"color":t.color=!0;break;case"uv0":t.uv0=!0;break;case"region":t.uvRegion=!0}return e.featureAttributes&&e.featureAttributeOrder&&(t.featureIndex=!0),t}function W(e){const t={isDraco:!0,isLegacy:!1,color:!1,normal:!1,uv0:!1,uvRegion:!1,featureIndex:!1};for(const r of e)switch(r){case"position":break;case"normal":t.normal=!0;break;case"uv0":t.uv0=!0;break;case"color":t.color=!0;break;case"uv-region":t.uvRegion=!0;break;case"feature-index":t.featureIndex=!0}return t}const x={position:U.POSITION,normal:U.NORMAL,color:U.COLOR,uv0:U.UV0,region:U.UVREGION};function te(e,t,r){if(e.encoding==="lepcc-rgb")return V(t);if(e.encoding==="lepcc-intensity")return X(t);if(e.encoding!=null&&e.encoding!=="")throw new l("unknown-attribute-storage-info-encoding","Unknown Attribute Storage Info Encoding");e["attributeByteCounts "]&&!e.attributeByteCounts&&(M.warn("Warning: Trailing space in 'attributeByteCounts '."),e.attributeByteCounts=e["attributeByteCounts "]),e.ordering[0]==="ObjectIds"&&e.hasOwnProperty("objectIds")&&(M.warn("Warning: Case error in objectIds"),e.ordering[0]="objectIds");const c=j(t,e,r);k(c.byteOffset+c.byteCount,t.byteLength,"attribute");const o=c.entries.attributeValues||c.entries.objectIds;if(o){if(o.valueType==="String"){const n=c.entries.attributeByteCounts,s=F(t,n),a=N(t,o);return o.timeEncoding?H(n.count,s,a):T(n.count,s,a)}return F(t,o)}throw new l("bad-attribute-storage-info","Bad attributeStorageInfo specification.")}const O={Float32:Float32Array,Float64:Float64Array,UInt8:Uint8Array,Int8:Int8Array,UInt16:Uint16Array,Int16:Int16Array,UInt32:Uint32Array,Int32:Int32Array},q={Float32:(e,t)=>new DataView(e,0).getFloat32(t,!0),Float64:(e,t)=>new DataView(e,0).getFloat64(t,!0),UInt8:(e,t)=>new DataView(e,0).getUint8(t),Int8:(e,t)=>new DataView(e,0).getInt8(t),UInt16:(e,t)=>new DataView(e,0).getUint16(t,!0),Int16:(e,t)=>new DataView(e,0).getInt16(t,!0),UInt32:(e,t)=>new DataView(e,0).getUint32(t,!0),Int32:(e,t)=>new DataView(e,0).getInt32(t,!0)};function E(e){return O.hasOwnProperty(e)}function A(e){return E(e)?O[e].BYTES_PER_ELEMENT:0}export{te as I,K as c,F as l,ee as p,Q as w};
