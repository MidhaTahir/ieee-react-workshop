import { AxiosError } from "axios";
import { EnqueueSnackbar } from "notistack";

const handleError = (error: AxiosError, enqueueSnackbar: EnqueueSnackbar) => {
  const { detail } =
    (error.response?.data as { detail?: string | string[] }) || {};

  if (Array.isArray(detail)) {
    detail.forEach((errMsg) =>
      enqueueSnackbar(errMsg || "Some error occurred!", {
        variant: "error",
      }),
    );
  } else {
    enqueueSnackbar(detail || "Some error occurred!", {
      variant: "error",
    });
  }
};

export default handleError;
