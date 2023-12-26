import { useQuery } from "@tanstack/react-query";

const fetchUser = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
  return await response.json();
};

export const useUserQuery = () => {
  return useQuery(["users"], fetchUser, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    cacheTime: 1000 * 5,
  });
};
