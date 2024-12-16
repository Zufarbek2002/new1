/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

const DataApiContext = createContext();
const url = "https://mocki.io/v1/814504fc-4ccd-4272-b130-18751627657e";

const DataApiProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const fetchedData = await res.json();
      setData(fetchedData.data);
      setSearch(fetchedData.data);
      setError(null);
    } catch (error) {
      console.error(error);
      setError("Ma'lumotlarni yuklashda xatolik yuz berdi");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DataApiContext.Provider value={{ data, isLoading, error, search, setSearch, setData }}>
      {children}
    </DataApiContext.Provider>
  );
};

export { DataApiProvider, DataApiContext };
