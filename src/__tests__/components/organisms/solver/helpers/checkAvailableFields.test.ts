import checkAvailableFields from "../../../../../components/organisms/solver/helpers/checkAvailableFields"

describe('checkAvailableFields', () => {
  it('finds fields', () => {
    let map = [
      ['1', '1', '1'],
      ['1', '-1', '1'],
      ['□', '□', '□']
    ]
    const dimensions = [map.length, map[0].length]

    const result = checkAvailableFields(map, {}, dimensions)

    expect(result).toEqual({
      "fieldsToOpen": [
        {
          "value": "□",
          "x": 0,
          "y": 2
        },
        {
          "value": "□",
          "x": 1,
          "y": 2
        },
        {
          "value": "□",
          "x": 2,
          "y": 2
        }
      ],
      "unopenedFields": [
        {
          "x": 0,
          "y": 2
        },
        {
          "x": 1,
          "y": 2
        },
        {
          "x": 2,
          "y": 2
        }
      ]
    })
  })
  it('finds dosent fields', () => {
    let map = [
      ['1', '1', '1'],
      ['1', '1', '1'],
      ['□', '□', '□']
    ]
    const dimensions = [map.length, map[0].length]

    const result = checkAvailableFields(map, {}, dimensions)

    expect(result).toEqual({"fieldsToOpen": [], "unopenedFields": [{"x": 0, "y": 2}, {"x": 1, "y": 2}, {"x": 2, "y": 2}]})
  })
})