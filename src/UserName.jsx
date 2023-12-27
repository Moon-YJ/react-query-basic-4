import { useState } from "react";
import {
  //useDeleteQuery,
  useUpdateUser,
  useUserQuery,
} from "./hooks/useUserQuery";

export default function UserName() {
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
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={UserName || ""}
          onChange={(e) => setUserName(e.target.value)}
        />
      </form>
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
