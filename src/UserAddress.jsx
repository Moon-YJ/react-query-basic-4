import { useUserQuery } from "./hooks/useUserQuery";

export default function UserAddress() {
  const result = useUserQuery(2);
  console.log(result);

  return (
    <div className="UserAddress">
      <h1>User Address</h1>
      {/* {isSuccess && <p>{data.address.street}</p>}
      {isError && <p>데이터 반환 실패</p>} */}
    </div>
  );
}
