const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // MongoDB 연결 URL - 로컬 MongoDB를 사용하는 경우
        const mongoURI = 'mongodb://localhost:27017/wavepark';
        
        // MongoDB 연결
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        
        console.log('MongoDB 연결 성공!');
    } catch (error) {
        console.error('MongoDB 연결 실패:', error.message);
        process.exit(1); // 연결 실패 시 프로세스 종료
    }
};

module.exports = connectDB; 