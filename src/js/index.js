const $js = window;

var addHastag = function () {
  var origin = $js.location.origin;
  $js.location.replace(origin.concat('#first'));
  console.log($js.location);
};

const init = () => {
  const observer = () => {
    let say = (item) => console.log(item);

    return {
      say,
    };
  };

  const welcome = 'hi';
  observer().say(welcome);
};

$js.addEventListener('DOMContentLoaded', () => {
  init();

  addHastag();

  const $preview = document.querySelector('#preview');
  $preview &&
    ($preview.textContent = `
  ${init}
  
  ${addHastag}
  `);
});
