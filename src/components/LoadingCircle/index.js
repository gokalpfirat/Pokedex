export const LoadingCircle = ({
  loadingState = true,
  width = 100,
  height = 100
}) =>
  loadingState ? (
    <img
      src="https://i.stack.imgur.com/kOnzy.gif"
      alt="Loading"
      width={width}
      height={height}
    />
  ) : (
    ""
  );
export default LoadingCircle;
