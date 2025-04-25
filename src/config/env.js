import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env';

dotenv.config({
  path: path.resolve(__dirname, `../../${envFile}`),
});

console.log(`✅ Loaded environment from ${envFile}`);
