"use client";

import { useEffect, useState } from "react";

export default function useCmsSiteContent(fetcher) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetcher();
        if (active) setData(response?.data || null);
      } catch (err) {
        if (active) setError(err?.message || "Failed to load");
      } finally {
        if (active) setLoading(false);
      }
    };
    fetchData();
    return () => { active = false; };
  }, [fetcher]);

  return { data, loading, error };
}
