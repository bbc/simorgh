interface PageData {
  liveTextStream?: {
    content?: {
      data?: {
        results?: Array<{ urn: string; [key: string]: any }>;
      };
    };
  };
}

const hasNewPost = (oldData: PageData, newData: PageData): boolean => {
  const oldStreamDataLength =
    oldData.liveTextStream?.content?.data?.results?.length;
  const newStreamDataLength =
    newData.liveTextStream?.content?.data?.results?.length;

  console.log(
    oldData.liveTextStream?.content?.data?.results,
    newData.liveTextStream?.content?.data?.results,
  );

  if (oldStreamDataLength !== newStreamDataLength) {
    console.log(
      `New post detected: ${newStreamDataLength} (was: ${oldStreamDataLength})`,
    );
    return true;
  }

  return false;
};

export default hasNewPost;
