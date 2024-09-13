import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useDataProvider } from "react-admin";

import logo from "../../assets/wiki-ai-white.png";
import { useWikipediaContext } from "./WikipediaContext";

export const WikipediaIconInput = ({ children }: WikipediaIconInputProps) => {
  const dataProvider = useDataProvider();
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const { wikipediaContent } = useWikipediaContext();
  const sourceName: string = children.props.source;

  const { setValue } = useFormContext();
  const value = useWatch({ name: sourceName });

  const handleChange = (value: string) => {
    setValue(sourceName, value);
    setIsSuggestionsOpen(false);
  };

  useEffect(() => {
    setIsDisabled(!wikipediaContent);
  }, [wikipediaContent]);

  const handleWikipediaItemSearch = async () => {
    if (!isSuggestionsOpen) {
      if (wikipediaContent) {
        const fetchData = async () => {
          const data = await dataProvider.getOpenAISuggestionsFromContent(
            wikipediaContent,
            sourceName
          );
          console.log("handleWikipediaItemSearch", data);
          setSuggestions(data);
        };
        fetchData();
      }
    }

    setIsSuggestionsOpen(!isSuggestionsOpen);
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={5}>
        {children}
      </Grid>
      <Grid
        item
        xs={6}
        sx={{
          ml: 1,
          mt: 1,
          mb: 1,
          padding: "0 !important",
          borderRadius: 2,
          border: isSuggestionsOpen ? "1px solid lightgrey" : "unset",
        }}
      >
        <Grid container>
          <IconButton
            aria-label="Suggestions from Wikipedia"
            sx={{ padding: 0, alignItems: "start", height: "40px" }}
            disabled={isDisabled}
            onClick={handleWikipediaItemSearch}
          >
            <Box
              component="img"
              sx={{
                width: 40,
                height: 40,
                backgroundColor: isDisabled ? "grey" : "secondary.main",
                borderRadius: "4px",
                padding: "4px",
              }}
              src={logo}
            />
          </IconButton>
          {isSuggestionsOpen && (
            <Grid item xs={11}>
              <Typography sx={{ lineHeight: "40px", pl: 2, width: "100%" }}>
                OTHER SUGGESTIONS
              </Typography>
            </Grid>
          )}
        </Grid>
        {isSuggestionsOpen && (
          <>
            <Grid container sx={{ pl: 2 }}>
              {suggestions.map((value, index) => (
                <Grid key={index} item xs={12}>
                  <Button
                    variant="outlined"
                    onClick={() => handleChange(value)}
                    sx={{ maxWidth: 600, margin: 1 }}
                  >
                    {value}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Grid>
    </Grid>
  );
};

type WikipediaIconInputProps = {
  children: JSX.Element;
};
