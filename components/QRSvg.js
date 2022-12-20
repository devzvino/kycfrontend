import * as React from "react"
import Svg, { Mask, Path, G } from "react-native-svg"

const QRSvg = (props) => (
  <Svg
    width={18}
    height={19}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Mask
      id="a"
      style={{
        maskType: "alpha",
      }}
      maskUnits="userSpaceOnUse"
      x={0}
      y={0}
      width={18}
      height={19}
    >
      <Path fill="#fff" d="M0 .1h18v18H0z" />
    </Mask>
    <G mask="url(#a)" stroke="gray" strokeWidth={1.5}>
      <Path d="M.75.85h4.5v4.5H.75zM.75 12.85h4.5v4.5H.75zM12.75.85h4.5v4.5h-4.5zM7.5.85h3M7.5 3.1h3M9 9.1h3M9.75 13.6h3.75M6 7.6h3M0 9.1h3M4.5 9.1h3M7.5 10.6H9M15 15.1h1.5M16.5 11.35H18M10.5 7.6H12M7.5 13.6h2.25M14.25 8.35H18M12 12.1h3M7.5 17.35h6M8.25.85V6.1M9.75 11.35v5.25M17.25 14.35v3.75M14.25 7.6v4.5" />
    </G>
  </Svg>
)

export default QRSvg;
