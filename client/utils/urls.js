export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';

export const MAGIC_PUBLIC_KEY = process.env.NEXT_PUBLIC_MAGIC_PUBLIC_KEY || 'pk_live_2B28B6BB97589D53';

export const STRIPE_PK = process.env.NEXT_PUBLIC_STRIPE_PK
|| 'pk_test_51JTq75Bf5VimHCBA8RSzwKpsZPVtGMTzsqAAYkO1g9lTCWLHbJ1IoRYS3TDAbecH2xQXj7Npv5MpoC3kOwBJ60hC00FO9gY9SW';

/**
 * Given an iamge return the URL
 * Works for local and deployed strapis
 * @param {any} image
 */
export const fromImageToUrl = (image) => {
  if (!image) {
    return '/vercel.svg';
  }

  if (image.url.indexOf('/') === 0) {
    return `${API_URL}${image.url}`;
  }

  return image.url;
};
