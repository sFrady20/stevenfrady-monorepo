import { Loader } from "@googlemaps/js-api-loader";

const loader = new Loader({
  apiKey: "AIzaSyBCvbykWSjh6PkTFZ4P4VulR5nYpXVTvyE",
  version: "weekly",
});
export default loader.load();
