import * as React from "react"
import Svg, { Path } from "react-native-svg"

const CheckSvg = (props) => (
  <Svg
    width={14}
    height={14}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="m2.333 7 3.5 3.5 5.834-7"
      stroke="gray"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default CheckSvg
