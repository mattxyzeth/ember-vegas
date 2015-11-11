import Ember from 'ember';
import layout from '../templates/components/slide-show';

const {
  GlimmerComponent,
  inject,
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
      this.get('store').findAll('slide').then((slides)=> {
        if (slides) {
          this.set('slides', slides.map((model)=> model.get('attributes')));
          this.vegasInit();
        }
      });
    } else {
      const slides = this.get('store').peekAll('slide');

      if (slides.get('length')) {
        this.set('slides', slides.map((model)=> {
          return model.toJSON();
        }));
        this.vegasInit();
      }
    }
  }),

  getProp(prop) {
    let value = this.get(`attrs.${prop}`) || this.get(`defaults.${prop}`);
    if (['preload', 'preloadImage', 'preloadVideo', 'overlay'].indexOf(prop) !== -1) {
      value = value === 'true' ? true : value;
      value = value === 'false' ? false : value;
    }
    return value;
  },

  vegasInit() {
    let props = keys(this.get('defaults')).reduce((result, key)=> {
      result[key] = this.getProp(key);
      return result;
    }, {});

    props.slides = this.get('slides');

    this.$().vegas(props);
  }
});
