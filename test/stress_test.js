import http from 'k6/http';
import { check } from 'k6';

export let options = {
  vus : 20,
  duration : '30s'
};

export default function () {
  const BASE_URL = 'http://127.0.0.1:3004'; // make sure this is not production

  let responses = http.batch([
    [
      'GET',
      `${BASE_URL}/reviews/${Math.floor(Math.random() * 100000000) + 1}`,
      null
    ],
    [
      'GET',
      `${BASE_URL}/reviews/${Math.floor(Math.random() * 100000000) + 1}`,
      null
    ],
    [
      'GET',
      `${BASE_URL}/reviews/${Math.floor(Math.random() * 100000000) + 1}`,
      null
    ],

  ]);
  
  check(responses[0], {
    'is status 200': (r) => r.status === 200,
    'is faster than 2sec' : (r) => r.timings.duration < 2000,
  });

  check(responses[1], {
    'is status 200': (r) => r.status === 200,
    'is faster than 2sec' : (r) => r.timings.duration < 2000,
  });

  check(responses[2], {
    'is status 200': (r) => r.status === 200,
    'is faster than 2sec' : (r) => r.timings.duration < 2000,
  });


  // sleep(1);
}