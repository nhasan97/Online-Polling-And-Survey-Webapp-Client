import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  showAlertOnError,
  showAlertOnSuccess,
} from "../utilities/displaySweetAlert";

const usePerformMutation = (key, fn, msg) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: [key],
    mutationFn: fn,
    onSuccess: () => {
      showAlertOnSuccess(msg);

      queryClient.invalidateQueries(key);
    },
    onError: (error) => {
      showAlertOnError(error);
    },
  });
  return mutation;
};

export default usePerformMutation;
