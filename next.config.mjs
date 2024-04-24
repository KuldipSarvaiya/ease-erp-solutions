/** @type {import('next').NextConfig} */
const nextConfig = {
  // logging: {
  //   fetches: {
  //     fullUrl: true, // full url in request
  //   },
  // },
  // api: {
  //   bodyParser: false, // this is used with form in api
  // },
  images: {
    domains: ["lh3.googleusercontent.com", "localhost"],
  },
};

export default nextConfig;
