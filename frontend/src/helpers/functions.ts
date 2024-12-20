export function toQueryString(query: any): string {
  const params = new URLSearchParams();

  params.append("page", query.page.toString());

  if (query.fundHouse) {
    params.append("fundHouse", query.fundHouse);
  }

  if (query.fundSchemeType) {
    params.append("fundSchemeType", query.fundSchemeType);
  }

  return params.toString();
}
