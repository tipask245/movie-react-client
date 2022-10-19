import { useState } from "react"

const useInput = (initVal) => {
  const [value, setValue] = useState(initVal)

  const onChange = (e) => {
    setValue(e.target.value)
  }

  return {
    value, onChange
  }
}

export default useInput