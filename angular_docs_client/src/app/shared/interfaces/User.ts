export interface User {
  username: string;
  password: string;
  name : string;
  email: string;
  location: string;
  isVerify: boolean;
  verifyToken: string;
  hashedRt: string;
  createdAt: Date;
}
