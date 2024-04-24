import {
  LIST_STATUS,
  LOADING_STATUS,
  SEARCH_STATUS,
  useWikipediaContext,
} from "./WikipediaContext";
import { WikipediaList } from "./WikipediaList";
import { WikipediaLoading } from "./WikipediaLoading";
import { WikipediaSearch } from "./WikipediaSearch";

export const WikipediaAside = () => {
  const { status } = useWikipediaContext();

  return (
    <>
      {status === SEARCH_STATUS && <WikipediaSearch />}
      {status === LOADING_STATUS && <WikipediaLoading />}
      {status === LIST_STATUS && <WikipediaList />}
    </>
  );
};
