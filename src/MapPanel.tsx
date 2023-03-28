import { useRef, useEffect, useState } from "react"
import ArcGISMap from "@arcgis/core/Map"
import SceneView from "@arcgis/core/views/SceneView"
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import CoordinateConversion from "@arcgis/core/widgets/CoordinateConversion.js"
import './MapPanel.css'
import HexbinsLayer from "./HexbinsLayer";


export default function MapPanel({hexbins}) {
  const baseClass = 'MapPanel'
  const mapDiv = useRef<HTMLDivElement>(null)
  const mapViewRef = useRef<SceneView>()
  const graphicsLayerRef = useRef<GraphicsLayer>()
  const defaultCenter = [-98.5833, 39.8333]
  const defaultZoom = 4
  
  // one-time setup
  useEffect(() => {
    if (! mapDiv.current) {
      console.warn("mapDiv not yet available")
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
  

  useEffect(() => {
    if (! (hexbins && graphicsLayerRef.current)) {
      // console.log('waiting on data and/or graphics layer')
      return
    }

    const hexbinsLayer = HexbinsLayer(graphicsLayerRef.current, hexbins)

  }, [hexbins])
 
  return (
    <div className={baseClass} ref={mapDiv}>
    </div>
  )
}