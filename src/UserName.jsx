import { useState } from "react";
import {
  //useDeleteQuery,
  useUpdateUser,
  useUserQuery,
} from "./hooks/useUserQuery";

export default function UserName() {
  // 순서1 - 해당 컴포넌트 마운트시, react-query훅으로 두번째 데이터를 호출 및 자동 캐싱처리
  const { data, isSuccess } = useUserQuery(2);
  const [UserName, setUserName] = useState("");

  // const deleteUser = useDeleteQuery();
  const updateUser = useUpdateUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser.mutate([UserName, 2]);
  };

  return (
    <div className="UserName">
      <h1>User Name</h1>
      {/* <button
        onClick={() => {
          deleteUser.mutate(2);
          //console.log(deleteUser);
        }}
      >
        유저 데이터 삭제
      </button> */}
      {/* 순서4 - form 전송 이벤트 발생시, input에 있는 변경할 사용자 이름과 변경할 데이터 순번을 배열로 묶어서 useUpdateUser 커스텀훅으로 활성화시킨 useMutation객체를 가져와서 mutate 메서드에 인수로 전달 */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={UserName || ""}
          onChange={(e) => setUserName(e.target.value)}
        />
      </form>
      {/* 순서3 - useQuery훅에 의해서 캐싱반환된 데이터값 출력 */}
      <p>{isSuccess && data.name}</p>
      {/* <ul>
        {isSuccess ? (
          data.map((user) => <li key={user.id}>{user.name}</li>)
        ) : (
          <p>Loading...</p>
        )}
      </ul> */}
    </div>
  );
}
