export type AuthBase = {
  enterpriseCode: string;
  email: string;
};

export type Auth = AuthBase &
  (
    | {
        password: string;
      }
    | {}
  );
