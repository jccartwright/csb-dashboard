import{e as r,y as o,b as j,h1 as A,d9 as N,C as J,aL as x,w as R,aR as z,T as F,rd as H,rq as V,rr as Z,rs as k,r8 as U,rp as K,rt as W,r9 as X,mO as Y,mP as ee,ra as te,mQ as re,ru as I,h4 as se,aj as O,rv as oe,rg as ie,iJ as ne,aK as pe,eL as $,rx as ae,ry as le,rw as ue,rz as de,h7 as ce,h8 as ye,rB as he,h6 as fe,rC as me,rE as ge,mV as ve,hb as Se,cP as xe}from"./index-70df4575.js";import{N as Ce,F as T,v as D,x as we,k as be,T as Re,S as Fe,I as Ie,j as Oe}from"./ogcFeatureUtils-8c18333a.js";import"./geojson-990b6c4b.js";import"./clientSideDefaults-079224aa.js";import"./QueryEngineCapabilities-42e44ded.js";let d=class extends A{constructor(){super(...arguments),this.featureDefinition=null,this.type="ogc-feature"}load(e){return this.addResolvingPromise(this._loadOGCServices(this.layer,e)),this.when()}getSource(){const{featureDefinition:{collection:e,layerDefinition:t,spatialReference:i,supportedCrs:n},layer:{apiKey:p,customParameters:l,effectiveMaxRecordCount:a}}=this;return{type:"ogc-source",collection:e,layerDefinition:t,maxRecordCount:a,queryParameters:{apiKey:p,customParameters:l},spatialReference:i,supportedCrs:n}}queryExtent(e,t={}){return null}queryFeatureCount(e,t={}){return null}queryFeatures(e,t={}){return this.queryFeaturesJSON(e,t).then(i=>N.fromJSON(i))}queryFeaturesJSON(e,t={}){const i=this.getSource();return this.load(t).then(()=>Ce(i,e,t))}queryObjectIds(e,t={}){return null}serviceSupportsSpatialReference(e){return!(!e.isWGS84&&!e.isWebMercator)||!!this.featureDefinition.supportedCrs[e.wkid]}_conformsToType(e,t){const i=new RegExp(`^${t}$`,"i");return e.conformsTo.some(n=>i.test(n))??!1}_getCapabilities(e,t){return{analytics:{supportsCacheHint:!1},attachment:null,data:{isVersioned:!1,supportsAttachment:!1,supportsM:!1,supportsZ:e},metadata:{supportsAdvancedFieldProperties:!1},operations:{supportsCalculate:!1,supportsTruncate:!1,supportsValidateSql:!1,supportsAdd:!1,supportsDelete:!1,supportsEditing:!1,supportsChangeTracking:!1,supportsQuery:!1,supportsQueryAnalytics:!1,supportsQueryAttachments:!1,supportsQueryTopFeatures:!1,supportsResizeAttachments:!1,supportsSync:!1,supportsUpdate:!1,supportsExceedsLimitStatistics:!1},query:{maxRecordCount:t,maxRecordCountFactor:void 0,standardMaxRecordCount:void 0,supportsCacheHint:!1,supportsCentroid:!1,supportsDisjointSpatialRelationship:!1,supportsDistance:!1,supportsDistinct:!1,supportsExtent:!1,supportsFormatPBF:!1,supportsGeometryProperties:!1,supportsHavingClause:!1,supportsHistoricMoment:!1,supportsMaxRecordCountFactor:!1,supportsOrderBy:!1,supportsPagination:!1,supportsPercentileStatistics:!1,supportsQuantization:!1,supportsQuantizationEditMode:!1,supportsQueryByOthers:!1,supportsQueryGeometry:!1,supportsResultType:!1,supportsStandardizedQueriesOnly:!1,supportsTopFeaturesQuery:!1,supportsStatistics:!1,supportsSpatialAggregationStatistics:!1,supportedSpatialAggregationStatistics:{envelope:!1,centroid:!1,convexHull:!1},supportsDefaultSpatialReference:!1,supportsFullTextSearch:!1,supportsCompactGeometry:!1,supportsSqlExpression:!1,tileMaxRecordCount:void 0},queryRelated:{supportsCount:!1,supportsOrderBy:!1,supportsPagination:!1,supportsCacheHint:!1},queryTopFeatures:{supportsCacheHint:!1},editing:{supportsDeleteByAnonymous:!1,supportsDeleteByOthers:!1,supportsGeometryUpdate:!1,supportsGlobalId:!1,supportsReturnServiceEditsInSourceSpatialReference:!1,supportsRollbackOnFailure:!1,supportsUpdateByAnonymous:!1,supportsUpdateByOthers:!1,supportsUploadWithItemId:!1,supportsUpdateWithoutM:!1}}}_getMaxRecordCount(e){var i,n,p,l,a;const t=(i=e==null?void 0:e.components)==null?void 0:i.parameters;return((p=(n=t==null?void 0:t.limit)==null?void 0:n.schema)==null?void 0:p.maximum)??((a=(l=t==null?void 0:t.limitFeatures)==null?void 0:l.schema)==null?void 0:a.maximum)}_getStorageSpatialReference(e){const t=e.storageCrs??T,i=D(t);return J(i)?x.WGS84:new x({wkid:i})}_getSupportedSpatialReferences(e,t){const i="#/crs",n=e.crs??[T],p=n.includes(i)?n.filter(a=>a!==i).concat(t.crs??[]):n,l=/^http:\/\/www\.opengis.net\/def\/crs\/epsg\/.*\/3785$/i;return p.filter(a=>!l.test(a))}async _loadOGCServices(e,t){const i=R(t)?t.signal:null,{apiKey:n,collectionId:p,customParameters:l,fields:a,geometryType:h,hasZ:f,objectIdField:P,timeInfo:m,url:E}=e,_={fields:a==null?void 0:a.map(u=>u.toJSON()),geometryType:z.toJSON(h),hasZ:f??!1,objectIdField:P,timeInfo:m==null?void 0:m.toJSON()},c={apiKey:n,customParameters:l,signal:i},g=await we(E,c),[C,w]=await Promise.all([be(g,c),Re(g,c)]);if(!this._conformsToType(C,"http://www.opengis.net/spec/ogcapi-features-1/1.0/conf/geojson"))throw new F("ogc-feature-layer:no-geojson-support","Server does not support geojson");const y=w.collections.find(u=>u.id===p);if(!y)throw new F("ogc-feature-layer:collection-not-found","Server does not contain the named collection");const q=this._conformsToType(C,"http://www.opengis.net/spec/ogcapi-features-1/1.0/conf/oas30")?await Fe(g,c):null,b=await Ie(y,_,c),M=this._getMaxRecordCount(q),G=this._getCapabilities(b.hasZ,M),Q=this._getStorageSpatialReference(y).toJSON(),B=this._getSupportedSpatialReferences(y,w),L=new RegExp(`^${Oe}`,"i"),v={};for(const u of B){const S=D(u);R(S)&&(v[S]||(v[S]=u.replace(L,"")))}this.featureDefinition={capabilities:G,collection:y,layerDefinition:b,spatialReference:Q,supportedCrs:v}}};r([o()],d.prototype,"featureDefinition",void 0),r([o({constructOnly:!0})],d.prototype,"layer",void 0),r([o()],d.prototype,"type",void 0),d=r([j("esri.layers.graphics.sources.OGCFeatureSource")],d);const $e=Se();let s=class extends H(V(Z(k(U(K(W(X(Y(ee(te(re(xe)))))))))))){constructor(e){super(e),this.capabilities=null,this.collectionId=null,this.copyright=null,this.definitionExpression=null,this.description=null,this.displayField=null,this.elevationInfo=null,this.fields=null,this.fieldsIndex=null,this.fullExtent=null,this.geometryType=null,this.hasZ=void 0,this.labelingInfo=null,this.labelsVisible=!0,this.legendEnabled=!0,this.maxRecordCount=null,this.objectIdField=null,this.operationalLayerType="OGCFeatureLayer",this.popupEnabled=!0,this.popupTemplate=null,this.screenSizePerspectiveEnabled=!0,this.source=new d({layer:this}),this.spatialReference=null,this.title=null,this.type="ogc-feature",this.typeIdField=null,this.types=null,this.url=null}destroy(){var e;(e=this.source)==null||e.destroy()}load(e){return this.addResolvingPromise(this.loadFromPortal({supportedTypes:["OGCFeatureServer"]},e).then(()=>this._fetchService(e))),this.when()}get defaultPopupTemplate(){return this.createPopupTemplate()}get effectiveMaxRecordCount(){var e;return this.maxRecordCount??((e=this.capabilities)==null?void 0:e.query.maxRecordCount)??5e3}get isTable(){return this.loaded&&this.geometryType==null}set renderer(e){I(e,this.fieldsIndex),this._set("renderer",e)}on(e,t){return super.on(e,t)}createPopupTemplate(e){return se(this,e)}createQuery(){return new O}getField(e){return this.fieldsIndex.get(e)}getFieldDomain(e,t){var a;let i,n=!1;const p=(a=t==null?void 0:t.feature)==null?void 0:a.attributes,l=this.typeIdField&&(p==null?void 0:p[this.typeIdField]);return l!=null&&this.types&&(n=this.types.some(h=>{var f;return h.id==l&&(i=(f=h.domains)==null?void 0:f[e],(i==null?void 0:i.type)==="inherited"&&(i=this._getLayerDomain(e)),!0)})),n||i||(i=this._getLayerDomain(e)),i}queryFeatures(e,t){return this.load().then(()=>this.source.queryFeatures(O.from(e)||this.createQuery(),t)).then(i=>{var n;return(n=i==null?void 0:i.features)==null||n.forEach(p=>{p.layer=p.sourceLayer=this}),i})}serviceSupportsSpatialReference(e){var t;return((t=this.source)==null?void 0:t.serviceSupportsSpatialReference(e))??!1}async _fetchService(e){await this.source.load(e),this.read(this.source.featureDefinition,{origin:"service"}),I(this.renderer,this.fieldsIndex),oe(this.timeInfo,this.fieldsIndex)}_getLayerDomain(e){if(!this.fields)return null;for(const t of this.fields)if(t.name===e&&t.domain)return t.domain;return null}};r([o({readOnly:!0,json:{origins:{service:{read:!0}}}})],s.prototype,"capabilities",void 0),r([o({type:String,json:{write:!0}})],s.prototype,"collectionId",void 0),r([o({type:String})],s.prototype,"copyright",void 0),r([o({readOnly:!0})],s.prototype,"defaultPopupTemplate",null),r([o({type:String})],s.prototype,"definitionExpression",void 0),r([o({readOnly:!0,type:String,json:{origins:{service:{name:"collection.description"}}}})],s.prototype,"description",void 0),r([o({type:String})],s.prototype,"displayField",void 0),r([o({type:Number})],s.prototype,"effectiveMaxRecordCount",null),r([o(ie)],s.prototype,"elevationInfo",void 0),r([o({type:[ne],json:{origins:{service:{name:"layerDefinition.fields"}}}})],s.prototype,"fields",void 0),r([o($e.fieldsIndex)],s.prototype,"fieldsIndex",void 0),r([o({readOnly:!0,type:pe,json:{origins:{service:{name:"layerDefinition.extent"}}}})],s.prototype,"fullExtent",void 0),r([o({type:$.apiValues,json:{origins:{service:{name:"layerDefinition.geometryType",read:{reader:$.read}}}}})],s.prototype,"geometryType",void 0),r([o({type:Boolean,json:{origins:{service:{name:"layerDefinition.hasZ"}}}})],s.prototype,"hasZ",void 0),r([o({type:Boolean,readOnly:!0})],s.prototype,"isTable",null),r([o({type:[ae],json:{origins:{"web-document":{name:"layerDefinition.drawingInfo.labelingInfo",read:{reader:le},write:!0}}}})],s.prototype,"labelingInfo",void 0),r([o(ue)],s.prototype,"labelsVisible",void 0),r([o(de)],s.prototype,"legendEnabled",void 0),r([o({type:Number})],s.prototype,"maxRecordCount",void 0),r([o({type:String,json:{origins:{service:{name:"layerDefinition.objectIdField"}}}})],s.prototype,"objectIdField",void 0),r([o({type:["OGCFeatureLayer"]})],s.prototype,"operationalLayerType",void 0),r([o(ce)],s.prototype,"popupEnabled",void 0),r([o({type:ye,json:{name:"popupInfo",write:!0}})],s.prototype,"popupTemplate",void 0),r([o({types:he,json:{origins:{service:{name:"layerDefinition.drawingInfo.renderer",write:!1},"web-scene":{types:fe,name:"layerDefinition.drawingInfo.renderer",write:!0}},name:"layerDefinition.drawingInfo.renderer",write:!0}})],s.prototype,"renderer",null),r([o(me)],s.prototype,"screenSizePerspectiveEnabled",void 0),r([o({readOnly:!0})],s.prototype,"source",void 0),r([o({readOnly:!0,type:x,json:{origins:{service:{read:!0}}}})],s.prototype,"spatialReference",void 0),r([o({type:String,json:{write:{enabled:!0,ignoreOrigin:!0,isRequired:!0},origins:{service:{name:"collection.title"}}}})],s.prototype,"title",void 0),r([o({readOnly:!0,json:{read:!1}})],s.prototype,"type",void 0),r([o({type:String,readOnly:!0})],s.prototype,"typeIdField",void 0),r([o({type:[ge]})],s.prototype,"types",void 0),r([o(ve)],s.prototype,"url",void 0),s=r([j("esri.layers.OGCFeatureLayer")],s);const _e=s;export{_e as default};
