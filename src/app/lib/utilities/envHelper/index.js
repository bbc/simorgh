const isLive = () => {
  return process.env.APP_ENV === 'live';
};

export default isLive;
