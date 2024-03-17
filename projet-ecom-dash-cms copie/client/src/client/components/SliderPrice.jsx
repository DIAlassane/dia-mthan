import { makeStyles } from "@material-ui/core/styles";
import { Box, Slider } from "@mui/material";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  thumb: {
    color: "#000",
  },
  rail: {
    color: `rgba(0, 0, 0, 0.26)`,
  },
  track: {
    color: "#000",
  },
});

const SliderPrice = ({ value, changePrice }) => {
  const classes = useStyles();

  return (
    <Box>
      <Slider
        value={value}
        onChange={changePrice}
        valueLabelDisplay="on"
        min={25000}
        max={300000}
        classes={{
          thumb: classes.thumb,
          rail: classes.rail,
          track: classes.track,
        }}
      />
    </Box>
  );
};

export default SliderPrice;
