// This dataset is a simplified representation based on known ocean plastic pollution hotspots.
// In a real-world application, this would be fetched from a dynamic data source or a more extensive static file.

export const pollutionData = [
  // Great Pacific Garbage Patch
  { lat: 35.0, lng: -145.0, val: 10 },
  { lat: 38.5, lng: -142.3, val: 9 },
  { lat: 33.2, lng: -148.1, val: 8 },
  { lat: 40.1, lng: -150.5, val: 7 },
  { lat: 36.7, lng: -139.8, val: 9 },
  { lat: 32.5, lng: -155.2, val: 6 },
  { lat: 34.9, lng: -140.0, val: 10 },
  { lat: 39.0, lng: -144.0, val: 8 },
  { lat: 31.0, lng: -150.0, val: 7 },
  { lat: 42.0, lng: -152.0, val: 5 },

  // North Atlantic Gyre
  { lat: 30.0, lng: -40.0, val: 8 },
  { lat: 28.5, lng: -42.5, val: 7 },
  { lat: 32.1, lng: -38.9, val: 8 },
  { lat: 25.0, lng: -45.0, val: 6 },
  { lat: 33.0, lng: -35.0, val: 7 },

  // Indian Ocean Gyre
  { lat: -20.0, lng: 80.0, val: 7 },
  { lat: -22.5, lng: 78.2, val: 6 },
  { lat: -18.3, lng: 82.5, val: 7 },
  { lat: -25.0, lng: 75.0, val: 5 },

  // Southeast Asia Coastlines (high river output)
  { lat: 10.0, lng: 115.0, val: 9 },
  { lat: 12.5, lng: 118.2, val: 8 },
  { lat: 8.3, lng: 112.5, val: 9 },
  { lat: 15.0, lng: 120.0, val: 7 },
  { lat: 5.0, lng: 110.0, val: 8 },
  { lat: 7.8, lng: 108.9, val: 9 },
  { lat: 14.2, lng: 109.3, val: 8 }, // Vietnam Coast
  { lat: 13.0, lng: 121.0, val: 8 }, // Philippines
  { lat: 3.0, lng: 101.0, val: 7 },  // Strait of Malacca

  // Mediterranean Sea
  { lat: 34.0, lng: 25.0, val: 6 },
  { lat: 38.0, lng: 15.0, val: 5 },

  // General background points
  { lat: 20.0, lng: -160.0, val: 3 },
  { lat: 0, lng: -120.0, val: 2 },
  { lat: -15.0, lng: -100.0, val: 3 },
  { lat: 10.0, lng: -25.0, val: 4 },
  { lat: -30.0, lng: -15.0, val: 3 },
  { lat: -40.0, lng: 100.0, val: 2 },
  { lat: 50.0, lng: -20.0, val: 2 },
  { lat: 25.0, lng: 130.0, val: 4 },
  { lat: -10.0, lng: 140.0, val: 3 },
  { lat: 30.2, lng: -135.8, val: 7 },
  { lat: 28.9, lng: -142.1, val: 8 },
  { lat: 32.4, lng: -149.3, val: 6 },
  { lat: 36.1, lng: -138.5, val: 9 },
  { lat: 39.5, lng: -147.2, val: 7 },
  { lat: 29.8, lng: -38.5, val: 7 },
  { lat: 31.5, lng: -41.2, val: 8 },
  { lat: 27.2, lng: -44.8, val: 6 },
  { lat: 34.0, lng: -36.7, val: 7 },
  { lat: -21.5, lng: 79.3, val: 6 },
  { lat: -19.8, lng: 81.1, val: 7 },
  { lat: -23.7, lng: 76.5, val: 5 },
  { lat: 11.2, lng: 116.7, val: 9 },
  { lat: 9.5, lng: 114.1, val: 8 },
  { lat: 6.8, lng: 111.3, val: 9 },
  { lat: 16.3, lng: 121.8, val: 7 },
  { lat: 4.2, lng: 112.5, val: 8 },
  { lat: 35.5, lng: 20.0, val: 5 },
  { lat: 37.1, lng: 18.2, val: 6 },
  { lat: 22.3, lng: -158.0, val: 4 },
  { lat: -5.0, lng: -110.0, val: 2 },
  { lat: -20.8, lng: -95.0, val: 3 },
  { lat: 15.6, lng: -30.0, val: 4 },
  { lat: -35.2, lng: -10.0, val: 3 },
  { lat: -45.0, lng: 110.0, val: 2 },
  { lat: 55.0, lng: -25.0, val: 2 },
  { lat: 28.0, lng: 135.0, val: 4 },
  { lat: -12.5, lng: 145.0, val: 3 },
  { lat: 40.8, lng: -141.2, val: 8 },
  { lat: 34.3, lng: -146.7, val: 9 },
  { lat: 30.1, lng: -152.9, val: 6 },
  { lat: 37.6, lng: -137.3, val: 8 },
  { lat: 41.2, lng: -148.9, val: 6 },
  { lat: 28.3, lng: -37.1, val: 7 },
  { lat: 32.8, lng: -39.8, val: 8 },
  { lat: 26.5, lng: -43.2, val: 6 },
  { lat: 35.1, lng: -35.4, val: 7 },
  { lat: -20.3, lng: 77.8, val: 6 },
  { lat: -18.9, lng: 83.2, val: 7 },
  { lat: -24.5, lng: 74.1, val: 5 },
  { lat: 13.1, lng: 117.9, val: 9 },
  { lat: 8.9, lng: 113.3, val: 8 },
  { lat: 5.5, lng: 110.1, val: 9 },
  { lat: 17.8, lng: 122.5, val: 7 },
  { lat: 3.5, lng: 113.8, val: 8 },
  { lat: 36.2, lng: 22.5, val: 5 },
  { lat: 38.7, lng: 16.8, val: 6 }
];