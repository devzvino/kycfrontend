import * as React from "react"
import Svg, { Path } from "react-native-svg"

const AddSvg = (props) => (
  <Svg
    width={48}
    height={49}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 24.1C0 10.845 10.745.1 24 .1s24 10.745 24 24-10.745 24-24 24-24-10.745-24-24Zm24-10a1 1 0 0 1 1 1v8h8a1 1 0 1 1 0 2h-8v8a1 1 0 1 1-2 0v-8h-8a1 1 0 1 1 0-2h8v-8a1 1 0 0 1 1-1Z"
      fill="#2FBF00"
    />
  </Svg>
)

export default AddSvg
