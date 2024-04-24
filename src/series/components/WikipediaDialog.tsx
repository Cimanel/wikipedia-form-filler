import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useState } from "react";
import { Button as RAButton, useDataProvider } from "react-admin";
import { useWatch } from "react-hook-form";

export const WikipediaDialog = ({ setWikipediaContent }) => {
  const [open, setOpen] = React.useState(false);
  const title = useWatch({ name: "title" });
  const dataProvider = useDataProvider();

  const [wikipediaList, setWikipediaList] = useState<any>(null);

  const handleClickOpen = async () => {
    if (title) {
      const { data } = await dataProvider.getWikipediaList({ search: title });
      if (data) {
        setWikipediaList(data);
      }
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTitleClick = async (url) => {
    const realTitle = url.split("/").pop();
    if (title) {
      const { data } = await dataProvider.getWikipediaContent({
        title: realTitle,
      });
      if (data) {
        setWikipediaContent(data);
      }
    }
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Search from Wikipedia
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-synopsis"
      >
        <DialogTitle id="alert-dialog-title">
          {"Select a source to fill the form:"}
        </DialogTitle>
        <DialogContent>
          {wikipediaList?.length === 0 && (
            <Typography>No results found</Typography>
          )}
          {wikipediaList?.length > 0 && (
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
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
