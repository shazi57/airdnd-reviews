/*
 * Airbnb fake reviews generator
 * Library: casual (npm install casual)
 * Input: Number of reviews
 * Output: An array of random reviews
 */

const casual = require('casual');

const reviewGenerator = function (numberOfData, options='product', roomid) {
  let res = [];

  for (let i = 0; i < numberOfData; i++) {
    const curData = {};

    //id
    const id = i+1;
    // name
    const name = casual.first_name;
    //gender 0:women 1:men
    let from = 0;
    let to = 1;
    const gender = casual.integer(from, to);
    //profile pic
    from = 0;
    to = 99;
    const profilePicNum = casual.integer(from, to);
    // date
    let formate = 'MMMM YYYY';
    const date = casual.date(formate);
    // sentence
    const sentence = casual.text;
    // rating_accuracy
    from = 0;
    to = 5;
    const accuracy_rating = casual.double(from, to).toFixed(1);
    // rating_communication
    const communication_rating = casual.double(from, to).toFixed(1);
    // rating_cleanliness
    const cleanliness_rating = casual.double(from, to).toFixed(1);
    // rating_location
    const location_rating = casual.double(from, to).toFixed(1);
    // rating_check_in
    const check_in_rating = casual.double(from, to).toFixed(1);
    // rating_value
    const value_rating = casual.double(from, to).toFixed(1);
    
    curData.id = id;
    curData.name = name;
    curData.gender = gender;
    curData.profilePicNum = profilePicNum;
    curData.date = date;
    curData.sentence = sentence;
    curData.accuracy_rating = Number(accuracy_rating);
    curData.communication_rating = Number(communication_rating);
    curData.cleanliness_rating = Number(cleanliness_rating);
    curData.location_rating = Number(location_rating);
    curData.check_in_rating = Number(check_in_rating);
    curData.value_rating = Number(value_rating);
    
    // overall_rating = ratings above / 6
    curData.overall_rating = Number(((curData.accuracy_rating
        + curData.communication_rating
        + curData.cleanliness_rating
        + curData.location_rating
        + curData.check_in_rating
        + curData.value_rating) / 6)
      .toFixed(1));
    res.push(curData);
  }
  return res;
};

const singleReviewGenerator = (roomId) => {
  // name
  const name = casual.first_name;
  //gender 0:women 1:men
  let from = 0;
  let to = 1;
  const gender = casual.integer(from, to);
  //profile pic
  from = 0;
  to = 99;
  const profilePicNum = casual.integer(from, to);
  // date
  let formate = 'MMMM YYYY';
  const date = casual.date(formate);
  // sentence
  const sentence = casual.text;
  // rating_accuracy
  from = 0;
  to = 5;
  const accuracy_rating = casual.double(from, to).toFixed(1);
  // rating_communication
  const communication_rating = casual.double(from, to).toFixed(1);
  // rating_cleanliness
  const cleanliness_rating = casual.double(from, to).toFixed(1);
  // rating_location
  const location_rating = casual.double(from, to).toFixed(1);
  // rating_check_in
  const check_in_rating = casual.double(from, to).toFixed(1);
  // rating_value
  const value_rating = casual.double(from, to).toFixed(1);

  return `${roomId},${name},${gender},${profilePicNum},${date},${sentence},${Number(accuracy_rating)},${Number(communication_rating)},${Number(cleanliness_rating)},${Number(location_rating)},${Number(check_in_rating)},${Number(value_rating)},${Number((
    ( Number(accuracy_rating)
    + Number(communication_rating)
    + Number(cleanliness_rating)
    + Number(location_rating)
    + Number(check_in_rating)
    + Number(value_rating)) / 6)
   .toFixed(1))}\n`
}


module.exports = { reviewGenerator, singleReviewGenerator };
