import * as React from "react"
import Svg, { Path } from "react-native-svg"

const HomeSvg = (props) => (
  <Svg
    width={18}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="m9 1.85 6.279 4.623A3 3 0 0 1 16.5 8.89v6.961a2.5 2.5 0 0 1-2.5 2.5H4a2.5 2.5 0 0 1-2.5-2.5V8.89a3 3 0 0 1 1.221-2.417L9 1.85Z"
      stroke="gray"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default HomeSvg;