import * as React from "react"
import Svg, { Path } from "react-native-svg"

const CamSvg = (props) => (
  <Svg
    width={60}
    height={49}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19 .5a5 5 0 0 0-5 5v1H5a5 5 0 0 0-5 5v32a5 5 0 0 0 5 5h50a5 5 0 0 0 5-5v-32a5 5 0 0 0-5-5h-8v-1a5 5 0 0 0-5-5H19Zm11 42c9.389 0 17-7.611 17-17s-7.611-17-17-17-17 7.611-17 17 7.611 17 17 17Zm0-7c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10Zm23-18a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
      fill="#B9BBC5"
    />
  </Svg>
)

export default CamSvg;
