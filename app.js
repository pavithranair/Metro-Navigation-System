document.getElementById("submit-button").addEventListener("click", function () {
    const currentLocation = document.getElementById("current-location").value;
    const destination = document.getElementById("destination").value;
  

    const route = simulateRoute(currentLocation, destination);
    displayRouteOnMap(route);
  });
  
  function simulateRoute(currentLocation, destination) {
    return [
      currentLocation,
      "Station A",
      "Station B",
      "Station C",
      destination,
    ];
  }
  
  function displayRouteOnMap(route) {

    const mapElement = document.getElementById("map");
    mapElement.innerHTML = "Route: " + route.join(" -> ");
  }
  