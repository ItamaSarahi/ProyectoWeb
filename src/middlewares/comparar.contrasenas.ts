import bcrypt from 'bcryptjs';

const comparar = async (passwordPlain: any, hashPassword: any) => {
    return await bcrypt.compare(passwordPlain, hashPassword)
}
export default comparar;
