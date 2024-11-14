const TOKEN ="eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBhZG1pbi5jb20iLCJleHAiOjE3NjI4Njg4MjcsImlhdCI6MTczMTMzMjgyNywianRpIjoiM2RlYjA2YWUtMzY0ZS00YTY0LThkM2UtNzM0MzFlNjQ3ZDZjIiwic2NvcGUiOiJBRE1JTiJ9.szthUIZx7AyguCabIjYtLFsYrpfiMgE0WpPkCdagTdY";
interface fetchProps{
    url: string;
    query?: string;
}
export async function fetchGET({url, query}: fetchProps) {
    let response = await (await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization : `Bearer ${TOKEN}`
        }
    })).json();
    return response;
}