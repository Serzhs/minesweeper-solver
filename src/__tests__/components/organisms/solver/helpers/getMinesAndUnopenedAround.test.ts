import getMinesAndUnopenedAround from "../../../../../components/organisms/solver/helpers/getMinesAndUnopenedAround"

describe('getMinesAndUnopenedAround', () => {
  it('Has all fields around', () => {

    let map = [
      ['3', '-1', '□'],
      ['□', '1', '2'],
      ['□', '□', '□'],
    ]

    const result = getMinesAndUnopenedAround(map, 1, 1)
    expect(result).toEqual({
      "mines": [
        {
          "value": "-1",
          "x": 1,
          "y": 0
        }
      ],
      "unopenedCells": [
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
        },
        {
          "value": "□",
          "x": 0,
          "y": 1
        },
        {
          "value": "□",
          "x": 2,
          "y": 0
        }
      ]
    })
  })

  it('Has few fields around', () => {
    let map = [
      ['-1', '□'],
      ['1', '2'],
      [ '□', '□'],
    ]

    const result = getMinesAndUnopenedAround(map, 1, 1)

    expect(result).toEqual({
      "mines": [
        {
          "value": "-1",
          "x": 0,
          "y": 0
        }
      ],
      "unopenedCells": [
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
          "x": 1,
          "y": 0
        }
      ]
    })
  })
})