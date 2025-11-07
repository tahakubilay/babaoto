import { useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/api';
import { AxiosError, AxiosResponse } from 'axios';

interface UseApiOptions {
  immediate?: boolean;
}

interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export function useApi<T>(
  endpoint: string | null,
  options: UseApiOptions = { immediate: true }
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!endpoint) {
      setData(null);
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const response = await api.get<T | PaginatedResponse<T>>(endpoint);
      if (response && (response as PaginatedResponse<T>).results) {
        setData((response as PaginatedResponse<T>).results as T);
      } else if (Array.isArray(response)) {
        setData(response as T);
      } else if (response) {
        setData([response] as unknown as T);
      } else {
        setData([] as unknown as T);
      }
    } catch (err) {
      const error = err as AxiosError;
      setError(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    if (options.immediate) {
      fetchData();
    }
  }, [fetchData, options.immediate]);

  const refetch = () => fetchData();

  return { data, loading, error, refetch };
}