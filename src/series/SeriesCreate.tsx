import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import { useEffect, useState } from "react";
import {
  Create,
  NumberInput,
  SimpleForm,
  TextInput,
  useDataProvider,
} from "react-admin";
import { useFormContext, useWatch } from "react-hook-form";
import logo from "../assets/wiki-ai-white.png";
import { WikipediaAside } from "./components/WikipediaAside";
import {
  CONTENT_STATUS,
  DISCARD_STATUS,
  LIST_STATUS,
  WikipediaContext,
  useWikipediaContext,
} from "./components/WikipediaContext";

export const SeriesCreate = () => {
  return (
    <WikipediaContext>
      <Create aside={<WikipediaAside />}>
        <SimpleForm sx={{ maxHeight: "85vh", overflowY: "scroll" }}>
          <SeriesForm />
        </SimpleForm>
      </Create>
    </WikipediaContext>
  );
};

const SeriesForm = () => {
  const dataProvider = useDataProvider();
  const [disabledWikipediaIcon, setDisabledWikipediaIcon] = useState(true);
  const [openAiValues, setOpenAiValues] = useState<Record<string, string[]>>({
    title: ["totoA", "totoB", "totoC"],
    synopsis: ["synopsisA", "synopsisB", "synopsisC"],
  });

  const {
    backup,
    wikipediaContent,
    setWikipediaContent,
    setBackup,
    setStatus,
    setTitle,
    status,
  } = useWikipediaContext();
  const { setValue, getValues } = useFormContext();

  useEffect(() => {
    if (wikipediaContent) {
      const fetchData = async () => {
        const formValues = getValues();
        const keys = Object.keys(formValues);
        const { data } = await dataProvider.getOpenAIValuesFromContent(
          wikipediaContent,
          keys
        );
        setOpenAiValues(data);
        setBackup(formValues);
        for (const key in data) {
          setValue(key, data[key]);
        }
        setDisabledWikipediaIcon(false);
        setStatus(CONTENT_STATUS);
      };
      fetchData();
    }
  }, [wikipediaContent]);

  useEffect(() => {
    if (status === DISCARD_STATUS) {
      const resetData = async () => {
        const keys = Object.keys(backup);
        for (const key of keys) {
          setValue(key, backup[key]);
        }
        setBackup({});
        setWikipediaContent("");
        setStatus(LIST_STATUS);
      };
      resetData();
    }
  }, [status]);

  return (
    <>
      <InputWithWikipediaIcon
        disabled={disabledWikipediaIcon}
        openAiValues={openAiValues}
      >
        <TextInput
          source="title"
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
      </InputWithWikipediaIcon>
      <InputWithWikipediaIcon
        disabled={disabledWikipediaIcon}
        openAiValues={openAiValues}
      >
        <TextInput source="synopsis" multiline fullWidth rows={12} />
      </InputWithWikipediaIcon>
      <TextInput source="type" />
      <TextInput source="genre" />
      <TextInput source="creator" />
      <TextInput source="director" />
      <NumberInput source="nbSeasons" />
    </>
  );
};

const InputWithWikipediaIcon = ({
  children,
  disabled,
  openAiValues,
}: InputWithWikipediaIconProps) => {
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const sourceName: string = children.props.source;
  const uppercaseSourceName = sourceName[0].toUpperCase() + sourceName.slice(1);

  const { setValue } = useFormContext();
  const value = useWatch({ name: sourceName });
  console.log("value", value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(sourceName, (event.target as HTMLInputElement).value);
    setIsSuggestionsOpen(false);
  };

  return (
    <Grid container spacing={1} xs={12}>
      <Grid item xs={5}>
        {children}
      </Grid>
      <Grid item xs={1}>
        <IconButton
          aria-label="Suggestions from Wikipedia"
          sx={{ padding: 0 }}
          // disabled={disabled}
          onClick={() => setIsSuggestionsOpen(!isSuggestionsOpen)}
        >
          <Box
            component="img"
            sx={{
              width: 40,
              height: 40,
              backgroundColor: disabled ? "grey" : "secondary.main",
              borderRadius: "4px",
              padding: "4px",
            }}
            src={logo}
          />
        </IconButton>
      </Grid>
      {isSuggestionsOpen && (
        <Grid item xs={6}>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              OTHER SUGGESTIONS
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
              value={value}
              onChange={handleChange}
            >
              {openAiValues[sourceName]?.map((value) => (
                <FormControlLabel
                  sx={{ maxWidth: 500 }}
                  key={value}
                  value={value}
                  control={<Radio />}
                  label={value}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Grid>
      )}
    </Grid>
  );
};

type InputWithWikipediaIconProps = {
  children: JSX.Element;
  disabled: boolean;
  openAiValues: Record<string, string[]>;
};
