const mongoose = require("mongoose");

const ParkingSchema = new mongoose.Schema({
  nom: { type: String, required: true }, // Ex : "Lac"
  totalPlaces: { type: Number, required: true }, // Total des places (ex : 55)
  lignes: [
    {
      name: { type: String, required: true }, // Nom de la ligne (ex : "A", "B", etc.)
      places: [
        {
          code: { type: String, required: true }, // Ex : "A1", "A2", etc.
          isReserved: { type: Boolean, default: false } // Etat de la place : libre ou réservée
        }
      ]
    }
  ]
});

module.exports = mongoose.model("Parking", ParkingSchema);

/*
{
  "nom": "Lac",
  "totalPlaces": 55,
  "lignes": [
    {
      "name": "A",
      "places": [
        { "code": "A1", "isReserved": false },
        { "code": "A2", "isReserved": false },
        { "code": "A3", "isReserved": true },
        { "code": "A4", "isReserved": false },
        { "code": "A5", "isReserved": true }
      ]
    },
    {
      "name": "B",
      "places": [
        { "code": "B1", "isReserved": false },
        { "code": "B2", "isReserved": false },
        { "code": "B3", "isReserved": false },
        { "code": "B4", "isReserved": false },
        { "code": "B5", "isReserved": false }
      ]
    }
    // ... ajouter plus de lignes si nécessaire
  ]
}

*/