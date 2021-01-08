import sharp, { Sharp } from "sharp";
import fs from "fs";
import path from "path";
import glob from "fast-glob";

const getPlaceholder = (sharpImage: Sharp) =>
  sharpImage
    .normalise()
    .modulate({
      saturation: 1.2,
      brightness: 1,
    })
    .removeAlpha()
    .resize(10, 10, { fit: "inside" })
    .toBuffer({ resolveWithObject: true })
    .then(({ data, info }) => {
      const { format } = info;

      const base64 = `data:image/${format};base64,${data.toString("base64")}`;

      return base64;
    });

export type ImageDataMap = {
  [name: string]: {
    name: string;
    src: string;
    placeholder: string;
    height: number;
    width: number;
    dominant: string;
  };
};

export const processImages = (folder: string): Promise<ImageDataMap> => {
  return glob(`./public/${folder}/*`).then((filenames) =>
    Promise.all(
      filenames.map((source) =>
        fs.promises.readFile(source).then((buffer) => {
          const sharpImage = sharp(buffer);
          return Promise.all([
            getPlaceholder(sharpImage),
            sharpImage.metadata(),
            sharpImage.stats(),
          ]).then(([placeholder, metadata, stats]) => {
            return {
              src: `/${path.relative("./public", source)}`,
              name: path.basename(source, path.extname(source)),
              placeholder,
              height: metadata.height,
              width: metadata.width,
              dominant: `rgb(${stats.dominant.r},${stats.dominant.g},${stats.dominant.b})`,
            };
          });
        })
      )
    ).then((images) => images.reduce((aggr, image) => ({ ...aggr, [image.name]: image }), {}))
  );
};
