import style from './index.style';

export default () => {
  return (
    <section css={style.container}>
      <iframe
        css={style.video}
        src="https://www.youtube.com/embed/EColTNIbOko?si=DmXVv_JFXkxx8YFa"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </section>
  );
};
