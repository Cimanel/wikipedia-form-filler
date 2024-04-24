import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ChangeEvent, useEffect, useState } from "react";
import { useDataProvider } from "react-admin";
import {
  LOADING_STATUS,
  SEARCH_STATUS,
  useWikipediaContext,
} from "./WikipediaContext";

export const WikipediaList = () => {
  const { setStatus, title, setWikipediaContent, wikipediaList } =
    useWikipediaContext();
  const dataProvider = useDataProvider();
  const [value, setValue] = useState("");

  useEffect(() => {
    if (value === "" && wikipediaList?.length > 0) {
      setValue(wikipediaList[0].url);
    }
  }, [wikipediaList]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
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
            <Stack>
              <FormControl>
                <FormLabel id="demo-controlled-radio-buttons-group">
                  {" "}
                  Wikipedia articles matching the title &quot;{title}&quot;:
                </FormLabel>
                <RadioGroup
                  name="use-radio-group"
                  onChange={handleChange}
                  value={value}
                >
                  {wikipediaList.map(({ title, url }) => {
                    return (
                      <FormControlLabel
                        key={title}
                        label={title}
                        value={url}
                        control={<Radio />}
                      />
                    );
                  })}
                </RadioGroup>
              </FormControl>
            </Stack>
          </>
        )}
      </Box>
      <Box>
        <Button onClick={() => handleTitleClick(value)} disabled={value === ""}>
          Prefill with selected article
        </Button>
        <Button onClick={handleCancel}>Cancel</Button>
      </Box>
    </Box>
  );
};
