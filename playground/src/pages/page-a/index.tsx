import { useMetas } from 'react-configurable-router'

export default function () {
  const { metas } = useMetas()
  console.log(metas, 'metas')
  return <div>page a</div>
}
