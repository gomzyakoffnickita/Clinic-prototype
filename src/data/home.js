import { CLINIC } from "./clinic";

const assetBase = `${import.meta.env.BASE_URL}hero/`;

export const HOME = {
  hero: {
    ariaLabel: `Визуальное вступление ${CLINIC.name}`,

    video: {
      src: `${assetBase}hero-1.mp4`,
      poster: `${assetBase}hero-1-still.jpg`,
    },

    portrait: {
      desktop: {
        src: `${assetBase}portrait-f.jpg`,
        width: 2048,
        height: 2731,
      },

      mobile: {
        src: `${assetBase}portrait-f-mobile.jpg`,
        width: 1152,
        height: 1536,
      },
    },
  },
};
