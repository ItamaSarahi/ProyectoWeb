import bcrypt from 'bcryptjs';

const encriptar = async (textPlain: any) => {
    const hash = await bcrypt.hash(textPlain, 10)
    return hash
}
  
export default encriptar;

