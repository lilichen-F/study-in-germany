import SchoolList from '../components/SchoolList';

export default function Schools() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-content-primary">語言學校</h1>
        <p className="mt-1 text-sm text-content-secondary">
          點進學校可查看學生評價；登入後即可發表自己的評價。
        </p>
      </div>
      <SchoolList />
    </div>
  );
}
