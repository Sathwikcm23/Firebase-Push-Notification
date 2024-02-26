import { initializeApp, applicationDefault} from 'firebase-admin/app';
import { getMessaging } from "firebase-admin/messaging";

initializeApp({
  credential: applicationDefault(),
  projectId: 'myhomebeacon-77dfb',
});

exports.handler = async (event, context) => {
  const receivedToken = event.body.fcmToken;

  const message = {
    notification: {
      title: "Hello",
      body: 'welcome to My Home Beacon'
    },
    token: receivedToken,
  };

  try {
    await getMessaging().send(message);
    context.res = {
      statusCode: 200,
      body: JSON.stringify({
        message: "Successfully sent message",
        token: receivedToken,
      })
    };
    console.log("Successfully sent message");
  } catch (error) {
    context.res = {
      statusCode: 400,
      body: JSON.stringify(error)
    };
    console.error("Error sending message:", error);
  }
};
