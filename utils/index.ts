import Geocode from "react-geocode";

export function average(nums: number[]) {
  if(nums.length) {
    return nums.reduce((a, b) => (a + b)) / nums.length;
  }
  return 0;
}

export async function getCoordsFromAddress(address: string) {
  Geocode.setApiKey("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"); // TO DO : Find solution without google
  Geocode.setLanguage("en");
  Geocode.setRegion("fr");
  Geocode.setLocationType("ROOFTOP");
  Geocode.fromAddress(address).then(
    (response) => {
      const { lat, lng } = response.results[0].geometry.location;
      return { lat, lng };
    },
    (error) => {
      console.error(error);
    }
  );
}