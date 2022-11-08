import React, { useState, ChangeEventHandler } from "react";
import jsPDF from "jspdf";
import "./img2pdf.css";

// New class with additional fields for Image
class CustomImage extends Image {
  constructor(mimeType) {
    super();
  }

  // `imageType` is a required input for generating a PDF for an image.
  get imageType() {
    return this.mimeType.split("/")[1];
  }
}

// Each image is loaded and an object URL is created.
const fileToImageURL = async (file) => {
  return new Promise((resolve, reject) => {
    const image = new CustomImage(file.type);

    image.onload = () => {
      resolve(image);
    };

    image.onerror = () => {
      reject(new Error("Failed to convert File to Image"));
    };

    image.src = URL.createObjectURL(file);
  });
};

// The dimensions are in millimeters.
const A4_PAPER_DIMENSIONS = {
  width: 210,
  height: 297,
};

const A4_PAPER_RATIO = A4_PAPER_DIMENSIONS.width / A4_PAPER_DIMENSIONS.height;

const dimensions = {
  width: 0,
  height: 0,
};

// Calculates the best possible position of an image on the A4 paper format,
// so that the maximal area of A4 is used and the image ratio is preserved.
const imageDimensionsOnA4 = (dimensions) => {
  const isLandscapeImage = dimensions.width >= dimensions.height;

  // If the image is in landscape, the full width of A4 is used.
  if (isLandscapeImage) {
    return {
      width: A4_PAPER_DIMENSIONS.width,
      height:
        A4_PAPER_DIMENSIONS.width / (dimensions.width / dimensions.height),
    };
  }

  // If the image is in portrait and the full height of A4 would skew
  // the image ratio, we scale the image dimensions.
  const imageRatio = dimensions.width / dimensions.height;
  if (imageRatio > A4_PAPER_RATIO) {
    const imageScaleFactor =
      (A4_PAPER_RATIO * dimensions.height) / dimensions.width;

    const scaledImageHeight = A4_PAPER_DIMENSIONS.height * imageScaleFactor;

    return {
      height: scaledImageHeight,
      width: scaledImageHeight * imageRatio,
    };
  }

  // The full height of A4 can be used without skewing the image ratio.
  return {
    width: A4_PAPER_DIMENSIONS.height / (dimensions.height / dimensions.width),
    height: A4_PAPER_DIMENSIONS.height,
  };
};

// Creates a PDF document containing all the uploaded images.
const generatePdfFromImages = (images) => {
  // Default export is A4 paper, portrait, using millimeters for units.
  const doc = new jsPDF();

  // We let the images add all pages,
  // therefore the first default page can be removed.
  doc.deletePage(1);

  images.forEach((image) => {
    const imageDimensions = imageDimensionsOnA4({
      width: image.width,
      height: image.height,
    });

    doc.addPage();
    doc.addImage(
      image.src,
      // Images are vertically and horizontally centered on the page.
      (A4_PAPER_DIMENSIONS.width - imageDimensions.width) / 2,
      (A4_PAPER_DIMENSIONS.height - imageDimensions.height) / 2,
      imageDimensions.width,
      imageDimensions.height
    );
  });

  // Creates a PDF and opens it in a new browser tab.
  const pdfURL = doc.output("bloburl");
  window.open(pdfURL, "_blank");
};

const Img2Pdf = () => {
  // State for uploaded images
  const [uploadedImages, setUploadedImages] = useState([]);
  let fileList = [];
  const handleImageUpload = React.useCallback(
    (event) => {
      console.log(event.target.files);
      fileList = [...fileList, ...event.target.files];
      const fileArray = fileList ? Array.from(fileList) : [];

      const fileToImagePromises = fileArray.map(fileToImageURL);
      Promise.all(fileToImagePromises).then(setUploadedImages);
    },
    [setUploadedImages]
  );

  const cleanUpUploadedImages = React.useCallback(() => {
    setUploadedImages([]);
    uploadedImages.forEach((image) => {
      URL.revokeObjectURL(image.src);
    });
  }, [setUploadedImages, uploadedImages]);

  const handleGeneratePdfFromImages = React.useCallback(() => {
    generatePdfFromImages(uploadedImages);
    cleanUpUploadedImages();
  }, [uploadedImages, cleanUpUploadedImages]);

  return (
    <div>
      <div className="h-20"></div>
      <div className="h1-text">Convert images to pdf</div>
      <div className="images-container">
        {uploadedImages.length > 0 ? (
          uploadedImages.map((img) => (
            <img
              key={img.src}
              src={img.src}
              alt={"Image of " + img.name}
              className="uploaded-image"
            />
          ))
        ) : (
          <p>Upload some images...</p>
        )}
      </div>
      <div className="buttons-container">
        <label htmlFor="file-input">
          <span className="button">Upload Images</span>
          <input
            type="file"
            id="file-input"
            name="file-input"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
            multiple
          />
        </label>
        <button
          onClick={handleGeneratePdfFromImages}
          disabled={uploadedImages.length === 0}
          className="button"
        >
          Generate PDF
        </button>
      </div>
    </div>
  );
};

export default Img2Pdf;
