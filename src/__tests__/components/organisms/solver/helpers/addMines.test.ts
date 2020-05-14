import addMines from "../../../../../components/organisms/solver/helpers/addMines"

describe('addMines', () => {
  it('finds mines', () => {
    let map = [
      ['1', '1', '1'],
      ['1', '□', '1'],
      ['□', '□', '□']
    ]
    const dimensions = [map.length, map[0].length]

    const result = addMines(map, {}, dimensions)

    expect(result).toEqual({"checkedCoords": {"x1y1": true}, "map": [["1", "1", "1"], ["1", "-1", "1"], ["□", "□", "□"]]})
  })
  it('Dosent finds mines', () => {
    let map = [
      ['1', '1', '1'],
      ['1', '1', '1'],
      ['□', '□', '□']
    ]
    const dimensions = [map.length, map[0].length]
    const result = addMines(map, {}, dimensions)

    expect(result).toEqual({"checkedCoords": {}, "map": [["1", "1", "1"], ["1", "1", "1"], ["□", "□", "□"]]})
  })
})