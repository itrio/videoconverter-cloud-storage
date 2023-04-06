const { Storage } = require('@google-cloud/storage');

//Setup the conversion and the output
const NAME_OF_OUTPUT_BUCKET = 'videoconverter_output';
const VIDEO_CODEC = 'libx264';
const AUDIO_FREQUENCY = 40000;

//Function that will be executed when a file is added to the bucket
exports.convertVideo = async (file, context) => {
  const storage = new Storage();
  const bucket_input = storage.bucket(file.bucket);
  const bucket_output = storage.bucket(NAME_OF_OUTPUT_BUCKET);

  const fileToDownload = bucket_input.file(file.name);

  const tempFilePath = `/tmp/${fileToDownload.name}`;
  await fileToDownload.download({ destination: tempFilePath});

  console.log(`Converting file: ${file.name}`);
  
  await processVideoSync(tempFilePath);
  
  console.log('Uploading to bucket...');
  await bucket_output.upload(`/tmp/converted_file.mp4`, {destination: fileToDownload.name});
  console.log(`File uploaded to bucket.`);
};

function processVideoSync(tempFilePath){
    return new Promise((resolve,reject)=>{
      const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
      const ffmpeg = require('fluent-ffmpeg');

      ffmpeg()
      .setFfmpegPath(ffmpegPath)
      .input(tempFilePath)
      .videoCodec(VIDEO_CODEC)
      .audioFrequency(AUDIO_FREQUENCY)
      .on('error', function(err) {
        console.log('An error occurred: ' + err.message);
        return reject(err.message);
      })
      .on('end', function() {
        console.log('File converted!');
        return resolve();
      })
      .saveToFile(`/tmp/converted_file.mp4`);
    })
}