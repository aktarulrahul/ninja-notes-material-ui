import React from "react";
import {
  Button,
  Container,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  FormControl,
  FormHelperText,
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  field: {
    margin: "20px 0",
    display: "block",
  },
});

export default function Create() {
  const classes = useStyles();
  const history = useHistory();
  const [title, setTitle] = React.useState("");
  const [details, setDetails] = React.useState("");
  const [titleError, setTitleError] = React.useState("");
  const [detailsError, setDetailsError] = React.useState("");
  const [category, setCategory] = React.useState("todos");
  const handleSubmit = (e) => {
    e.preventDefault();
    setTitleError(false);
    setDetailsError(false);
    if (title == "") {
      setTitleError(true);
    }
    if (details == "") {
      setDetailsError(true);
    }
    if (title && details) {
      // console.log(title, details, category);
      fetch("http://localhost:8000/notes", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ title, details, category }),
      }).then(() => history.push("/"));
    }
  };
  return (
    <Container>
      <Typography
        variant="h6"
        component="h2"
        color="textSecondary"
        gutterBottom
      >
        Create a new Note
      </Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          onChange={(e) => setTitle(e.target.value)}
          className={classes.field}
          color="secondary"
          error={titleError}
          fullWidth
          label="Note Name"
          required
          variant="outlined"
        />
        <TextField
          onChange={(e) => setDetails(e.target.value)}
          className={classes.field}
          color="secondary"
          error={detailsError}
          fullWidth
          label="Note Details"
          multiline
          rows={4}
          required
          variant="outlined"
        />
        <FormControl className={classes.field}>
          <FormLabel>Note Category</FormLabel>
          <RadioGroup
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <FormControlLabel value="money" control={<Radio />} label="Money" />
            <FormControlLabel value="todos" control={<Radio />} label="Todos" />
            <FormControlLabel
              value="reminders"
              control={<Radio />}
              label="Reminder"
            />
            <FormControlLabel value="work" control={<Radio />} label="Work" />
          </RadioGroup>
        </FormControl>
        <Button
          variant="contained"
          color="secondary"
          type="submit"
          startIcon={<AddCircleIcon />}
        >
          Add Note
        </Button>
      </form>
    </Container>
  );
}
