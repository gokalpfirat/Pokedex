import "./style.css";

const LoadMore = ({ loadedCount, totalCount, loadMore, isLoading }) => {
  return (
    <div className="load_more">
      Can't find your result from{" "}
      <strong>
        {loadedCount}/{totalCount}
      </strong>{" "}
      loaded pokemons?
      <button
        className="load_more__button"
        onClick={loadMore}
        disabled={isLoading}
      >
        Load More
      </button>
    </div>
  );
};
export default LoadMore;
