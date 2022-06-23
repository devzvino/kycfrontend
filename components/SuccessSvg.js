import * as React from "react"
import Svg, { Path } from "react-native-svg"

const SvgComponent = (props) => (
  <Svg
    width={61}
    height={61}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.956 5.74a29.778 29.778 0 1 1 33.088 49.52A29.778 29.778 0 0 1 13.956 5.74Zm2.068 46.424A26.056 26.056 0 1 0 44.976 8.835a26.056 26.056 0 0 0-28.952 43.33ZM47.8 18.978a1.861 1.861 0 0 1 1.312 3.184L25.829 45.39l-13.94-13.903a1.89 1.89 0 0 1 2.773-2.568l11.166 11.167 20.659-20.566c.349-.346.82-.54 1.312-.54Z"
      fill="#2FBF00"
    />
  </Svg>
)

export default SvgComponent;
