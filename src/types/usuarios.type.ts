export default interface UsuariosType {
    idUsuario?: number;
    usuario?: string;
    password?: string;
    hash?:Promise<string>
    rol?: string;
  }