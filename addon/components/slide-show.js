import Ember from 'ember';
import layout from '../templates/components/slide-show';

const {
  GlimmerComponent,
  inject,
  isPresent,
  isBlank,
  on
} = Ember;

const { service } = inject;

const {
  keys
} = Object;

export default GlimmerComponent.extend({
  store: service(),

  classNames: 'vegas-slide-show',
  layout: layout,

  defaults: {
    slide: 0,
    timer: 'none',
    preload: false,
    preloadImage: false,
    preloadVideo: false,
    overlay: false,
    autoplay: true,
    shuffle: true,
    delay: 5000,
    cover: true,
    color: '#222222',
    align: 'center',
    valign: 'center',
    transition: 'random',
    transitionDuration: '1000',
    animation: 'random',
    animationDuration: 'auto'
  },

  _loadSlides: on('didInsertElement', function() {
    if (this.attrs.remote) {
      return this.get('store').findAll('slide').then((slides)=> {
        if (isPresent(slides)) {
          this.set('slides', this.mapSlides(slides));
          this.vegasInit();
        }
      });
    } else {
      return new Ember.RSVP.Promise((resolve, reject)=> {
        if (isBlank(this.attrs.slides)) {
          const slides = this.get('store').peekAll('slide');

          if (slides.get('length')) {
            this.set('slides', this.mapSlides(slides));
            this.vegasInit();
            resolve();
          } else {
            reject();
          }
        } else {
          this.set('slides', this.getAttrs('slides'));
          resolve();
        }
      });
    }
  }),

  mapSlides(slides) {
    return slides.map(slide => slide.toJSON());
  },

  getProp(prop) {
    let value = this.get(`attrs.${prop}`) || this.get(`defaults.${prop}`);
    if (['preload', 'preloadImage', 'preloadVideo', 'overlay'].indexOf(prop) !== -1) {
      value = JSON.parse(value); // Convert boolean strings
    }
    return value;
  },

  vegasInit() {
    console.log('init called');
    let props = keys(this.get('defaults')).reduce((result, key)=> {
      result[key] = this.getProp(key);
      return result;
    }, {});

    props.slides = this.get('slides');

    this.$().vegas(props);
  }
});
