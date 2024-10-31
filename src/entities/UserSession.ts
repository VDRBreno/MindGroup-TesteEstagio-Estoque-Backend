import { randomUUID } from 'node:crypto';

import DateFormatter from '@/utils/dateFormatter';

export default class UserSession {

  public readonly id: string;
  public readonly user_id: string;
  
  public expires_at: Date;

  public created_at: Date;

  constructor(
    props: Omit<UserSession, 'id' | 'expires_at' | 'created_at'>,
    optionals?: { id: UserSession['id']; created_at: UserSession['created_at']; expires_at: UserSession['expires_at']; }
  ) {
    this.id = optionals?.id ?? randomUUID();
    this.user_id = props.user_id;
    this.expires_at = optionals?.expires_at ?? new DateFormatter().addTime(new Date(), 1, 'day');
    this.created_at = optionals?.created_at ?? new Date();
  }

}