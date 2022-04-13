const sendData = (data, res) => {
  if (data.error) res.status(400).send(data);
  else res.send(data);
};

module.exports = sendData;
