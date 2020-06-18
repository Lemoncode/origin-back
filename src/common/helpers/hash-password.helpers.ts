import crypto from 'crypto';
import util from 'util';

// NodeJs Docs: https://nodejs.org/dist/latest-v12.x/docs/api/crypto.html#crypto_crypto_pbkdf2_password_salt_iterations_keylen_digest_callback
// Storing salt and passwords: https://security.stackexchange.com/questions/17421/how-to-store-salt

const saltLength = 16;
export const generateSalt = () => crypto.randomBytes(saltLength).toString('hex');

const passwordLength = 64;
const digestAlgorithm = 'sha512';
const iterations = 100000;

export const buildHashedPassword = async (
  password: string,
  salt: string
): Promise<string> => {
  const pbkdf2 = util.promisify(crypto.pbkdf2);
  const hashedPassword = await pbkdf2(
    password,
    salt,
    iterations,
    passwordLength,
    digestAlgorithm
  );

  return hashedPassword.toString('hex');
};
