import { queryOptions, useQueries, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { PostProps, TodoProps } from "../types/common";

const FETCH_EG_KEY = "UNIQUE_KEY_FOR_FETCH_EG";
const FETCH_TODO_EG_KEY = "UNIQUE_KEY_FOR_FETCH_TODO_EG";

const fetchJsonData = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  const json = await response.json();
  // can also set the state, eg: zustand state management action function
  return json;
};

// queryOptions is a function that returns a queryOptions object
const fetchEgQueryOptions = () => queryOptions({
  queryKey: [FETCH_EG_KEY],
  queryFn: () => fetchJsonData<PostProps[]>("https://jsonplaceholder.typicode.com/posts"),
});

const fetchTodoEgQueryOptions = () => queryOptions({
  queryKey: [FETCH_TODO_EG_KEY],
  queryFn: () => fetchJsonData<TodoProps[]>("https://jsonplaceholder.typicode.com/todos"),
});

const fetchSingleEgQueryOptions = (id: number) => queryOptions({
  queryKey: [FETCH_EG_KEY, id],
  queryFn: () => fetchJsonData<PostProps>(`https://jsonplaceholder.typicode.com/posts/${id}`),
  enabled: !!id,
});

// export const useFetchEg = () => useQuery(fetchEgQueryOptions());
export const useFetchEg = () => useSuspenseQuery(fetchEgQueryOptions()); // useSuspenseQuery is a query function which ensure data always defined

export const useFetchSingleEg = (id: number) => useQuery(fetchSingleEgQueryOptions(id));

export const useMultipleFetchEg = () => useQueries({ queries:[fetchEgQueryOptions(), fetchTodoEgQueryOptions()] }); // useQueries is a query function which normally return all data together in parallel
