import { useState, useEffect } from "react";

const useFetchById = (url) => {
  const [data, setData] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    console.log("Hey2!");
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
          setData(data);
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

export default useFetchById;