import React, { useState } from "react";
import keralaCities from "../../const/cities";
import Button from "@mui/material/Button";
//import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function LocationPicker() {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    const { value } = event.target;
    setInputValue(value);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="form-group">
      <div className="input-group">
        <i
          style={{ fontSize: "30px", paddingRight: "34px", margin: "3px" }}
          className="bi bi-geo-alt"
        ></i>
        <input
          type="text"
    
          className="form-control"
          placeholder="Pick your location"
          onClick={handleClickOpen}
         
          value={inputValue}
        />
      </div>
      <datalist id="cities">
        {keralaCities
          .filter((city) =>
            city.toLowerCase().includes(inputValue.toLowerCase())
          )
          .slice(0, 5) // Display only the top 5 results
          .map((city, index) => (
            <option key={index} value={city} />
          ))}
      </datalist>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: () => {},
        }}
      >
        <DialogTitle>Pick Your Location</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Pick your current location to get movies near you. You can choose
            from the list or type the name of your city.
          </DialogContentText>
          <div style={{ display: 'flex', alignItems: 'center' }}>
  <img src="assets/locations/mumbai.png" alt="Mumbai" style={{ width: '100px', margin: '5px' }} />
  <img src="assets/locations/delhi.png" alt="Delhi" style={{ width: '100px', margin: '5px' }} />
  <img src="assets/locations/Chennai.png" alt="Chennai" style={{ width: '100px', margin: '5px' }} />
  <img src="assets/locations/banglore.png" alt="Bangalore" style={{ width: '100px', margin: '5px' }} />
  <img src="assets/locations/Kochi.png" alt="Kochi" style={{ width: '100px', margin: '5px' }} />
  
</div>
          <input
            type="text"
            list="cities"
            className="form-control"
            placeholder="Pick your location"
            onChange={handleInputChange}
            value={inputValue}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Pick</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default LocationPicker;
