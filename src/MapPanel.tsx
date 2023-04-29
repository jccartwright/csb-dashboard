import { useRef, useEffect, useState } from "react"
import ArcGISMap from "@arcgis/core/Map"
import SceneView from "@arcgis/core/views/SceneView"
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import CoordinateConversion from "@arcgis/core/widgets/CoordinateConversion.js"
import './MapPanel.css'
import HexbinsLayer from "./HexbinsLayer"
import { HexbinDataType } from "./types"

export default function MapPanel({query}) {
  const baseClass = 'MapPanel'
  const mapDiv = useRef<HTMLDivElement>(null)
  const mapViewRef = useRef<SceneView>()
  const graphicsLayerRef = useRef<GraphicsLayer>()
  const defaultCenter = [-98.5833, 39.8333]
  const defaultZoom = 4
  
  const hexbins = query.data?.counts_by_h3

  // map setup
  useEffect(() => {
    if (! mapDiv.current) {
      return
    }

    const map = new ArcGISMap({
      basemap: "oceans"
    });
    
    // const view = new MapView({
    //   map: map,
    //   container: mapDiv.current,
    //   zoom: defaultZoom,
    //   //center: [-90, 27]
    //   center: defaultCenter
    // });

    const view = new SceneView({
      map: map,
      container: mapDiv.current,
      zoom: defaultZoom,
      center: defaultCenter
    })
  
    graphicsLayerRef.current = new GraphicsLayer()
    map.add(graphicsLayerRef.current)

    let ccWidget = new CoordinateConversion({
      view: view
    });
  
    view.when(function(){
      // console.log('MapView is ready...');
      mapViewRef.current = view
      view.ui.add(ccWidget, "bottom-left");
    });
  
  }, [mapDiv.current])
  

  // add hexbins layer once data are available
  useEffect(() => {    
    if (! (hexbins && graphicsLayerRef.current)) {
      // console.log('waiting on data and/or graphics layer')
      return
    }
    const hexbinsLayer = HexbinsLayer(graphicsLayerRef.current, hexbins)
  
  }, [hexbins])
 

  return (
    <>
    <div className={baseClass} ref={mapDiv}></div>
    { query.isLoading ? <h3>loading data...</h3> : '' }
    { query.isError ? <p>Error: {query.error.message}</p> : '' }

    </>
  )
}