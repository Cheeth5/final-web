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
  { lat: 41.0, lng: 29.0, val: 7 }, // Istanbul/Bosphorus (Black Sea outflow)

  // France Specific Coastal Hotspots
  { lat: 43.2, lng: 5.3, val: 9 },  // Marseille (Major Port City)
  { lat: 43.29, lng: 5.37, val: 8 }, // Marseille Coastline
  { lat: 43.7, lng: 7.2, val: 8 },  // Nice (French Riviera, tourism)
  { lat: 43.6, lng: 7.1, val: 7 },  // Cannes/Antibes (French Riviera, tourism)
  { lat: 44.8, lng: -0.6, val: 7 }, // Bordeaux (Garonne River Mouth, Atlantic)
  { lat: 48.6, lng: -1.9, val: 6 }, // Saint-Malo (Brittany Coast, tourism)
  { lat: 49.4, lng: 0.1, val: 7 },  // Le Havre (Seine River Mouth, industrial)
  { lat: 43.0, lng: 6.0, val: 6 },  // Toulon (Naval Port)
  { lat: 42.7, lng: 3.0, val: 5 },  // Perpignan Coast (tourism)
  { lat: 46.1, lng: -1.2, val: 5 }, // La Rochelle (Atlantic Coast)

  // Tunisia Specific Coastal Hotspots
  { lat: 36.8, lng: 10.3, val: 10 }, // Tunis (Capital, Gulf of Tunis)
  { lat: 36.8, lng: 10.2, val: 9 },  // Lake Tunis / Port of Tunis
  { lat: 35.8, lng: 10.6, val: 9 },  // Sousse (Major tourist city)
  { lat: 35.7, lng: 10.8, val: 8 },  // Monastir (tourism, airport)
  { lat: 34.7, lng: 10.7, val: 9 },  // Sfax (Industrial, port city)
  { lat: 33.8, lng: 10.9, val: 8 },  // Djerba Island (Major tourist destination)
  { lat: 37.2, lng: 9.8, val: 7 },   // Bizerte (Port, lake)
  { lat: 36.4, lng: 10.7, val: 7 },  // Hammamet (tourism)
  { lat: 36.7, lng: 10.1, val: 6 },  // Carthage Coast
  { lat: 37.0, lng: 10.0, val: 5 },  // Northern Tunisia Coast
  { lat: 34.0, lng: 10.0, val: 4 },  // Southern Tunisia Coast

  // Other European Coastal Hotspots
  { lat: 41.3, lng: 2.1, val: 8 },  // Barcelona, Spain
  { lat: 40.8, lng: 14.2, val: 7 }, // Naples, Italy
  { lat: 37.9, lng: 23.7, val: 7 }, // Athens, Greece
  { lat: 38.7, lng: -9.1, val: 6 }, // Lisbon, Portugal (Atlantic)
  { lat: 51.2, lng: 3.2, val: 5 },  // Bruges/Ostend, Belgium (North Sea)
  { lat: 53.5, lng: 9.9, val: 6 },  // Hamburg, Germany (Elbe River)
  { lat: 55.7, lng: 12.5, val: 5 }, // Copenhagen, Denmark (Baltic Sea)
  { lat: 59.3, lng: 18.0, val: 5 }, // Stockholm, Sweden (Baltic Sea)

  // General European background points
  { lat: 51.5, lng: 0.1, val: 6 },   // Thames Estuary (London)
  { lat: 45.4, lng: 12.3, val: 6 },  // Venice Lagoon

  // Additional Coastal and Littoral Hotspots
  // East Asia
  { lat: 31.2, lng: 121.8, val: 9 }, // Shanghai Coast
  { lat: 22.5, lng: 113.8, val: 10 },// Pearl River Delta
  { lat: 35.5, lng: 139.9, val: 8 }, // Tokyo Bay

  // South Asia
  { lat: 19.0, lng: 72.8, val: 9 },  // Mumbai Coast
  { lat: 22.0, lng: 90.0, val: 10 }, // Ganges Delta
  { lat: 24.8, lng: 66.9, val: 8 },  // Karachi Coast

  // Americas
  { lat: 33.8, lng: -118.4, val: 7 },// Los Angeles Coast
  { lat: 40.5, lng: -73.9, val: 8 }, // New York Bight
  { lat: -22.9, lng: -43.2, val: 8 },// Rio de Janeiro
  { lat: -12.0, lng: -77.1, val: 7 },// Lima Coast

  // Africa
  { lat: 6.4, lng: 3.4, val: 9 },   // Lagos, Nigeria

  // More Southeast Asia
  { lat: -6.0, lng: 106.8, val: 10 },// Jakarta Bay
  { lat: 14.5, lng: 120.9, val: 9 }, // Manila Bay

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
  { lat: 30.2, lng: -135.8, val: 5 },
  { lat: 28.9, lng: -142.1, val: 6 },
  { lat: 32.4, lng: -149.3, val: 5 },
  { lat: 36.1, lng: -138.5, val: 7 },
  { lat: 39.5, lng: -147.2, val: 5 },
  { lat: 29.8, lng: -38.5, val: 5 },
  { lat: 31.5, lng: -41.2, val: 6 },
  { lat: 27.2, lng: -44.8, val: 5 },
  { lat: 34.0, lng: -36.7, val: 6 },
  { lat: -21.5, lng: 79.3, val: 4 },
  { lat: -19.8, lng: 81.1, val: 5 },
  { lat: -23.7, lng: 76.5, val: 4 },
  { lat: 11.2, lng: 116.7, val: 6 },
  { lat: 9.5, lng: 114.1, val: 5 },
  { lat: 6.8, lng: 111.3, val: 6 },
  { lat: 16.3, lng: 121.8, val: 5 },
  { lat: 4.2, lng: 112.5, val: 6 },
  { lat: 35.5, lng: 20.0, val: 4 },
  { lat: 37.1, lng: 18.2, val: 5 },
  { lat: 22.3, lng: -158.0, val: 4 },
  { lat: -5.0, lng: -110.0, val: 2 },
  { lat: -20.8, lng: -95.0, val: 3 },
  { lat: 15.6, lng: -30.0, val: 4 },
  { lat: -35.2, lng: -10.0, val: 3 },
  { lat: -45.0, lng: 110.0, val: 2 },
  { lat: 55.0, lng: -25.0, val: 2 },
  { lat: 28.0, lng: 135.0, val: 4 },
  { lat: -12.5, lng: 145.0, val: 3 },
  { lat: 40.8, lng: -141.2, val: 6 },
  { lat: 34.3, lng: -146.7, val: 7 },
  { lat: 30.1, lng: -152.9, val: 5 },
  { lat: 37.6, lng: -137.3, val: 6 },
  { lat: 41.2, lng: -148.9, val: 5 },
  { lat: 28.3, lng: -37.1, val: 5 },
  { lat: 32.8, lng: -39.8, val: 6 },
  { lat: 26.5, lng: -43.2, val: 5 },
  { lat: 35.1, lng: -35.4, val: 6 },
  { lat: -20.3, lng: 77.8, val: 5 },
  { lat: -18.9, lng: 83.2, val: 6 },
  { lat: -24.5, lng: 74.1, val: 4 },
  { lat: 13.1, lng: 117.9, val: 7 },
  { lat: 8.9, lng: 113.3, val: 6 },
  { lat: 5.5, lng: 110.1, val: 7 },
  { lat: 17.8, lng: 122.5, val: 5 },
  { lat: 3.5, lng: 113.8, val: 6 },
  { lat: 36.2, lng: 22.5, val: 4 },
  { lat: 38.7, lng: 16.8, val: 5 }
];
