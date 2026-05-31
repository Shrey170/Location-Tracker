const http = require('http');

async function runTest() {
  console.log("🚀 Starting simulation...");
  
  // 1. Send Request
  console.log("1️⃣ Generating tracking link...");
  const sendRes = await fetch("http://localhost:5001/api/location/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sender: "Shrey", receiver: "Agent" })
  });
  const sendData = await sendRes.json();
  const requestId = sendData.link;
  console.log(`   ✅ Link Generated! Request ID: ${requestId}`);

  // 2. Accept Request
  console.log("2️⃣ Simulating Receiver accepting the request...");
  const acceptRes = await fetch("http://localhost:5001/api/location/accept", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ requestId })
  });
  const acceptData = await acceptRes.json();
  console.log(`   ✅ ${acceptData.message}`);

  // 3. Update Location
  console.log("3️⃣ Simulating Receiver sending live GPS data...");
  const lat = 37.7749; // San Francisco
  const lng = -122.4194;
  await fetch("http://localhost:5001/api/location/update", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ requestId, latitude: lat, longitude: lng })
  });
  console.log(`   ✅ Location updated to Lat: ${lat}, Lng: ${lng}`);

  // 4. Track Location
  console.log("4️⃣ Verifying Tracking Endpoint (Sender checking location)...");
  const trackRes = await fetch(`http://localhost:5001/api/location/track/${requestId}`);
  const trackData = await trackRes.json();
  
  if (trackData.status === "active" && trackData.location) {
    console.log(`   🎯 SUCCESS! Map will center on: ${trackData.location.latitude}, ${trackData.location.longitude}`);
  } else {
    console.log("   ❌ Failed to get active tracking data.");
  }
}

runTest();
