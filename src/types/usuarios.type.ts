export default interface UsuariosType {
    idUsuario?: number;
    email?: string;
    password?: string;
    hash?:Promise<string>
    rol?: string;
  }