import { randomUUID } from 'node:crypto';

export default class User {

  public readonly id: string;

  public name: string;
  public email: string;
  public password: string;

  public created_at: Date;

  constructor(
    props: Omit<User, 'id' | 'created_at'>,
    optionals?: { id: User['id']; created_at: User['created_at']; }
  ) {
    this.id = optionals?.id ?? randomUUID();
    this.name = props.name.trim();
    this.email = props.email.trim();
    this.password = props.password;
    this.created_at = optionals?.created_at ?? new Date();
  }

}

type UserSensitiveFields = 'email' | 'password';

export type UserSecure = Omit<User, UserSensitiveFields>;

export const UserSecureSelect: {[P in keyof Omit<User, UserSensitiveFields>]: boolean} = {
  id: true,
  name: true,
  created_at: true
}