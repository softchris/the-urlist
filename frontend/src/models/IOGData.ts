interface IOGImage {
  url: string;
}

interface IOGData {
  title: string;
  description: string;
  image: IOGImage;
}

export { IOGImage, IOGData };
