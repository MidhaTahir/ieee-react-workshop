import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";


import { useSnackbar } from "notistack";

export function GuardedRoute({
  isRouteAccessible = false,
  redirectRoute = "/",
  component,
  showError = false,
}) {
  const { enqueueSnackbar } = useSnackbar();
  if (isRouteAccessible) return component;

  if (showError)
    enqueueSnackbar({
      message: "You don't have the permission to access this page!",
      variant: "error",
      preventDuplicate: true,
      autoHideDuration: 1000,
    });
  return <Navigate to={redirectRoute} replace />;
}

export default GuardedRoute;

GuardedRoute.propTypes={
  isRouteAccessible: PropTypes.bool,
  redirectRoute: PropTypes.string,
  component:PropTypes.any,
  showError:PropTypes.bool
}
