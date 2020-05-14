import calculateOdds from "../../../../../components/organisms/solver/helpers/calculateOdds"

describe('calculateOdds', () => {
  it('Check one tile near', () => {
    let map = [
      ['2', '□'],
      ['□', '-1']
    ]

    const dimensions = [map.length, map[0].length]

    const result = calculateOdds(map, {}, dimensions)
    expect(result).toEqual(["0", "1"])

  })
  it('Check combined tiles', () => {
    let map = [
      ['□', '3', '2', '□'],
      ['□', '□', '□', '□'],
      ['□', '□', '□', '□'],
    ]

    const dimensions = [map.length, map[0].length]

    const result = calculateOdds(map, {'x2y1': true}, dimensions)
    expect(result).toEqual(["3", "1"])
  })
})