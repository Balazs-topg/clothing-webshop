import ArticleForm from "../../ArticleForm";

export default async function Page({
  params,
}: {
  params: { articleId: string };
}) {
  const response = await fetch(
    `${process.env.HOST}/api/article/${params.articleId}`,
    { cache: "no-store" },
  );
  const data = await response.json();
  console.log("datadatadata", data);

  if (JSON.stringify(data) === "{}") return;

  const articleData = data.content;
  return <ArticleForm ArticleData={articleData} />;
}
