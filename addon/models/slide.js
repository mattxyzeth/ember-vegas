import DS from 'ember-data';

const {
  Model,
  attr
} = DS;

export default Model.extend({
  src: attr('string'),
  video: attr('string'),
  delay: attr('number', { defaultValue: 5000 }),
  cover: attr('boolean', { defaultValue: true }),
  color: attr('string'),
  align: attr('string', { defaultValue: 'center' }),
  valign: attr('string', { defaultValue: 'center' }),
  transition: attr('string', { defaultValue: 'fade' }),
  transitionDuration: attr('string', { defaultValue: 'auto' }),
  animation: attr('string'),
  animationDuration: attr('string', { defaultValue: 'auto' })
});
