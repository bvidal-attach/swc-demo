const observer = () => {
  let say = (item) => console.log(item);

  return {
    say,
  };
};

const welcome = 'hi';
observer().say(welcome);