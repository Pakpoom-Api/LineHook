const line = require('@line/bot-sdk');
const express = require('express');
const axios = require('axios').default;
const dotenv = require('dotenv');

const env = dotenv.config().parsed;
const app = express();

const lineConfig = {
  channelAccessToken: env.ACCESS_TOKEN,
  channelSecret: env.SECRET_TOKEN,
};

const client = new line.Client(lineConfig);

app.post('/webhook', line.middleware(lineConfig), async (req, res) => {
  try {
    const events = req.body.events;
    console.log('event=>>>>', events);
    return events.length > 0
      ? await events.map((item) => handleEvent(item))
      : res.status(200).send('OK');
  } catch (error) {
    res.status(500).end();
  }
});

// // Check input data
//    const handleEvent = async (event) => {
//        if (event.type !== 'Message' || event.message.type !== 'text'){
//             return null;
//         }
//         else if ( event.type === 'message'){
//  //      call api
//           const { data } = await axios.post('https://32e7-110-170-208-162.ngrok-free.app/chat', {
//          //   headers:{
//          //    'x-rapidapi-aut': env,REPID_AUT
//          //    }
//           })
//    // End call API

//              console.log('Data=>>>>>>', data)
//              const { login_srv } = data
//              let str = ''
//             login_srv.forEach((result, i) => {
//              str += ogin_srv.length - 1 !== i ?  '${result}\n' : result
//          })
//             console.log("STR =>>>>>>>", str)
//             return client.replyMessage(event.replyToken,{type: 'text', text: str})
// //          return client.replyMessage(event.replyToken,{type: 'text', text: 'Test'})
//      }
//    }

const handleEvent = async (event) => {
  console.log(event);
  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: 'Test_test',
  });
};

app.listen(4000, () => {
  console.log('Listening on 4000');
});
