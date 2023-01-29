import { getAccessToken, getSession } from "@auth0/nextjs-auth0";
import { Inter } from "@next/font/google";
import { GetServerSideProps } from "next";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = getSession(req, res);

  // se o usuário não está autenticado
  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/login",
        permanent: false,
      },
    };
  } else {
    return {
      redirect: {
        destination: "/app",
        permanent: false,
      },
    };
  }
};
