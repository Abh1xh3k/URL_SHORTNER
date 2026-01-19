import { createClient } from 'redis';

const redis = createClient({
    socket: {
        host: 'localhost',
        port: 6379
    }
});

redis.on('error', (err) => console.log('Redis Client Error', err));
redis.on('connect', () => console.log('Redis Connected'));

redis.connect().catch(console.error);

export default redis;