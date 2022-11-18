import es from '../Local/en';

const t = key => {
  const split = key.split('.');

  return (
    split.reduce((acc, item) => {
      return acc[item];
    }, es) ?? key
  );
};

export default t;
