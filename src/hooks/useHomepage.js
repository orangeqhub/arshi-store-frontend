"use client";

import { useEffect, useState } from "react";
import { getHomepageData } from "@/services/cms.service";

export default function useHomepage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHomepage = async () => {
      try {
        setLoading(true);
        const response = await getHomepageData();
        setData(response?.data || null);
      } catch (err) {
        setError(err?.message || "Failed to load homepage");
      } finally {
        setLoading(false);
      }
    };

    fetchHomepage();
  }, []);

  return { data, loading, error };
}
