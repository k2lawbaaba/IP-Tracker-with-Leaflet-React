import React, { useEffect, useMemo } from "react"
import { Marker, Popup, useMap } from "react-leaflet"

export default function Markerposition( prop ) {
  const position = useMemo(() => {
    return prop.cord
  }, [prop.cord])
  const map = useMap()

  useEffect(() => {
    map.flyTo(position, 13, {
      animate: true,
    })
  }, [map, position])

  return (
    <>
      <Marker icon={prop.icon} position={position}>
        <Popup>{prop.card}</Popup>
      </Marker>
    </>
  )
}
