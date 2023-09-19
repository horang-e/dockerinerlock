import { Client } from '@stomp/stompjs';


export const client = new Client({
  brokerURL: 'ws://3.25.192.143:8081/docker/deploy',
  onConnect: () => {
    client.subscribe('/topic/test01', message =>
      console.log(`Received: ${message.body}`)
    );
    client.publish({ destination: '/docker/deploy', body: 'First Message' });
  },
});

client.active()