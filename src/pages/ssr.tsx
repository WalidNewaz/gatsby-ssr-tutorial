import * as React from 'react';

const SSRPage: React.FC<{ serverData: any }> = ({ serverData }) => (
  <main>
    <h1>SSR Page with Dogs</h1>
    <img alt="Happy dog" src={serverData.message} />
  </main>
);

export default SSRPage;

type ServerContext = {
    headers: any;
    method: string;
    url: string;
    query: any;
    params: any;
};

type ServerResponse = {
    status: number;
    headers: any;
    props: any;
};

export async function getServerData (context: ServerContext): Promise<ServerResponse> {
  try {
    const res = await fetch(`https://dog.ceo/api/breeds/image/random`);

    if (!res.ok) {
      throw new Error(`Response failed`);
    }

    return {
      status: 200,
      headers: {},
      props: await res.json()
    };
  } catch (error) {
    return {
      status: 500,
      headers: {},
      props: {}
    };
  }
}
