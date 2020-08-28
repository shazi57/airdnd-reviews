const fs = require('fs');
const path = require('path');
const casual = require('casual');
const { singleReviewGenerator } = require('./reviewGenerator');

const writeFilePath = path.join(__dirname, 'seedFile.csv');
const writeStream = fs.createWriteStream(writeFilePath);

function writeTenMillionTimes(writer, encoding, callback) {
  let i = 10000000;
  let id = 0;
  function write() {
    let ok = true;
    do {
      i--;
      id++;
      const randomInt = casual.integer(0,10);
      let data = '';
      for (let k = 0; k < randomInt; k++) {
        data += singleReviewGenerator(id);
      }
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

writeTenMillionTimes(writeStream, 'utf-8', () => {
  writeStream.end();
});