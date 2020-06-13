const webPush = require('web-push');
const vapidKeys = {
    "publicKey": "BGDjvfRFhhNWLGX4QnuCrPRXRFOUB82Vwll999SVvMqCKgsnyAXEj-q8HCh27aHEJTZQAoT_h0h7qIMeDgHO66A",
    "privateKey": "cCgOXWFJWR_wOTPP-7e0W768kt9rBs-0cO7TdEH90bA"
};
 
webPush.setVapidDetails(
   'mailto:shaddam.a.h@gmail.com',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
const pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/cWAJwkxfiZs:APA91bFclTGaStMUIwyzjREkhTe16BtHeUIdBCSz1tCPXsuv6Ffsk_Rt9yLEvufRNZ5ek_7tLWnnS2gW1R4MQafHqIxT7-n-rBeM9TZZ6VyzsHWq1vTyr4hEjXT6UXcnTrS9Ma5fY46V",
   "keys": {
       "p256dh": "BAjt6FO4EOe7wwPq3qcCNGsZspyiGN7XV2G3jeAGOrOsmV1FpjN/rD2KhcuJugMzKcKIQnEl9zAK/UdnPkaqkv0=",
       "auth": "8CYBH5DNmXFrmg2FFIYS2g=="
   }
};
const payload = 'Selamat! Nyepak Bola kini dapat menerima push notifikasi!';
 
const options = {
   gcmAPIKey: '257365197330',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);