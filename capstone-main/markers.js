var locations = [];
var markers = [];
var datas = [];
var arrayLoc = 0;

// Used to place the markers currently in the JSON bin though only works for Sean Flavell's so far since the JSON bin isn't the final one.
async function placeJSONMarkers() {
	
	jsonDataString = await getJSONData();
		  datas = JSON.parse(jsonDataString);
		  
		  var found = false;

		  // finds the location of the user in the array by using the id
		  for(arrayLoc = 0; arrayLoc < datas.length; arrayLoc++)
		  {
				if(datas[arrayLoc].ID == userId)
				{
					found = true;
					break;
				}
		  }
		  if(found == true)
		  {
			datas[arrayLoc].markers.forEach(function(data) {
				var latLng = {
					lat: parseFloat(data.location.split(',')[0]),
					lng: parseFloat(data.location.split(',')[1])
				};
	
				var marker = new google.maps.marker.AdvancedMarkerElement({
					position: latLng,
					map: map,
					title: data.title
				});
				console.log(data.title);
				let content = `<div class="info-window-content">
	  <div><strong><h1>` + data.title + `</h1></strong></div><br>
							  <img class="info-window-image" src="` + data.image + `" alt="` + data.title + `">
							  
							  <div>` + data.about + `</div>'
							  <br><button onclick="deleteMarker('` + data.title + `')">Delete Marker</button>
							  </div>`;
	
				var infowindow = new google.maps.InfoWindow({
					content: content
				});
	
				marker.addListener('click', function() {
					infowindow.open(map, marker);
				});
	
				markers.push(marker);
			});
		  }
}

async function clickMarker()
{
	// When the user clicks on the map it puts the lat/lng into the location text entry in the side box.
	var listener = google.maps.event.addListener(map, 'click', function (event) {
	const changelocation = document.querySelector("#location");
	var clickedLocation = event.latLng;
	var latLnglocation = clickedLocation.lat() + ', ' + clickedLocation.lng();
	
	// Google puts parentheses so I have this to remove them.
	const finLocation = latLnglocation.substring(0, latLnglocation.length-1);
	document.getElementById('location').value = finLocation;
	});
}


  // Adds the marker to the datas array and puts it into the JSON bin.
  async function addMarker(latLng, title, image, about) {
	const [lat, lng] = latLng.split(',').map(Number);

	const marker = new google.maps.marker.AdvancedMarkerElement({
	  position: { lat, lng },
	  map: map,
	  title: title
	});
	var tempArray = {
		"title": title,
    	"location": latLng,
		"image": image,
    	"about": about
	}

	// html for the box that opens when a user clicks on a marker
	let content = '<div class="info-window-content">' +
  '<div><strong><h1>' + title + '</h1></strong></div><br>' +
						  '<img class="info-window-image" src="' + image + '" alt="' + title + '">' +
						  
						  '<div>' + about + '</div>' +
						  '</div>';



	const infowindow = new google.maps.InfoWindow({
	  content: content
	});

	marker.addListener('click', () => {
	  infowindow.open(map, marker);
	});

	datas[arrayLoc].markers.push(tempArray);
	console.log("hey");
	console.log(datas);
	putJSONDataMarker(datas)
		.then(() => {console.log("Sent updated user data to jsonbin:", updatedUser);}).catch(error => {
		console.error("Error updating jsonbin.io:", error.message);
		document.getElementById('response').innerHTML = 'Error: ' + error.message;});

  }

  // Adds to the location array.
