import webPush from 'web-push';

// Your VAPID keys
const VAPID_KEYS = {
    publicKey: 'BI4uHsHsKlpAJ_K4GZp-pQupJWlg53Ng6cO0iS8NQQ4zR9I765fGcQeH4OjfDYOcDIY4Y-tx7TjKv8FEu4Ya3Lk',
    privateKey: '_FP0hqQzEjQz-lIsxBM_H5LSliVOQ7udOugqJuEdFt4'
};

// Set up web-push
webPush.setVapidDetails('mailto:jamiepeacock0911@icloud.com', VAPID_KEYS.publicKey, VAPID_KEYS.privateKey);

// Store subscriptions (In a real app, save this in a database)
let subscriptions = [];

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '1mb', // Set the limit according to your needs
        },
    },
};

export default function handler(req, res) {
    if (req.method === 'POST') {
        // Parse subscription from request body
        const { subscription } = req.body;
        
        // Check if the subscription is valid
        if (!subscription || !subscription.endpoint) {
            return res.status(400).json({ error: 'Invalid subscription data' });
        }

        // Save subscription
        subscriptions.push(subscription);
        return res.status(201).json({ message: 'Subscription saved' });
    } 
    
    if (req.method === 'GET') {
        const payload = JSON.stringify({ title: 'New Notification!', body: 'Hello from your push server!' });

        // Send notifications to all stored subscriptions
        Promise.all(subscriptions.map(sub => {
            return webPush.sendNotification(sub, payload).catch(error => console.error('Error sending notification:', error));
        })).then(() => {
            return res.status(200).json({ message: 'Notifications sent!' });
        }).catch(error => {
            console.error('Error sending notifications:', error);
            return res.status(500).json({ error: 'Failed to send notifications' });
        });
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
