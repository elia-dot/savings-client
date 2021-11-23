export const getHour = () => {
  const date = new Date();
  const hour = date.getHours();

  const greetings =
    hour < 6
      ? 'לילה טוב'
      : hour > 6 && hour < 11
      ? 'בוקר טוב'
      : hour > 11 && hour < 16
      ? 'צהריים טובים'
      : hour > 16 && hour < 19
      ? 'אחר צהריים טובים'
      : 'לילה טוב';

  return greetings;
};