async function addLocation() {
	//var listener = google.maps.event.addListener(map, 'click', function (event) {
	//var clickedLocation = event.latLng;
	//const location = clickedLocation.lat() + ', ' + clickedLocation.lng()
    const title = document.getElementById('title').value;
    const location = document.getElementById('location').value;
    const image = document.getElementById('imageText').value;
    const about = document.getElementById('about').value;

	console.log(location);
    if (title && location && about) {
      const latLngArray = location.split(',');
      if (latLngArray.length !== 2) {
        alert('Invalid Lat, Lng format. Please use the format: 39.9666, -75.5908');
        return;
      }

      const latLng = {
        lat: parseFloat(latLngArray[0]),
        lng: parseFloat(latLngArray[1])
      };

      if (isNaN(latLng.lat) || isNaN(latLng.lng)) {
        alert('Invalid latitude or longitude values.');
        return;
      }

      const newLocation = {
		title: title,
		image: image,
		location: `${latLng.lat}, ${latLng.lng}`,
		about: about
	  };
	  console.log(`${latLng.lat}, ${latLng.lng}`);
      locations.push(newLocation); // Add the new location to the locations array
      addMarker(`${latLng.lat}, ${latLng.lng}`, title, image, about); // Add a marker for the new location

      // Clear the form inputs
      document.getElementById('title').value = '';
      document.getElementById('location').value = '';
      document.getElementById('imageText').value = '';
      document.getElementById('about').value = '';
	  //google.maps.event.removeListener(listener);
	}
	
}
  

  // Function to delete a specific marker by title
	function deleteMarker(title) {
		// Find the marker in markersData
		console.log(title);
		const markerIndex = markers.findIndex(markers => markers.title === title);

		if (markerIndex > -1) {
			// Remove the marker from the map
			markers[markerIndex].setMap(null);
			// Remove the marker from the markersData array
			markers.splice(markerIndex, 1);
			datas[arrayLoc].markers.splice(markerIndex, 1);
			alert('Marker deleted successfully!');
			alertCurrentMarkers(); // Alert the current JSON array after deleting a marker
		}
	}

	// Function to display the current markers data in an alert
	async function alertCurrentMarkers() {
		console.log(datas);
		const markersJSON = datas[arrayLoc].markers.map(data => ({
			title: data.title,
			coordinates: data.location
		}));
		putJSONDataMarker(datas)
		.then(() => {console.log("Sent updated user data to jsonbin:", updatedUser);}).catch(error => {
		console.error("Error updating jsonbin.io:", error.message);
		document.getElementById('response').innerHTML = 'Error: ' + error.message;});
		alert('Current Markers Data:\n' + JSON.stringify(markersJSON, null, 2));
	}

	async function uploadImage() {
		// Get the selected file from the file input element
		const imageInput = document.getElementById('imageInput').files[0];
		
		// If no file is selected, alert the user and exit the function
		if (!imageInput) {
		  alert('Please select an image to upload.');
		  return;
		}
		
		// Create a FormData object to store the image file
		const formData = new FormData();
		// Append the image file to the FormData object with the key "image"
		formData.append("image", imageInput);
  
		try {
		  // Send a POST request to Imgur's image upload endpoint
		  const response = await fetch("https://api.imgur.com/3/image", {
			method: "POST", // Specifies the HTTP method as POST
			headers: {
			  // Sets the Authorization header using the Imgur access token
			  Authorization: "Bearer 86d26dac6e82f7ea8e7c751c37a873f308afab6d"  // Replace with your actual Imgur access token
			},
			// Include the FormData (containing the image) in the request body
			body: formData
		  });
  
		  // Parse the JSON response returned by the Imgur API
		  const data = await response.json();
		  console.log(data);
		  // If the response indicates success, display the Imgur link
		  if (data.success) {
			document.getElementById('imageResult').innerHTML = 
			  //`<p>Image uploaded successfully!</p>
				`<a href="${data.data.link}" target="_blank">${data.data.link}</a>`;
				document.getElementById('imageText').value = data.data.link;
		  } else {
			// If the upload failed, display the error message from the response
			document.getElementById('imageResult').innerHTML = 
			  `<p>Upload failed: ${data.data.error}</p>`;
		  }
		} catch (error) {
		  // Log any errors that occur during the fetch operation
		  console.error('Error uploading to Imgur:', error);
		  // Display a general error message in the result div
		  document.getElementById('imageResult').innerHTML = '<p>Error uploading image.</p>';
		}
	  }