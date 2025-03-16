import { FunctionComponent } from "react";
import { ragChat } from "../lib/rag-chat";
import { redis } from "../lib/redis";
import { ChatWrapper } from "../components/ChatWrapper";
import { cookies } from "next/headers";

interface PageProps {
  params: {
    url: string | string[] | undefined;
  };
}

function reconstructUrl(url: string[]): string {
  const decodedComponents = url.map((component) =>
    decodeURIComponent(component)
  );
  return decodedComponents.join("/");
}

const Page: FunctionComponent<PageProps> = async ({ params }: PageProps) => {
  const { url } = params;
  const sessionCookie = (await cookies()).get("sessionId")?.value;
  const reconstructedUrl = reconstructUrl(url as string[]);

  const sessionId = (reconstructedUrl + "--" + sessionCookie).replace(
    /\//g,
    ""
  );

  const isAlreadyIndexed = await redis.sismember(
    "indexed-urls",
    reconstructedUrl
  );

  const initialMessages = await ragChat.history.getMessages({
    amount: 5,
    sessionId,
  });

  if (!isAlreadyIndexed) {
    await ragChat.context.add({
      type: "html",
      source: reconstructedUrl,
      config: { chunkOverlap: 50, chunkSize: 200 },
    });
    await redis.sadd("indexed-urls", reconstructedUrl);
  }

  return (
    <ChatWrapper sessionId={sessionId} initialMessages={initialMessages} />
  );
};

export default Page;
