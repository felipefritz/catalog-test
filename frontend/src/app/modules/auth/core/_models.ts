
export interface AuthModel {
  access_token: string | undefined
  user: UserModel;
}


export interface UserModel {
  id:          number;
  name:        string;
  email:       string;
  rut:         string;
  active:      boolean;
  created_at:  Date;
  contract_id: number;
  permissions: string[];
  roles:       string[];
  
  auth?: AuthModel
}