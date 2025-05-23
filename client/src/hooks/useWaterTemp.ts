import { useState, useEffect } from "react";

export interface WaterTempData {
  timestamp: string;
  temperature: number;
}

export function useWaterTemp(apiUrl: string) {
  const [data, setData] = useState<WaterTempData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${apiUrl}/temperature`)
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then((json: WaterTempData) => setData(json))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [apiUrl]);
  return { data, loading, error };
}
