import { CoursePart } from "../types";

interface PartProps {
  part: CoursePart
}

const Part = (props: PartProps) => {
  const { part } = props;

  switch (part.kind) {
    case ("basic"):
      return <li>
        <strong>{part.name}</strong>
        <p>Exercises: {part.exerciseCount}</p>
        <p>Description: {part.description || "-"}</p>
      </li>
    case ("group"):
      return <li>
        <strong>{part.name}</strong>
        <p>Exercises: {part.exerciseCount}</p>
        <p>Group: {part.groupProjectCount}</p>
      </li>
    case ("background"):
      return <li>
        <strong>{part.name}</strong>
        <p>Exercises: {part.exerciseCount}</p>
        <p>Description: {part.description || "-"}</p>
        <p>Background: {part.backgroundMaterial}</p>
      </li>
    case ("special"):
      return <li>
        <strong>{part.name}</strong>
        <p>Exercises: {part.exerciseCount}</p>
        <p>Description: {part.description || "-"}</p>
        <p>
          {
            "Requirements: "
          }
          {
            part.requirements.map((r, index, total) =>
              (index === total.length - 1 ) ? `${r}` : `${r}, `
            )
          }
        </p>
      </li>
    default:
      return <li>
        <strong>Not contemplated kind of part.</strong>
      </li>
  }
}

export default Part;