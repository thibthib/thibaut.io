const glob = require("fast-glob");
const imageminMozjpeg = require("imagemin-mozjpeg");
const imageminWebp = require("imagemin-webp");
const fs = require("fs").promises;
const sharp = require("sharp");
const path = require("path");

const resize = async (buffer, { height, width }) => {
  return Promise.all([
    ...[0.25, 0.33, 0.5, 0.75].map(async (factor) => {
      const resizedBuffer = await sharp(buffer)
        .resize(Math.round(width * factor), Math.round(height * factor))
        .toBuffer();
      return {
        buffer: resizedBuffer,
        width: Math.round(width * factor),
      };
    }),
    Promise.resolve({ buffer, width }),
  ]);
};

const toJpg = async (buffer, filename) => {
  const jpg = await imageminMozjpeg({
    quality: 75,
  })(buffer);
  await fs.writeFile(filename, jpg);
};

const processPictures = async () => {
  const filenames = await glob("./pictures/**/*.jpeg");

  filenames.map(async (filename) => {
    const fileBuffer = await fs.readFile(filename);
    const name = path.basename(filename, path.extname(filename));
    const outputPath = `public/pictures/${path.basename(path.dirname(filename))}`;
    await fs.mkdir(outputPath, { recursive: true });

    const { height, width } = await sharp(fileBuffer).metadata();

    const resized = await resize(fileBuffer, { height, width });
    resized.map(async ({ buffer, width }) => {
      const resizedName = `${name}-${width}w`;

      await toJpg(buffer, `${outputPath}/${resizedName}.jpg`);

      const webp = await imageminWebp({
        quality: 75,
        method: 6,
      })(buffer);
      await fs.writeFile(`${outputPath}/${resizedName}.webp`, webp);
    });

    const smallestFactor = 25 / Math.max(height, width);
    const placeholderBuffer = await sharp(fileBuffer)
      .resize(Math.round(width * smallestFactor), Math.round(height * smallestFactor))
      .blur()
      .toBuffer();

    await toJpg(placeholderBuffer, `${outputPath}/${name}-placeholder.jpg`);
  });
};

processPictures();
