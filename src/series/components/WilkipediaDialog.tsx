import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import * as React from "react";
import { useState } from "react";
import { Button as RAButton, useDataProvider } from "react-admin";
import { useWatch } from "react-hook-form";

export const WilkipediaDialog = ({ setWilkipediaContent }) => {
  const [open, setOpen] = React.useState(false);
  const title = useWatch({ name: "title" });
  const dataProvider = useDataProvider();

  const [wilkipediaList, setWilkipediaList] = useState<any>(null);

  const handleClickOpen = async () => {
    if (title) {
      const { data } = await dataProvider.getWilkipediaList({ search: title });
      if (data) {
        setWilkipediaList(data);
      }
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTitleClick = async (url) => {
    console.log("url", url);
    const realTitle = url.split("/").pop();
    console.log(realTitle);
    if (title) {
      const { data } = await dataProvider.getWilkipediaContent({
        title: realTitle,
      });
      if (data) {
        setWilkipediaContent([...data]);
      }
    }
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Search from Wilkipedia
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Select a source to fill the form:"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {wilkipediaList?.length === 0 && <p>No results found</p>}
            {wilkipediaList?.length > 0 && (
              <Stack>
                {wilkipediaList.map(({ title, url }) => {
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
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
