var services_array = [
    {
      "community": "Madrid",
      "description": "Day Tours in Spain's Bustling Capital",
      "image": "./photos/madridCommunity.jpg"
    },
    {
      "community": "Andalusia",
      "description": "Day Tours in Spain's Stunning Southern Gem",
      "image": "./photos/andalusia.jpg"
    },
    {
      "community": "Catalonia",
      "description": "Day Tours in Spain's Vibrant Seaside Community",
      "image": "./photos/catalonia.jpg"
    },
    {
      "community": "Valencia",
      "description": "Day Tours in the Birthplace of Paella",
      "image": "./photos/valenciaCommunity.jpg"
    }
  ];
  
  var madrid_tours = [
    {
      "tour": "Madrid",
      "description": "Tapas and wine tasting",
      "length": "Day Tour",
      "price": 85.00,
      "image": "./photos/madrid.jpg"
    },
    {
      "tour": "Toledo",
      "description": "Cut the lines and receive a guided tour at the Cathedral of Toledo",
      "length": "Half-Day Tour",
      "price": 60.00,
      "image": "./photos/Toledo.jpg"
    },
    {
      "tour": "El Escorial",
      "description": "Guided tour of El Escorial Monastery and the Valley of the Fallen",
      "length": "Day Tour",
      "price": 65.00,
      "image": "./photos/escorial.jpg"
    }
  ];
  
  var andalusia_tours = [
    {
      "tour": "Seville",
      "description": "Enjoy a guided tour of the Alcázar followed by a relaxing carriage ride to Plaza de España",
      "length": "Day Tour",
      "price": 40.00,
      "image": "./photos/seville.jpg"
    },
    {
      "tour": "Granada",
      "description": "Private tour of the Alhambra and General Life area",
      "length": "Day Tour",
      "price": 150.00,
      "image": "./photos/granada.jpg"
    },
    {
      "tour": "Ronda",
      "description": "Ride horses through the countryside, enjoy a picnic of Spain's fine wine and tapas, and receive a guided tour through Ronda's New and Old Towns",
      "length": "Day Tour",
      "price": 100.00,
      "image": "./photos/ronda.jpg"
    },
  ];
  
  var catalonia_tours = [
    {
      "tour": "Barcelona",
      "description": "Skip the line and enjoy a guided tour of La Sagrada Familia",
      "length": "Day Tour",
      "price": 100.00,
      "image": "./photos/barcelona.jpg"
    },
    {
      "tour": "Costa Brava",
      "description": "Guided tour through the coastal villages of Costa Brava, including tapas and wine tasting",
      "length": "Half-Day Tour",
      "price": 50.00,
      "image": "./photos/Girona.jpg"
    },
    {
      "tour": "Montserrat",
      "description": "Skip the line at the Monastery of Monsterrat",
      "length": "Half-Day Tour",
      "price": 30.00,
      "image": "./photos/montserrat.jpg"
    }
  ];
  
  var valencia_tours = [
    {
      "tour": "Peñiscola",
      "description": "Explore the castle inside a walled fishing village and later relax by the beach with tapas and wine",
      "length": "Day Tour",
      "price": 80.00,
      "image": "./photos/peniscola.jpg"
    },
    {
      "tour": "Alicante",
      "description": "Sail along the coast with tapas and wine",
      "length": "Day Tour",
      "price": 120.00,
      "image": "./photos/alicante.jpg"
    },
    {
      "tour": "Valencia",
      "description": "Cut the lines at the City of Arts and Sciences, one of the twelve treasures of Spain",
      "length": "Day Tour",
      "price": 10.00,
      "image": "./photos/valencia.jpg"
    }
  ];
  
  var allServices = {
    "Madrid": madrid_tours, 
    "Andalusia": andalusia_tours,
    "Catalonia": catalonia_tours,
    "Valencia": valencia_tours
  }
  
  if (typeof module != 'undefined') {
    module.exports.allServices = allServices;
  }