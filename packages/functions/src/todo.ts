import { ApiHandler } from "sst/node/api";
import { useSession } from "sst/node/auth";
import { Todo } from "@sst-auth-react/core/todo";

export const create = ApiHandler(async (_evt) => {
  await Todo.create();

  return {
    statusCode: 200,
    body: "Todo created",
  };
});

export const list = ApiHandler(async (_evt) => {
  console.log(_evt);
  const session = useSession();
  console.log("session", session);

  if (session.type !== "user") {
    return {
      statusCode: 401,
      body: "Not authenticated",
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(Todo.list()),
  };
});
