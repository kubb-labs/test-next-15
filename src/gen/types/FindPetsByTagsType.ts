import type { PetType } from './PetType'

export type FindPetsByTagsQueryParamsType = {
  /**
   * @description Tags to filter by
   * @type array
   */
  tags: string[]
}

/**
 * @description successful operation
 */
export type FindPetsByTags200Type = PetType[]

/**
 * @description Invalid tag value
 */
export type FindPetsByTags400Type = unknown

export type FindPetsByTagsQueryResponseType = FindPetsByTags200Type

export type FindPetsByTagsTypeQuery = {
  Response: FindPetsByTags200Type
  QueryParams: FindPetsByTagsQueryParamsType
  Errors: FindPetsByTags400Type
}