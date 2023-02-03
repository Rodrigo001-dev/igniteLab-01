import { GetServerSideProps } from "next";
import {
  getAccessToken,
  getSession,
  withPageAuthRequired,
} from "@auth0/nextjs-auth0";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Home() {
  const { user } = useUser();

  return (
    <div>
      <h1>Hello World</h1>

      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}

// o withPageAuthRequired vai verificar se o usuário está autenticado e se não
// estiver autenticado ele vai ser redirecionado para o login
export const getServerSideProps: GetServerSideProps = withPageAuthRequired({
  getServerSideProps: async ({ req, res }) => {
    console.log(await getAccessToken(req, res));

    return {
      props: {},
    };
  },
});
