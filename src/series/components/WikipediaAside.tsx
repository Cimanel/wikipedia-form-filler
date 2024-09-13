import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";

import logo from "../../assets/wiki-ai-white.png";
import { WikipediaContent } from "./WikipediaContent";
import {
  CONTENT_STATUS,
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
    <Card sx={{ width: 400, marginLeft: 2, maxHeight: "95vh" }}>
      <CardHeader
        avatar={
          <Box component="img" sx={{ width: 50, height: 50 }} src={logo} />
        }
        title="Wikipedia AI"
        subheader="Fill form automatically"
        sx={{ backgroundColor: "secondary.main" }}
      />
      <CardContent>
        {status === SEARCH_STATUS && <WikipediaSearch />}
        {status === LOADING_STATUS && <WikipediaLoading />}
        {status === LIST_STATUS && <WikipediaList />}
        {status === CONTENT_STATUS && <WikipediaContent />}
      </CardContent>
    </Card>
  );
};
