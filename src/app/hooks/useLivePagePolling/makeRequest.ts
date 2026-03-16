export default async (liveTextStreamId: string) => {
  try {
    const fetchUrl = `https://sandbox.bbc.co.uk/fd/ws-poll/stream?liveTextStreamId=${liveTextStreamId}&page=1&pageSize=20&type=curated`;
    const response = await fetch(fetchUrl);
    const { status } = response;
    const { data } = await response.json();

    if (status === 200) {
      return data;
    }

    return null;
  } catch (_err) {
    return null;
  }
};
