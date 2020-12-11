import React from "react";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import { IconButton } from "@material-ui/core";
const Step4 = (props) => {
  return (
    <div>
      {/* <div className="Upload-Videos">
        <input
          type="file"
          accept="video/*"
          id="upload-video"
          style={{ display: "none" }}
          multiple="multiple"
        />
        <h1 className="ADD-Media-Title">Ajouter des videos:</h1>
        <label htmlFor="upload-video">
          <IconButton aria-label="upload picture" component="span">
            <VideoLibraryIcon style={{ fontSize: "2vw" }} />
          </IconButton>
        </label>
      </div> */}

      <div className="Upload-IMAGES">
        <input
          type="file"
          accept="image/*"
          multiple="multiple"
          id="upload-Image"
          style={{ display: "none" }}
          onChange={(e) => {
            props.setOtherImages(e.target.files);
          }}
        />
        <h1 className="ADD-Media-Title">Ajouter des photos:</h1>
        <label htmlFor="upload-Image">
          <IconButton aria-label="upload picture" component="span">
            <AddPhotoAlternateIcon style={{ fontSize: "2vw" }} />
          </IconButton>
        </label>
      </div>

      <div>
        <h1 className="ADD-Media-Title">Ajouter une description du service:</h1>
        <textarea
          name="Service-Description"
          id="Service-Description"
          cols="30"
          rows="10"
          onChange={(e) => props.setServiceDescription(e.target.value)}
        ></textarea>
      </div>
    </div>
  );
};

export default Step4;
