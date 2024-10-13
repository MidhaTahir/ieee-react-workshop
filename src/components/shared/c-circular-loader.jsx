import PropTypes from "prop-types";

import { CircularProgress } from "@mui/material";

export default function CircularLoader(props) {
  const { size, color, style } = props;

  return (
    <CircularProgress
      style={{
        width: size,
        height: size,
        color,
        ...style,
      }}
    />
  );
}

CircularLoader.defaultProps = {
  size: 24,
  color: "#3C3C3C",
  style: {},
};

CircularLoader.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
};
