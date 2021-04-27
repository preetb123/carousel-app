import React, { useState, useEffect } from 'react';
/* eslint-disable-next-line */

interface State<T> {
  result?: T;
  error?: string;
}

export const useFetch = <T,>(url: string): State<T> => {
  const [result, setResult] = React.useState<T | null>(null);
  const [error, setError] = React.useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url);
        const json = await res.json();
        setResult(json);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []);

  return { result, error };
};
