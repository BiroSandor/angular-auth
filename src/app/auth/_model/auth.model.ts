export interface AuthResponseBaseData {
  idToken: string;
  email: string;
  refreshToken: string;	
  expiresIn: string;
  localId: string;
}

export interface AuthResponseData extends AuthResponseBaseData{
  registered: string;
}