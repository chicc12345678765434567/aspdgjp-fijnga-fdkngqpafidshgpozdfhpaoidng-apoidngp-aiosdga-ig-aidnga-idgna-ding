var map;
async function initMap() {

	const position = { lat: -25.344, lng: 131.031 };
	// Request needed libraries.
	//@ts-ignore
	const { Map } = await google.maps.importLibrary("maps");
	const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

	// The map, centered at Uluru
	map = new Map(document.getElementById("map"), {
  	zoom: 4,
  	center: position,
  	mapId: "DEMO_MAP_ID",
	});
	  
	placeJSONMarkers();
	createBox();
	clickMarker();
	  
}