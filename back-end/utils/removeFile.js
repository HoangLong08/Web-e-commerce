const fs = require("fs");

const removeSync = (fileName, req, res) => {
  const directoryPath = __basedir + "/src/uploads/";

  try {
    fs.unlinkSync(directoryPath + fileName);

    // res.status(200).send({
    //   message: "File is deleted.",
    // });
  } catch (err) {
    console.log("err: ", err);
    res.status(500).send({
      message: "Could not delete the file. " + err,
    });
  }
};

module.exports = removeSync;
