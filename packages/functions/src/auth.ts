import { AuthHandler, GoogleAdapter, Session } from "sst/node/auth";

declare module "sst/node/auth" {
  export interface SessionTypes {
    user: {
      userId: string;
    };
  }
}

export const handler = AuthHandler({
  providers: {
    google: GoogleAdapter({
      mode: "oidc",
      clientID: "id",
      onSuccess: async (tokenset) => {
        console.log("on success");
        const claims = tokenset.claims();
        const user = {
          userId: "looked-up-user-id-from-claims",
        };

        console.log("returning param");

        return Session.parameter({
          redirect: "https://d2ojzakwiey3fr.cloudfront.net",
          type: "user",
          properties: {
            userId: claims.sub,
          },
        });
      },
    }),
  },
});
