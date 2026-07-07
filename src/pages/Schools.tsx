import { SchoolList } from '../components/SchoolList'

export function Schools() {
  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold text-slate-900">語言學校</h1>
      <p className="mb-6 text-sm text-slate-500">
        點進學校可查看學生評價；登入後即可發表自己的評價。
      </p>
      <SchoolList />
    </div>
  )
}
