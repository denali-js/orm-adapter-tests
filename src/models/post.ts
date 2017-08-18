import { attr, hasMany, Model, AttributeDescriptor, RelationshipDescriptor } from 'denali';

export default class Post extends Model {

  static title: AttributeDescriptor = attr('string');
  static comments: RelationshipDescriptor = hasMany('comment');

}