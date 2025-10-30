import { useLoadingContext } from '../context/LoadingContext';

export const useLoading = () => {
  const { loading, setLoading } = useLoadingContext();
  return { loading, setLoading };
};
