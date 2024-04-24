import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { useWikipediaContext } from "./WikipediaContext";

export const WikipediaLoading = () => {
  const { wikiTitle } = useWikipediaContext();
  const loadingText = wikiTitle
    ? ` Fetching Wikipedia article "${wikiTitle}"`
    : "Fetching Wikipedia article list";

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Typography>{loadingText}</Typography>
      <CircularProgress sx={{ margin: "1em" }} size="60px" />
    </Box>
  );
};
