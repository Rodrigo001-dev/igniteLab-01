import { GetServerSideProps } from "next";
import { gql } from "@apollo/client";
import {
  getAccessToken,
  getSession,
  withPageAuthRequired,
} from "@auth0/nextjs-auth0";
import { useUser } from "@auth0/nextjs-auth0/client";

import { withApollo } from "@/lib/WithApollo";
import { useGetProductsQuery } from "@/graphql/generated/graphql";

export function Home() {
  const { user } = useUser();

  return (
    <div className="text-violet-500">
      <h1>Hello World</h1>

      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}

      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}

// o withPageAuthRequired vai verificar se o usuário está autenticado e se não
// estiver autenticado ele vai ser redirecionado para o login
export const getServerSideProps: GetServerSideProps = withPageAuthRequired({
  getServerSideProps: async (ctx) => {
    const query = () => {
      return;
    };

    console.log(await getAccessToken(ctx.req, ctx.res));

    return {
      props: {},
    };
  },
});

export default withApollo(Home);
