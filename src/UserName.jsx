import { useState } from "react";
import { useUserQuery } from "./hooks/useUserQuery";

export default function UserName() {
  const { data, isSuccess, isError } = useUserQuery(1);
  const [Num, setNum] = useState(0);

  return (
    <div className="UserName">
      <h1>User Name</h1>
      <p>{Num}</p>
      <button onClick={() => setNum(Num + 1)}>Plus</button>
      {isSuccess && <p>{data.name}</p>}
      {isError && <p>데이터 반환 실패</p>}
    </div>
  );
}
