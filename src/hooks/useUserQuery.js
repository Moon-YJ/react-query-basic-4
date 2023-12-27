import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const fetchUser = async ({ queryKey }) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${queryKey[1]}`
  );
  return await response.json();
};

// 데이터 목록 호출 custom hook
export const useUserQuery = (num) => {
  // useQuery 첫번째 인수로 넣는 값은 무조건 fetching함수로 전달됨
  // useQuery에는 query Key가 동일하면 같은 데이터라고 인지하기 때문에 refetching 처리하지않음
  return useQuery(["users", num], fetchUser, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    cacheTime: 1000 * 20, // inactive된 상태에서 얼마동안 데이터를 캐시에 유지시킬지에 대한 시간 정보, 해당 데이터를 컴포넌트에서 활용하지 않더라도 얼마동안 garbage collector에 의한 데이터 삭제를 막을지에 대한 시간값 설정(default 값 5분)
    staleTime: 1000 * 10, // 서버 데이터를 fetching한 순간부터 언제까지 최신 데이터로 인지시키면서 cacheTime을 소진시키지 않을지에 대한 시간값, 얼마동안 refetching을 하지 않을지에 대한 시간값 설정 (staleTime -> cacheTime) (default 값 0)
  });
};

// 기존 데이터 삭제하는 함수 (typicode 가이드 문서 참고)
const deleteUser = async (num) => {
  const reponse = await fetch(
    `https://jsonplaceholder.typicode.com/users/${num}`,
    {
      method: "DELETE",
    }
  );
  return await reponse.json();
};

const updateUser = async ([userName, num]) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${num}`,
    {
      method: "PATCH",
      body: JSON.stringify({
        name: userName,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  );
  const result = await response.json();
  console.log(result);
  return result;
};

// 인수로 순번을 받아서 해당 순번의 데이터를 삭제하는 custom hook
export const useDeleteQuery = () => {
  // 기존 App.js에서 생성한 queryClient 인스턴스를 호출하는 함수
  // 해당 queryClient 인스턴스에서 활용할수 있는 protype method인 setQueryData라는 서버데이터 변경 요청값을 등록하는 함수 가져올 수 있음
  const queryClient = useQueryClient();
  // useMutation(비동기 데이터 변경함수, 옵션설정 객체{onSuccess: mutate요청이 성공적으로 수행되면 연결될 핸들러함수})
  // useMutation 훅이 deleteUser라는 내부 fetching함수를 호출해서 서버데이터 변경 요청
  return useMutation(deleteUser, {
    // 서버 데이터 변경 성공시, 변경된 서버 데이터값을 다시 고유의 쿼리키로 등록해서 react-query로 비동기 데이터 관리
    onSuccess: (args) => {
      queryClient.setQueryData(["users", args.id], args);
    },
  });
};

// 데이터 변경 커스텀훅
export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation(updateUser, {
    onSuccess: (args) => {
      console.log(args);
      queryClient.setQueryData(["users", args.id], args);
    },
  });
};

/*
  fresh: 서버데이터를 최신으로 인식하는 상태 (refetch 필요없는 상태)
  stale: 서버데이터를 오래된 상태로 인식하는 상태 (refetch 필요한 상태)
  inactive: 서버데이터가 더이상 해당 컴포넌트에서 활용되지 않는 상태
  cacheTime: inactive상태에서 얼마까지 데이터를 유지시킬지에 대한 시간값 (default: 1000 * 60 * 5ms 5분)
  statleTime: 처음 dataFetching후 얼마뒤에 fresh -> stale로 변경할지에 대한 시간값 (default: 0ms)
*/
