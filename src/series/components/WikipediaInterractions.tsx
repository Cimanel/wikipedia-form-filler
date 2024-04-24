import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Button as RAButton, useDataProvider } from "react-admin";
import {
  LIST_STATUS,
  SEARCH_STATUS,
  LOADING_STATUS,
  useWikipediaContext,
} from "./WikipediaContext";

export const WikipediaInterractions = () => {
  const {
    status,
    setStatus,
    title,
    setWikipediaContent,
    wikipediaList,
    setWikipediaList,
  } = useWikipediaContext();
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

  const handleCancel = () => {
    setStatus(SEARCH_STATUS);
  };

  const handleTitleClick = async (url: string) => {
    setStatus(LOADING_STATUS);
    const realTitle = url.split("/").pop();
    if (title) {
      const { data } = await dataProvider.getWikipediaContent({
        title: realTitle,
      });
      if (data) {
        setWikipediaContent(data);
      }
    }
  };

  return (
    <>
      {status === SEARCH_STATUS && (
        <Button variant="outlined" onClick={handleClickSearchTitle}>
          Search from Wikipedia
        </Button>
      )}
      {status === LOADING_STATUS && <Typography>Loading...</Typography>}
      {status === LIST_STATUS && (
        <Box
          aria-labelledby="alert-wikipedia-title"
          aria-describedby="alert-wikipedia-synopsis"
        >
          <Box>
            {wikipediaList?.length === 0 && (
              <Typography>No results found</Typography>
            )}
            {wikipediaList?.length > 0 && (
              <>
                <Box id="alert-dialog-title">
                  {"Select a source to fill the form:"}
                </Box>
                <Stack>
                  {wikipediaList.map(({ title, url }) => {
                    return (
                      <RAButton
                        key={title}
                        label={title}
                        onClick={() => handleTitleClick(url)}
                      />
                    );
                  })}
                </Stack>
              </>
            )}
          </Box>
          <Box>
            <Button onClick={handleCancel}>Cancel</Button>
          </Box>
        </Box>
      )}
    </>
  );
};
