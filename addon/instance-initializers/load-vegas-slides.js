export function initialize(instance) {
  const slides = instance.application.vegasSlides;

  if (slides) {
    const data = serializeSlides(slides);

    const store = instance.lookup('service:store');
    store.pushPayload({ data });
  }
}

function serializeSlides(slides) {
  return slides.map((slide, i)=> {
    return {
      type: 'slide',
      id: i,
      attributes: slide
    };
  });
}

export default {
  name: 'load-vegas-slides',
  initialize: initialize
};
