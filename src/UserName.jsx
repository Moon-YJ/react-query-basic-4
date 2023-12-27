import { useState } from "react";
import { useUserQuery } from "./hooks/useUserQuery";

export default function UserName() {
  const [Num, setNum] = useState(1);
  const { data, isSuccess, isError } = useUserQuery(Num);

  return (
    <div className="UserName">
      <h1>User Name</h1>
      <p>{Num}</p>
      <button onClick={() => setNum(1)}>변경1</button>
      <button onClick={() => setNum(2)}>변경2</button>
      <h2>name1: {isSuccess && data.name}</h2>
      {isError && <p>데이터 반환 실패</p>}
    </div>
  );
}
