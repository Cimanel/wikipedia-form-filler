import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Button as RAButton, useDataProvider } from "react-admin";
import {
  LOADING_STATUS,
  SEARCH_STATUS,
  useWikipediaContext,
} from "./WikipediaContext";

export const WikipediaList = () => {
  const { setStatus, title, setWikipediaContent, wikipediaList } =
    useWikipediaContext();
  const dataProvider = useDataProvider();

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
  );
};
