const fs = require('fs');
const path = require('path');
const casual = require('casual');
const { singleReviewGenerator } = require('./reviewGenerator');

const writeFilePathForRooms = path.join(__dirname, '/seedfiles/rooms.csv');
const writeFilePathForReviews = path.join(__dirname, '/seedfiles/reviews.csv');
const writeRoomStream = fs.createWriteStream(writeFilePathForRooms);
const writeReviewStream = fs.createWriteStream(writeFilePathForReviews);

//helper functions
function writeReviewsForRoom(id) {
  let data = ''
  const randomInt = casual.integer(0,10);
  for (let k = 0; k < randomInt; k++) {
    data += singleReviewGenerator(id);
  }
  return data;
}

function writeRooms(id) {
  return `${id}\n`
}

//main
function writeTenMillionTimes(writer, encoding, generator, callback) {
  let i = 10000000;
  let id = 0;
  function write() {
    let ok = true;
    do {
      i--;
      id++;
      let data = generator(id);
      if (i === 0) {
        // Last time!
        writer.write(data, encoding, callback);
      } else {
        // See if we should continue, or wait.
        // Don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // Had to stop early!
      // Write some more once it drains.
      writer.once('drain', write);
    }
  }
  write();
}

writeTenMillionTimes(writeRoomStream, 'utf-8', writeRooms , () => {
  writeRoomStream.end();
  writeTenMillionTimes(writeReviewStream, 'utf-8', writeReviewsForRoom, () => {
    writeReviewStream.end();
  })
});



