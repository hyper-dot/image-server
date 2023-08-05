import mongoose from 'mongoose';

const connect = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log('Connected to Mongodb');
  } catch (error) {
    console.log('MongoDB Connection Error : ', error);
  }
};

export default connect;
