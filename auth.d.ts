import "next-auth";

declare module "next-auth" {
  interface Session {
    account: {
		accessToken: string;
		id: string;
		refreshToken: string;
		athlete: {
			firstname: string;
			lastname: string;
		}
	}
  }
}