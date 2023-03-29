import Feature from "@arcgis/core/widgets/Feature.js"
import Graphic from "@arcgis/core/Graphic"
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer"
import Polygon from "@arcgis/core/geometry/Polygon"
import PopupTemplate from "@arcgis/core/PopupTemplate"
import {cellToBoundary} from "h3-js"
import { HexbinDataType } from "./types"


export default function HexbinsLayer(graphicsLayer:GraphicsLayer, hexbins:Array<HexbinDataType>) {
  const hexbinBoundaryWidth = 0
  const cellCounts = hexbins.map(item => item.count)
  const minCount = cellCounts.reduce((a,b) => Math.min(a,b))
  const maxCount = cellCounts.reduce((a,b) => Math.max(a,b))

  const popupTemplate = new PopupTemplate({
    title: '{h3}',
    content: formatPopupContent
  })
  const graphics: Graphic[] = []
  hexbins.forEach( cell => {
    const hexGraphic = new Graphic({
        geometry: new Polygon({
          rings: [ cellToBoundary(cell.h3, true) ]
        }),
        attributes: cell,
        symbol: getSimpleFillSymbol(cell.count),
        popupTemplate: popupTemplate
      })
      if (hexGraphic.geometry.extent.width > 50) {
          translateGraphic(hexGraphic)
      }
      graphics.push(hexGraphic)
  })
  console.log(`adding ${graphics.length} hexbins...`)
  graphicsLayer.removeAll()
  graphicsLayer.graphics.addMany(graphics)        

}

function getSimpleFillSymbol (count:number) {
  // hardcoded Jencks classification and color ramp
  const opacity = 0.5
  // const randomColor = [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), opacity]
  
  let fillColor = [255, 0, 0, opacity] // red (default)
  // if (count > 44425859) {
  //   fillColor = [0, 128, 0, opacity]   // green
  // } else if (count > 21533129) {
  //   fillColor = [54, 205, 50, opacity] // yellow-green 
  // } else if (count > 9319911) {
  //   fillColor = [255, 255, 0, opacity] // yellow
  // } else if (count > 2132690) {
  //   fillColor = [255, 69, 0, opacity]  // orange-red
  // }

  if (count > 1000000) {
    fillColor = [0, 128, 0, opacity]   // green
  } else if (count > 500000) {
    fillColor = [54, 205, 50, opacity] // yellow-green 
  } else if (count > 50000) {
    fillColor = [255, 255, 0, opacity] // yellow
  } else if (count > 1000) {
    fillColor = [255, 69, 0, opacity]  // orange-red
  }

  return {
    type: 'simple-fill',
    color: fillColor,
    outline: {
      color: 'whitesmoke',
      width: 0
    }
  }
}

function formatPopupContent(feature: Feature) {
  const formattedCount = parseInt(feature.graphic.attributes.count).toLocaleString()
  return `${formattedCount} soundings within this hexbin`
  // return `${formattedCount} soundings within this hexbin.<br/>Center is ${feature.graphic.geometry.centroid.longitude.toFixed(5)}, ${feature.graphic.geometry.centroid.latitude.toFixed(5)} lon/lat`
}

// WARNING: mutates the provided geometry
// TODO fix TypeScript errors
function translateGraphic(graphic:Graphic) {
  // @ts-ignore
  const shifted_rings = []

  const polygon = graphic.geometry as Polygon
  if (polygon.rings.length > 1) {
      console.warn('function only supports simple geometries')
      return
  }
  polygon.rings[0].forEach(pair => {
      if (pair[0]<0) {
          shifted_rings.push([pair[0]+360, pair[1]])
      } else {
          shifted_rings.push(pair)
      }
  })
  // @ts-ignore
  polygon.rings = [shifted_rings]
}
