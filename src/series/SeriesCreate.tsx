import { useEffect, useState } from "react";
import {
  Create,
  NumberInput,
  SimpleForm,
  TextInput,
  useDataProvider,
} from "react-admin";
import { useFormContext } from "react-hook-form";
import { WikipediaAside } from "./components/WikipediaAside";
import {
  CONTENT_STATUS,
  DISCARD_STATUS,
  LIST_STATUS,
  WikipediaContext,
  useWikipediaContext,
} from "./components/WikipediaContext";
import { WikipediaIconInput } from "./components/WikipediaIconInput";

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
      <WikipediaIconInput
        disabled={disabledWikipediaIcon}
        openAiValues={openAiValues}
      >
        <TextInput
          source="title"
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
      </WikipediaIconInput>
      <WikipediaIconInput
        disabled={disabledWikipediaIcon}
        openAiValues={openAiValues}
      >
        <TextInput source="synopsis" multiline fullWidth rows={12} />
      </WikipediaIconInput>
      <WikipediaIconInput
        disabled={disabledWikipediaIcon}
        openAiValues={openAiValues}
      >
        <TextInput source="type" fullWidth />
      </WikipediaIconInput>
      <WikipediaIconInput
        disabled={disabledWikipediaIcon}
        openAiValues={openAiValues}
      >
        <TextInput source="genre" fullWidth />
      </WikipediaIconInput>
      <WikipediaIconInput
        disabled={disabledWikipediaIcon}
        openAiValues={openAiValues}
      >
        <TextInput source="creator" fullWidth />
      </WikipediaIconInput>
      <WikipediaIconInput
        disabled={disabledWikipediaIcon}
        openAiValues={openAiValues}
      >
        <TextInput source="director" fullWidth />
      </WikipediaIconInput>
      <WikipediaIconInput
        disabled={disabledWikipediaIcon}
        openAiValues={openAiValues}
      >
        <NumberInput source="nbSeasons" fullWidth />
      </WikipediaIconInput>
    </>
  );
};
