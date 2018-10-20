import firebase from 'react-native-firebase';
// import profileImage from './src/images/profile.png';

export default async message => {
  console.log('Notification Recieved: ', message);
  // Build a channel
  const channel = new firebase.notifications.Android.Channel(
    'checkin-channel',
    'Checkin Channel',
    firebase.notifications.Android.Importance.Max
  ).setDescription('Checkin channel');

  // console.log(channel.channelId);
  // Create the channel
  firebase.notifications().android.createChannel(channel);
  const notification = new firebase.notifications.Notification({
    sound: 'default',
    show_in_foreground: true,
  })
    .setNotificationId(message.data.id)
    .setTitle(message.data.title)
    .setBody(message.data.body)
    .setSound('default')
    .android.setChannelId(channel.channelId)
    .android.setSmallIcon('@mipmap/ic_notification')
    .android.setPriority(firebase.notifications.Android.Priority.Max)
    .android.setLargeIcon(
      message.data.sender_profile_picture
        ? message.data.sender_profile_picture
        : '@mipmap/ic_notification'
    )
    .android.setVibrate([500, 500, 500]);
  // .android.autoCancel(true);
  firebase.notifications().displayNotification(notification);
  return Promise.resolve();
};
