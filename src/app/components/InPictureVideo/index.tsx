import style from './index.style';

export default () => {
  return (
    <section css={style.container}>
      <iframe
        css={style.video}
        src="https://www.youtube.com/embed/IJWlBfo5Oj0?si=jUNjyayJBatKQfH8"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </section>
  );
};
