export class AuthJwt {
  sub: string | undefined;
  iat: number | undefined;
  exp: number | undefined;
  username: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  groups: Array<string> | undefined;
  roles: Array<string> | undefined;
  permissions: Array<string> | undefined;
  loginFirstTime: boolean | undefined;
  locked: boolean | undefined;
  expired: boolean | undefined;
  enabled: boolean | undefined;
}
