import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {
  LIST_STATUS,
  LOADING_STATUS,
  useWikipediaContext,
} from "./WikipediaContext";
import { useDataProvider } from "react-admin";

export const WikipediaSearch = () => {
  const { setStatus, title, setWikipediaList } = useWikipediaContext();
  const dataProvider = useDataProvider();

  const handleClickSearchTitle = async () => {
    setStatus(LOADING_STATUS);
    if (title) {
      const { data } = await dataProvider.getWikipediaList({ search: title });
      if (data) {
        setWikipediaList(data);
      }
    }
    setStatus(LIST_STATUS);
  };
  return (
    <Box display="flex" justifyContent="center">
      <Button variant="outlined" onClick={handleClickSearchTitle}>
        Search from Wikipedia
      </Button>
    </Box>
  );
};
