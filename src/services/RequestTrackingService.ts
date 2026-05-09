import { SPHttpClient } from "@microsoft/sp-http";

export interface IRequestSummaryItem {
  id: number;
  title: string;
  status?: string;
  created?: string;
  listTitle?: string;
  formTitle?: string;
  displayUrl?: string;
}

export async function getMyRecentRequestsForList(
  siteUrl: string,
  listId: string,
  listUrl: string,
  spHttpClient: SPHttpClient,
): Promise<IRequestSummaryItem[]> {
  const endpoint =
    `${siteUrl}/_api/web/lists(guid'${listId}')/items` +
    "?$select=Id,Title,Created,Status" +
    "&$orderby=Created desc" +
    "&$top=5";

  const response = await spHttpClient.get(endpoint, SPHttpClient.configurations.v1, {
    headers: {
      Accept: "application/json;odata=nometadata",
      "odata-version": "",
    },
  });

  if (!response.ok) {
    return [];
  }

  const data = await response.json();

  return (data.value || []).map((item: any) => ({
    id: Number(item.Id),
    title: item.Title || `Request ${item.Id}`,
    status: item.Status || "",
    created: item.Created || "",
    displayUrl: `${listUrl.split("?")[0].replace(/\/AllItems\.aspx$/i, "")}/DispForm.aspx?ID=${item.Id}`,
  }));
}