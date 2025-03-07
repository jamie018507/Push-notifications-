self.addEventListener('push', function(event) {

    const data = event.data ? event.data.json() : {};



    // Optional: Customize the notification

    const title = data.title || "New Message";

    const body = data.body || "You have a new notification!";

    const icon = "/icon.png";  // Make sure this icon exists

    const badge = "/badge.png"; // Optional: Set a badge for the notification



    const options = {

        body: body,

        icon: icon,

        badge: badge

    };



    // Show the notification

    event.waitUntil(

        self.registration.showNotification(title, options)

    );

});



// Optional: Handle click event for when the user clicks the notification

self.addEventListener('notificationclick', function(event) {

    event.notification.close(); // Close the notification when clicked



    // You can add additional actions here, like opening a URL

    event.waitUntil(

        clients.openWindow('https://your-website-url.com') // Customize the URL you want to open

    );

});
