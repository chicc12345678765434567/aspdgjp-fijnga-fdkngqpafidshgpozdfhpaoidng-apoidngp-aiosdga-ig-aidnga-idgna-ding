const binId = '67465bcde41b4d34e45b3e9f';
const url = "https://api.jsonbin.io/v3/b/"+binId+"?meta=false"; // Replace with your bin ID
const apikey = "$2a$10$C0bYn9YQ.EqR3qlE.w1l2O5nVDTJwHJ8rc.G8Xw8GtLgw.f9AXzMe"; // Replace with your API key

// Helper function to generate a unique 5-digit userID
function generateUniqueId(existingIds) {
  let userId;
  do {
    userId = Math.floor(10000 + Math.random() * 90000).toString(); // Generate a 5-digit ID
  } while (existingIds.includes(userId)); // Ensure it's unique
  return userId;
}

// Main signup function
async function signup() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const statusElement = document.getElementById("status");

  if (!username || !password) {
    statusElement.textContent = "All fields are required.";
    return;
  }

  try {
    // Step 1: Fetch existing users from JSONbin
    const response = await fetch(url, {
      headers: {
        "X-Master-Key": apikey,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch existing users.");
    }

    const data = await response.json();
    const users = data.record || []; // Fetch existing users or initialize to an empty array

    // Step 2: Check if username already exists
    if (users.some(user => user.username === username)) {
      statusElement.textContent = "Username already exists. Choose another.";
      return;
    }

    // Step 3: Generate a unique 5-digit userID
    const existingIds = users.map(user => user.userId); // Get all existing user IDs
    const userId = generateUniqueId(existingIds);

    // Step 4: Add the new user to the list
    const newUser = { userId, username, password };
    users.push(newUser);

    // Step 5: Update JSONbin with the updated user list
    const updateResponse = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": apikey,
      },
      body: JSON.stringify(users), // Send the full updated user list
    });

    if (updateResponse.ok) {
      alert("Sign-up successful!");
      document.getElementById("signup-form").reset();
      statusElement.textContent = "";
    } else {
      throw new Error("Failed to update users.");
    }
  } catch (error) {
    console.error("Error during signup:", error);
    statusElement.textContent = "An error occurred. Please try again.";
  }
}
const putJSONData = async (updatedData) => {

	const binId = '67465bcde41b4d34e45b3e9f'; 
  
	const apiKey = '$2a$10$C0bYn9YQ.EqR3qlE.w1l2O5nVDTJwHJ8rc.G8Xw8GtLgw.f9AXzMe'; 
  
   
  
	const url = "https://api.jsonbin.io/v3/b/"+binId+"?meta=false";	
  
   
  
	try {
  
			  
  
   
  
			  // Log the updated data for debugging purposes
  
			  console.log('Updated data to be saved:', updatedData);
  
   
  
			  // Save the updated array back to JSONbin
  
			  const response = await fetch(url, {
  
				method: 'PUT',  // Use PUT to overwrite the existing data
  
				headers: {
  
						  'X-Master-Key': apiKey,
  
						  'Content-Type': 'application/json',
  
						  'X-Bin-Versioning': 'false',  // Prevent versioning if necessary
  
				},
  
				body: JSON.stringify(updatedData),  // Send the full updated data array
  
			  });
  
   
  
			  if (response.status !== 200) {
  
				throw new Error('Failed to update data');
  
			  }
  
   
  
			  const result = await response.json();
  
			  // Successfully saved data - trigger success message
  
			  alert('Sign up successfull!');


        window.location.href = "login.html";


  
			  document.getElementById('response').innerHTML = 'Data successfully submitted! Response: ' + JSON.stringify(result);
  
	} catch (error) {
  
			  document.getElementById('response').innerHTML = 'Error: ' + error.message;
  
	}
  
  };