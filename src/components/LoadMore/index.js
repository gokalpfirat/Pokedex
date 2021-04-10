import "./style.css";

const LoadMore = ({ loadedCount, totalCount, loadMore, isLoading }) => {
  return (
    <div className="load_more">
      {totalCount !== loadedCount ? (
        <div>
          Can't find your result from{" "}
          <strong>
            {loadedCount}/{totalCount}
          </strong>
          loaded pokemons?
          <button
            className="load_more__button"
            onClick={loadMore}
            disabled={isLoading}
          >
            Load More
          </button>
        </div>
      ) : (
        <div>
          <strong>No more to load, these are all results!</strong>
        </div>
      )}
    </div>
  );
};
export default LoadMore;
