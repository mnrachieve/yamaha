export type CatalogueProduct = {
  model: string;
  category: string;
  series: string;
  engineCc: number;
  fuelType: "Petrol" | "Electric";
  colors: string[];
  productUrl: string;
};

// Supplied Yamaha India catalogue. Store imagery is enriched from the official
// Yamaha shop API in the page, with a local display fallback where needed.
export const yamahaCatalogue: CatalogueProduct[] = [
  { model: "R15M", category: "Sports Bike", series: "R-Series", engineCc: 155, fuelType: "Petrol", colors: ["Metallic Grey", "Monster Energy Yamaha MotoGP Edition"], productUrl: "https://shop.yamaha-motor-india.com/" },
  { model: "R15 V4", category: "Sports Bike", series: "R-Series", engineCc: 155, fuelType: "Petrol", colors: ["Racing Blue", "Intensity White", "Dark Knight", "Metallic Red", "Matte Pearl White", "Metallic Black", "MotoGP Edition"], productUrl: "https://shop.yamaha-motor-india.com/products/buy-r15-v4-1" },
  { model: "R15S", category: "Sports Bike", series: "R-Series", engineCc: 155, fuelType: "Petrol", colors: ["Racing Blue", "Matt Black", "Dark Knight", "Red"], productUrl: "https://shop.yamaha-motor-india.com/" },
  { model: "R2", category: "Sports Bike", series: "R-Series", engineCc: 0, fuelType: "Petrol", colors: [], productUrl: "https://shop.yamaha-motor-india.com/products/r2" },
  { model: "R2M", category: "Sports Bike", series: "R-Series", engineCc: 0, fuelType: "Petrol", colors: [], productUrl: "https://shop.yamaha-motor-india.com/" },
  { model: "MT-15 Ver 2.0", category: "Street Bike", series: "MT-Series", engineCc: 155, fuelType: "Petrol", colors: ["Metallic Black", "Metallic Silver Cyan", "Ice Fluo Vermillion", "Ice Storm", "Vivid Violet Metallic"], productUrl: "https://shop.yamaha-motor-india.com/" },
  { model: "XSR 155", category: "Neo-Retro Bike", series: "XSR-Series", engineCc: 155, fuelType: "Petrol", colors: [], productUrl: "https://shop.yamaha-motor-india.com/" },
  { model: "FZ-S FI Hybrid", category: "Street Bike", series: "FZ-Series", engineCc: 149, fuelType: "Petrol", colors: [], productUrl: "https://shop.yamaha-motor-india.com/" },
  { model: "FZ-S FI STD", category: "Street Bike", series: "FZ-Series", engineCc: 149, fuelType: "Petrol", colors: [], productUrl: "https://shop.yamaha-motor-india.com/" },
  { model: "FZ-S FI Ver 4.0 DLX", category: "Street Bike", series: "FZ-Series", engineCc: 149, fuelType: "Petrol", colors: ["Ice-Fluo Vermillion", "Cyber Green", "Racing Blue", "Majesty Red", "Matte Black", "Metallic Grey"], productUrl: "https://shop.yamaha-motor-india.com/" },
  { model: "FZ-S FI Ver 4.0", category: "Street Bike", series: "FZ-Series", engineCc: 149, fuelType: "Petrol", colors: ["Dark Matte Blue", "Matte Black"], productUrl: "https://shop.yamaha-motor-india.com/" },
  { model: "FZ-S FI Ver 3.0", category: "Street Bike", series: "FZ-Series", engineCc: 149, fuelType: "Petrol", colors: ["Matte Grey", "Matte Red", "Dark Knight"], productUrl: "https://shop.yamaha-motor-india.com/" },
  { model: "FZ-FI", category: "Street Bike", series: "FZ-Series", engineCc: 149, fuelType: "Petrol", colors: ["Metallic Black", "Matte Cyan"], productUrl: "https://shop.yamaha-motor-india.com/products/buy-fz-fi-new-1" },
  { model: "FZ-X", category: "Neo-Retro Bike", series: "FZ-Series", engineCc: 149, fuelType: "Petrol", colors: [], productUrl: "https://shop.yamaha-motor-india.com/" },
  { model: "FZ-X Hybrid", category: "Neo-Retro Bike", series: "FZ-Series", engineCc: 149, fuelType: "Petrol", colors: [], productUrl: "https://shop.yamaha-motor-india.com/" },
  { model: "FZ-Rave", category: "Street Bike", series: "FZ-Series", engineCc: 149, fuelType: "Petrol", colors: [], productUrl: "https://shop.yamaha-motor-india.com/" },
  { model: "FZ Blue Flex", category: "Street Bike", series: "FZ-Series", engineCc: 149, fuelType: "Petrol", colors: [], productUrl: "https://shop.yamaha-motor-india.com/" },
  { model: "Aerox 155", category: "Maxi Scooter", series: "Aerox", engineCc: 155, fuelType: "Petrol", colors: ["Silver", "Racing Blue", "Grey Vermillion", "Metallic Black"], productUrl: "https://shop.yamaha-motor-india.com/" },
  { model: "Aerox 155 Version S", category: "Maxi Scooter", series: "Aerox", engineCc: 155, fuelType: "Petrol", colors: [], productUrl: "https://shop.yamaha-motor-india.com/" },
  { model: "RayZR Street Rally 125 Fi Hybrid", category: "Scooter", series: "RayZR", engineCc: 125, fuelType: "Petrol", colors: [], productUrl: "https://shop.yamaha-motor-india.com/" },
  { model: "RAYZR 125 FI Hybrid", category: "Scooter", series: "RayZR", engineCc: 125, fuelType: "Petrol", colors: [], productUrl: "https://shop.yamaha-motor-india.com/" },
  { model: "New Fascino 125 FI", category: "Scooter", series: "Fascino", engineCc: 125, fuelType: "Petrol", colors: [], productUrl: "https://shop.yamaha-motor-india.com/" },
  { model: "Fascino 125 FI Hybrid", category: "Scooter", series: "Fascino", engineCc: 125, fuelType: "Petrol", colors: [], productUrl: "https://shop.yamaha-motor-india.com/" },
  { model: "EC-06", category: "Electric Scooter", series: "EV", engineCc: 0, fuelType: "Electric", colors: [], productUrl: "https://shop.yamaha-motor-india.com/" },
  { model: "Aerox E", category: "Electric Scooter", series: "EV", engineCc: 0, fuelType: "Electric", colors: [], productUrl: "https://shop.yamaha-motor-india.com/" },
];
