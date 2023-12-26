import { useUserQuery } from "./hooks/useUserQuery";

export default function UserName() {
  const { data, isSuccess, isError } = useUserQuery();
  return (
    <div className="UserName">
      <h1>User Name</h1>
      {isSuccess && <p>{data.name}</p>}
      {isError && <p>데이터 반환 실패</p>}
    </div>
  );
}
