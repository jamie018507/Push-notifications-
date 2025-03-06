self.addEventListener('push', function(event) {
    const data = event.data ? event.data.json() : {};

    event.waitUntil(
        self.registration.showNotification(data.title || "New Message", {
            body: data.body || "You have a new notification!",
            icon: "/icon.png"
        })
    );
});