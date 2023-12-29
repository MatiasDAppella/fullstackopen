// Components
import Part from "./Part";

// Constants
import { courseParts } from "../constants";

const Content = () => {
  return <ul>
    {
      courseParts.map(part => <Part key={part.name} part={part}/>)
    }
  </ul>
}

export default Content;