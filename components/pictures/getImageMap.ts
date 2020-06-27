export type Picture = {
  placeholder: string;
  src: string;
  srcSet: string;
  webpSrcSet: string;
};

export type Pictures = {
  [name: string]: Picture;
};

export const getPictures = async (album: string) => {
  const filenames: string[] = await require("fast-glob")(`./public/pictures/${album}/*.jpg`);

  const { basename, extname } = require("path");

  const widths: { [name: string]: string[] } = {};
  const placeholders: { [name: string]: string } = {};

  for (const filename of filenames) {
    const fullname = basename(filename, extname(filename));

    const match = fullname.match(/(.*)-([^-]*)$/);
    if (match !== null) {
      const [, name, width] = match;

      widths[name] = widths[name] || [];
      if (width === "placeholder") {
        const buffer = await require("fs").promises.readFile(filename);
        placeholders[name] = buffer.toString("base64");
      } else {
        widths[name].push(width);
      }
    }
  }

  const pictures: Pictures = {};

  for (const [name, values] of Object.entries(widths)) {
    const biggest = Math.max(...values.map((width: string) => parseInt(width)));
    pictures[name] = {
      placeholder: placeholders[name],
      src: `pictures/sicilia/${name}-${biggest}w.jpg`,
      srcSet: values
        .sort()
        .map((width) => `pictures/sicilia/${name}-${width}.jpg ${width}`)
        .join(", "),
      webpSrcSet: values
        .sort()
        .map((width) => `pictures/sicilia/${name}-${width}.webp ${width}`)
        .join(", "),
    };
  }

  return pictures;
};
