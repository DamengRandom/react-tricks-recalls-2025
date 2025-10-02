import { useState, useEffect } from 'react';
import { DogProps } from './types';

const URL = "http://localhost:3001/dogs";

export const useDogsFetch = () => {
  const [dogs, setDogs] = useState<DogProps[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchDogsAndSetState = async () => {
      try {
        setLoading(true);

        const res = await fetch(URL, { signal: abortController.signal });

        if (!res.ok) throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
        
        const theDogs = await res.json();
        
        setDogs(theDogs);
      } catch (error) {
        if ((error as Error)?.name === "AbortError") return;
 
        setError(error);

        throw new Error(error instanceof Error ? error.message : "Error on fetching dogs ..");
      } finally {
        if (!abortController.signal.aborted) setLoading(false);
      }
    }

    fetchDogsAndSetState();

    return () => abortController.abort();
    
  }, []);

  return { dogs, isLoading, error };
}

// import { useEffect, useState } from "react";
// import { DogProps } from "./types";

// const URL = "http://localhost:3001/dogs";

// export const useDogsFetch = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [dogs, setDogs] = useState<DogProps[]>([]);

//   useEffect(() => {
//     const controller = new AbortController();

//     const run = async () => {
//       try {
//         setIsLoading(true);
//         setError(null);

//         const res = await fetch(URL, { signal: controller.signal });
//         if (!res.ok) {
//           throw new Error(`Request failed: ${res.status} ${res.statusText}`);
//         }

//         const data: DogProps[] = await res.json();
//         setDogs(data);
//       } catch (e) {
//         if ((e as unknown as Error).name === "AbortError") return;
//         setError(e instanceof Error ? e.message : "Failed to fetch dogs");
//       } finally {
//         // Only update if still mounted
//         if (!controller.signal.aborted) setIsLoading(false);
//       }
//     };

//     run();
//     return () => controller.abort();
//   }, []);

//   return { dogs, isLoading, error };
// };