import { useEffect } from 'react'

const useLocalStorage = ({data, label}) => {
  useEffect(() => {
    localStorage.setItem(label, JSON.stringify(data));
  }, [data]);
}

export default useLocalStorage