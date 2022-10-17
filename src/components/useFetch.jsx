import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    setLoadingMessage(true);
    setErrorMessage(false);
    setData(false);
      fetch(url)
        .then((res) => {
          if (!res.ok) {
            throw Error("Could not fetch the data");
          }
          return res.json();
        })
        .then((data) => {
          const allData = [];
          for (const key in data) {
            const instance = {
              id: key,
              ...data[key],
            };
            allData.push(instance);
          }

          setData(allData);
          setLoadingMessage(false);
          setErrorMessage(null);
        })
        .catch((err) => {
          setErrorMessage(err.message);
          setLoadingMessage(false);
        });

  }, [url]);
  return { data, loadingMessage, errorMessage };
};

export default useFetch;