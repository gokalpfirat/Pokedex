export const LoadingCircle = ({ loadingState = true }) =>
  loadingState ? (
    <img
      src="https://i.stack.imgur.com/kOnzy.gif"
      alt="Loading"
      width="100"
      height="100"
    />
  ) : (
    ""
  );
export default LoadingCircle;
