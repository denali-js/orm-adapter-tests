import { attr, hasOne, Model, AttributeDescriptor, RelationshipDescriptor } from 'denali';

export default class Comment extends Model {

  static body: AttributeDescriptor = attr('string');
  static post: RelationshipDescriptor = hasOne('post');

}