interface IOGImage {
  url: string;
}

interface IOGData {
  title: string;
  description: string;
  image: Array<IOGImage>;
}

export { IOGImage, IOGData };
